import React from 'react';
import { getNews } from '@/lib/actions/finnhub.actions';
import { getWatchlistWithData } from '@/lib/actions/watchlist.actions';
import { NewsGrid } from '@/components/NewsGrid';
import { POPULAR_STOCK_SYMBOLS } from '@/lib/constants';

const NewsPage = async () => {
    // 1. Fetch user watchlist symbols
    const watchlist = await getWatchlistWithData();
    const watchlistSymbols = (watchlist || []).map((item: any) => item.symbol);
    
    // 2. Fetch Top Stories (General Market News)
    // Fetching 9 articles for a 3-column x 3-row grid
    const topStories = await getNews(undefined, 9);
    
    // 3. Fetch "For You" (Watchlist News) or "Suggested" (Popular Stock News)
    // Fetching 15 articles for a 3-column x 5-row grid
    const forYouSymbols = watchlistSymbols.length > 0 
        ? watchlistSymbols 
        : POPULAR_STOCK_SYMBOLS.slice(0, 10);
        
    const forYou = await getNews(forYouSymbols, 15);

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-white" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                    Market News
                </h1>
                <p className="text-gray-400 text-lg">
                    Real-time market insights {watchlistSymbols.length > 0 ? "curated for your watchlist" : "from around the market"}.
                </p>
            </header>
            
            <NewsGrid 
                topStories={topStories} 
                forYou={forYou} 
                watchlistCount={watchlistSymbols.length} 
            />
        </div>
    );
};

export default NewsPage;
