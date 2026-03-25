'use client';

import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { NewsCard } from './NewsCard';
import { 
    TICKER_TAPE_WIDGET_CONFIG, 
    MARKET_OVERVIEW_WIDGET_CONFIG,
    MARKET_QUOTES_WIDGET_CONFIG
} from '@/lib/constants';

interface NewsGridProps {
    topStories: any[];
    forYou: any[];
    watchlistCount: number;
}

export function NewsGrid({ topStories, forYou, watchlistCount }: NewsGridProps) {
    return (
        <div className="flex flex-col gap-12 w-full">
            {/* 1. TICKER TAPE (Top Snapshot) */}
            <div className="w-full -mt-6">
                <TradingViewWidget
                    scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    config={TICKER_TAPE_WIDGET_CONFIG}
                    height={46}
                />
            </div>

            {/* 2. TOP STORIES (Section 1) */}
            {topStories.length > 0 && (
                <section className="w-full">
                    <h2 className="watchlist-title mb-8" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                        Top Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {topStories.map((article: any) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            )}

            {/* 4. MARKET PULSE (Dual Grid Market Snapshot - Section 2) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-12 w-full">
                {/* Market Overview Column */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-gray-100 px-1" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                        Market Overview
                    </h2>
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0F0F0F]">
                        <TradingViewWidget
                            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                            config={MARKET_OVERVIEW_WIDGET_CONFIG}
                            height={550}
                        />
                    </div>
                </div>

                {/* Market Quotes Column */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-gray-100 px-1" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                        Market Quotes
                    </h2>
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0F0F0F]">
                        <TradingViewWidget
                            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                            config={MARKET_QUOTES_WIDGET_CONFIG}
                            height={550}
                        />
                    </div>
                </div>
            </div>

            {/* 5. FOR YOU / SUGGESTED (Section 3) */}
            {forYou.length > 0 && (
                <section className="w-full">
                    <h2 className="watchlist-title mb-8" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                        {watchlistCount > 0 ? "For You" : "Suggested Stocks"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full pb-20">
                        {forYou.map((article: any) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
