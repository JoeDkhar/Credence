'use server';

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

import { getStocksDetails } from "@/lib/actions/finnhub.actions";

export async function addToWatchlist(symbol: string, company: string) {
    const session = await auth!.api.getSession({ headers: await headers() });
    if (!session?.user) {
        redirect('/sign-in');
    }

    const userId = session.user.id;
    const upperSymbol = symbol.toUpperCase();

    try {
        await connectToDatabase();
        const existing = await Watchlist.findOne({ userId, symbol: upperSymbol });
        if (existing) {
            return { success: false, error: 'Stock already in watchlist' };
        }

        await Watchlist.create({
            userId,
            symbol: upperSymbol,
            company: company.trim(),
            addedAt: new Date(),
        });

        revalidatePath('/watchlist');
        return { success: true, message: 'Stock added to watchlist' };
    } catch (error) {
        console.error('addToWatchlist error:', error);
        return { success: false, error: 'Failed' };
    }
}

export async function removeFromWatchlist(symbol: string) {
    const session = await auth!.api.getSession({ headers: await headers() });
    if (!session?.user) {
        redirect('/sign-in');
    }

    const userId = session.user.id;
    const upperSymbol = symbol.toUpperCase();

    try {
        await connectToDatabase();
        await Watchlist.deleteOne({ userId, symbol: upperSymbol });
        revalidatePath('/watchlist');
        return { success: true };
    } catch (error) {
        console.error('removeFromWatchlist error:', error);
        return { success: false, error: 'Failed' };
    }
}

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    if (!email) return [];

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        if (!user) return [];

        const userId = (user.id as string) || String(user._id || '');
        if (!userId) return [];

        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol).toUpperCase());
    } catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}

export async function getUserWatchlist(): Promise<any[]> {
    const session = await auth!.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return [];
    }

    const userId = session.user.id;
    try {
        await connectToDatabase();
        const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
        return JSON.parse(JSON.stringify(watchlist));
    } catch (error) {
        console.error('getUserWatchlist error:', error);
        return [];
    }
}

export async function getWatchlistWithData(): Promise<any[]> {
    const session = await auth!.api.getSession({ headers: await headers() });
    if (!session?.user) return [];

    const userId = session.user.id;
    try {
        await connectToDatabase();
        const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();

        if (watchlist.length === 0) return [];

        // Sequential with 200ms gap to avoid 429 on free tier
        const enriched: any[] = [];
        for (const item of watchlist) {
            const details = await getStocksDetails(item.symbol);
            if (details) {
                enriched.push({
                    ...item,
                    company: details.company,
                    priceFormatted: details.priceFormatted,
                    changeFormatted: details.changeFormatted,
                    changePercent: details.changePercent,
                    marketCap: details.marketCapFormatted,
                    peRatio: details.peRatio,
                });
            }
            await new Promise((r) => setTimeout(r, 200));
        }

        return JSON.parse(JSON.stringify(enriched));
    } catch (error) {
        console.error('getWatchlistWithData error:', error);
        return [];
    }
}