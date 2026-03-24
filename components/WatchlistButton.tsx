'use client';

import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist.actions';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'sonner';

const WatchlistButton = ({
    symbol,
    company,
    isInWatchlist,
    type = 'button',
    showTrashIcon = false,
    onWatchlistChange,
}: WatchlistButtonProps) => {
    const [added, setAdded] = useState<boolean>(!!isInWatchlist);

    const toggleWatchlist = async () => {
        // If state changed relative to original status
        if (added === !!isInWatchlist) return;

        try {
            if (added) {
                const res = await addToWatchlist(symbol, company);
                if (res.success) {
                    toast.success(res.message);
                    onWatchlistChange?.(symbol, true);
                } else {
                    toast.error(res.error || 'Failed to add to watchlist');
                }
            } else {
                const res = await removeFromWatchlist(symbol);
                if (res.success) {
                    toast.success(`Removed ${symbol} from watchlist`);
                    onWatchlistChange?.(symbol, false);
                } else {
                    toast.error('Failed to remove from watchlist');
                }
            }
        } catch (error) {
            console.error('Watchlist error:', error);
            // toast.error('An error occurred');
        }
    };

    const debouncedToggle = useDebounce(toggleWatchlist, 300);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setAdded((prev) => !prev);
    };

    // Effect to trigger the debounced action whenever local state changes
    useEffect(() => {
        if (added !== !!isInWatchlist) {
            debouncedToggle();
        }
    }, [added, isInWatchlist, debouncedToggle]);

    if (type === 'icon') {
        return (
            <button
                onClick={handleClick}
                className={`watchlist-icon-btn ${added ? 'watchlist-icon-added' : ''}`}
            >
                <div className="watchlist-icon">
                    <Star className="star-icon" fill={added ? 'currentColor' : 'none'} />
                </div>
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`watchlist-btn ${added ? 'watchlist-remove' : ''}`}
        >
            <div className="flex items-center justify-center gap-2">
                {showTrashIcon && added && <Trash2 className="h-4 w-4" />}
                <span>{added ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
            </div>
        </button>
    );
};

export default WatchlistButton;