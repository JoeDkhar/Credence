import SearchCommand from "@/components/SearchCommand";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { getWatchlistWithData } from "@/lib/actions/watchlist.actions";
import { Star } from "lucide-react";
import { WatchlistTable } from "@/components/WatchlistTable";
import { AlertsList } from '@/components/AlertsList';
import { getUserAlerts } from '@/lib/actions/alerts';

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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'flex-start' }}>

            {/* LEFT COLUMN — title row + table stacked, takes remaining width */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h1 className="watchlist-title">Watchlist</h1>
                    <SearchCommand initialStocks={initialStocks} renderAs="button" label="Add Stock" />
                </div>
                <WatchlistTable watchlist={watchlist} />
            </div>

            {/* RIGHT COLUMN — "Alerts" title + card panel, fixed 400px */}
            <div style={{ width: '400px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{
                        fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '32px',
                        letterSpacing: '-0.02em',
                        color: '#FFFFFF',
                        margin: 0,
                    }}>
                        Alerts
                    </h2>
                </div>
                <AlertsList alerts={alerts} />
            </div>

        </div>
    );
};

export default WatchlistPage;