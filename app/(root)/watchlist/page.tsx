import SearchCommand from "@/components/SearchCommand";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistWithData } from "@/lib/actions/watchlist.actions";
import { Star } from "lucide-react";
import { WatchlistTable } from "@/components/WatchlistTable";

const WatchlistPage = async () => {
    const initialStocks = await searchStocks();
    const watchlist = await getWatchlistWithData();

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="watchlist-title">Watchlist</h1>
                <SearchCommand initialStocks={initialStocks} renderAs="button" label="Add Stock" />
            </div>
            
            <WatchlistTable watchlist={watchlist} />
        </div>
    );
};

export default WatchlistPage;
