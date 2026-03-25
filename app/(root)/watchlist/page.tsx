import SearchCommand from "@/components/SearchCommand";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistWithData } from "@/lib/actions/watchlist.actions";
import { Star } from "lucide-react";
import { WatchlistTable } from "@/components/WatchlistTable";
import { AlertsList } from '@/components/AlertsList';
import { getUserAlerts } from '@/lib/actions/alerts';
import MarketSummaryFooter from "@/components/MarketSummaryFooter";

const WatchlistPage = async () => {
    const [initialStocks, watchlist, alerts] = await Promise.all([
        searchStocks(),
        getWatchlistWithData(),
        getUserAlerts(),
    ]);

    if (watchlist.length === 0) {
        return (
            <div className="watchlist-empty-container">
                <Star className="watchlist-star" />
                <h1 className="watchlist-title">Your watchlist is empty</h1>
                <p className="empty-description">
                    Start tracking your favorite stocks by searching for them and clicking the star icon.
                </p>
                <SearchCommand initialStocks={initialStocks} renderAs="button" label="Search Stocks" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col xl:flex-row gap-8 items-start w-full">
                {/* LEFT COLUMN — title row + table stacked, takes remaining width */}
                <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
                    <div className="flex items-center justify-between">
                        <h1 className="watchlist-title text-3xl font-bold text-white">Watchlist</h1>
                        <SearchCommand initialStocks={initialStocks} renderAs="button" label="Add Stock" />
                    </div>
                    <WatchlistTable watchlist={watchlist} />
                </div>

                {/* RIGHT COLUMN — "Alerts" title + card panel, fixed 400px on large screens */}
                <div className="w-full xl:w-[400px] flex-shrink-0 flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
                        Active Alerts
                    </h2>
                    <AlertsList alerts={alerts} />
                </div>
            </div>

            {/* Market Summary Footer */}
            <MarketSummaryFooter />
        </div>
    );
};

export default WatchlistPage;