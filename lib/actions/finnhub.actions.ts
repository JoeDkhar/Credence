'use server';
import { getDateRange, validateArticle, formatArticle } from '@/lib/utils';
import { POPULAR_STOCK_SYMBOLS } from '@/lib/constants';
import { cache } from 'react';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const NEXT_PUBLIC_FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? '';

async function fetchJSON<T>(url: string, revalidateSeconds?: number): Promise<T> {
    const options: RequestInit & { next?: { revalidate?: number } } = revalidateSeconds
        ? { cache: 'force-cache', next: { revalidate: revalidateSeconds } }
        : { cache: 'no-store' };
    const res = await fetch(url, options);
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Fetch failed ${res.status}: ${text}`);
    }
    return (await res.json()) as T;
}
export { fetchJSON };

// Small helper to avoid hammering the free-tier rate limit
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getNews(symbols?: string[]): Promise<MarketNewsArticle[]> {
    try {
        const range = getDateRange(5);
        const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
        if (!token) throw new Error('FINNHUB API key is not configured');

        const cleanSymbols = (symbols || [])
            .map((s) => s?.trim().toUpperCase())
            .filter((s): s is string => Boolean(s));

        const maxArticles = 6;

        if (cleanSymbols.length > 0) {
            const perSymbolArticles: Record<string, RawNewsArticle[]> = {};
            await Promise.all(
                cleanSymbols.map(async (sym) => {
                    try {
                        const url = `${FINNHUB_BASE_URL}/company-news?symbol=${encodeURIComponent(sym)}&from=${range.from}&to=${range.to}&token=${token}`;
                        const articles = await fetchJSON<RawNewsArticle[]>(url, 300);
                        perSymbolArticles[sym] = (articles || []).filter(validateArticle);
                    } catch (e) {
                        console.error('Error fetching company news for', sym, e);
                        perSymbolArticles[sym] = [];
                    }
                })
            );

            const collected: MarketNewsArticle[] = [];
            for (let round = 0; round < maxArticles; round++) {
                for (let i = 0; i < cleanSymbols.length; i++) {
                    const sym = cleanSymbols[i];
                    const list = perSymbolArticles[sym] || [];
                    if (list.length === 0) continue;
                    const article = list.shift();
                    if (!article || !validateArticle(article)) continue;
                    collected.push(formatArticle(article, true, sym, round));
                    if (collected.length >= maxArticles) break;
                }
                if (collected.length >= maxArticles) break;
            }

            if (collected.length > 0) {
                collected.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
                return collected.slice(0, maxArticles);
            }
        }

        const generalUrl = `${FINNHUB_BASE_URL}/news?category=general&token=${token}`;
        const general = await fetchJSON<RawNewsArticle[]>(generalUrl, 300);
        const seen = new Set<string>();
        const unique: RawNewsArticle[] = [];
        for (const art of general || []) {
            if (!validateArticle(art)) continue;
            const key = `${art.id}-${art.url}-${art.headline}`;
            if (seen.has(key)) continue;
            seen.add(key);
            unique.push(art);
            if (unique.length >= 20) break;
        }
        return unique.slice(0, maxArticles).map((a, idx) => formatArticle(a, false, undefined, idx));
    } catch (err) {
        console.error('getNews error:', err);
        throw new Error('Failed to fetch news');
    }
}

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";

export const searchStocks = cache(async (query?: string): Promise<StockWithWatchlistStatus[]> => {
    try {
        const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
        if (!token) {
            console.error('Error in stock search:', new Error('FINNHUB API key is not configured'));
            return [];
        }

        const trimmed = typeof query === 'string' ? query.trim() : '';
        let results: FinnhubSearchResult[] = [];

        if (!trimmed) {
            const top = POPULAR_STOCK_SYMBOLS.slice(0, 10);

            // Sequential calls with 250ms gap to avoid 429s on the free tier
            const profiles: { sym: string; profile: any }[] = [];
            for (const sym of top) {
                try {
                    const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(sym)}&token=${token}`;
                    const profile = await fetchJSON<any>(url, 3600);
                    profiles.push({ sym, profile });
                } catch (e) {
                    console.error('Error fetching profile2 for', sym, e);
                    profiles.push({ sym, profile: null });
                }
                await delay(250);
            }

            results = profiles
                .map(({ sym, profile }) => {
                    const symbol = sym.toUpperCase();
                    const name: string | undefined = profile?.name || profile?.ticker || undefined;
                    const exchange: string | undefined = profile?.exchange || undefined;
                    if (!name) return undefined;
                    const r: FinnhubSearchResult = {
                        symbol,
                        description: name,
                        displaySymbol: symbol,
                        type: 'Common Stock',
                    };
                    (r as any).__exchange = exchange;
                    return r;
                })
                .filter((x): x is FinnhubSearchResult => Boolean(x));

        } else {
            const url = `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(trimmed)}&token=${token}`;
            const data = await fetchJSON<FinnhubSearchResponse>(url, 1800);
            results = Array.isArray(data?.result) ? data.result : [];
        }

        // Watchlist status
        let userWatchlistSymbols: string[] = [];
        try {
            const session = await auth!.api.getSession({ headers: await headers() });
            if (session?.user?.email) {
                userWatchlistSymbols = await getWatchlistSymbolsByEmail(session.user.email);
            }
        } catch (e) {
            console.error('Error fetching watchlist symbols for search:', e);
        }

        return results
            .map((r) => {
                const upper = (r.symbol || '').toUpperCase();
                const name = r.description || upper;
                const exchangeFromDisplay = (r.displaySymbol as string | undefined) || undefined;
                const exchangeFromProfile = (r as any).__exchange as string | undefined;
                const exchange = exchangeFromDisplay || exchangeFromProfile || 'US';
                const type = r.type || 'Stock';
                return {
                    symbol: upper,
                    name,
                    exchange,
                    type,
                    isInWatchlist: userWatchlistSymbols.includes(upper),
                } as StockWithWatchlistStatus;
            })
            .slice(0, 15);

    } catch (err) {
        console.error('Error in stock search:', err);
        return [];
    }
});

import { formatPrice, formatChangePercent, formatMarketCapValue } from "@/lib/utils";

export const getStocksDetails = cache(async (symbol: string) => {
    try {
        const token = process.env.FINNHUB_API_KEY ?? NEXT_PUBLIC_FINNHUB_API_KEY;
        const upper = symbol.toUpperCase();

        // Removed /stock/metric — requires paid plan, causes 403
        const [quoteData, profileData] = await Promise.all([
            fetchJSON<QuoteData>(`${FINNHUB_BASE_URL}/quote?symbol=${upper}&token=${token}`, 60),
            fetchJSON<ProfileData>(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${upper}&token=${token}`, 3600),
        ]);

        if (!quoteData?.c || !profileData?.name) return null;

        const currentPrice = quoteData.c;
        const changePercent = quoteData.dp ?? 0;
        const marketCap = profileData.marketCapitalization ? profileData.marketCapitalization * 1e6 : 0;

        return {
            symbol: upper,
            company: profileData.name,
            currentPrice,
            priceFormatted: formatPrice(currentPrice),
            changeFormatted: formatChangePercent(changePercent),
            changePercent,
            peRatio: 'N/A', // metric endpoint is paid-only; hardcode N/A for free tier
            marketCapFormatted: formatMarketCapValue(marketCap),
        };
    } catch (err) {
        console.error('getStocksDetails error:', err);
        return null;
    }
});