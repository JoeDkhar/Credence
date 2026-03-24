'use client';

import React, { useState, useEffect } from 'react';
import { Star, Trash2, BellRing, BellPlus } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist.actions';
import { useDebounce } from '@/hooks/useDebounce';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
    symbol: string;
    company?: string;
    companyName?: string;
    userId?: string;
    isInWatchlist: boolean;
    hasAlert?: boolean;
    onAddAlert?: () => void;
    type?: 'button' | 'icon';
    showTrashIcon?: boolean;
    onWatchlistChange?: (symbol: string, added: boolean) => void;
}

const WatchlistButton = ({
    symbol,
    company,
    companyName,
    userId,
    isInWatchlist,
    hasAlert = false,
    onAddAlert,
    type = 'button',
    showTrashIcon = false,
    onWatchlistChange,
}: WatchlistButtonProps) => {
    // Use whichever name prop is provided
    const resolvedName = companyName || company || symbol;

    const [added, setAdded] = useState<boolean>(!!isInWatchlist);

    const toggleWatchlist = async () => {
        if (added === !!isInWatchlist) return;

        try {
            if (added) {
                const res = await addToWatchlist(symbol, resolvedName);
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
        }
    };

    const debouncedToggle = useDebounce(toggleWatchlist, 300);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setAdded((prev) => !prev);
    };

    useEffect(() => {
        if (added !== !!isInWatchlist) {
            debouncedToggle();
        }
    }, [added, isInWatchlist, debouncedToggle]);

    if (type === 'icon') {
        return (
            <div className="flex items-center gap-2">
                {/* Only render Set Alert button if onAddAlert is provided */}
                {onAddAlert && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onAddAlert();
                        }}
                        className={cn(
                            'add-alert',
                            hasAlert && 'text-teal-400 border-teal-400/30'
                        )}
                    >
                        {hasAlert ? (
                            <BellRing className="h-4 w-4" />
                        ) : (
                            <BellPlus className="h-4 w-4" />
                        )}
                        <span>{hasAlert ? 'Alert Set' : 'Set Alert'}</span>
                    </button>
                )}

                <button
                    onClick={handleClick}
                    className={`watchlist-icon-btn ${added ? 'watchlist-icon-added' : ''}`}
                >
                    <div className="watchlist-icon">
                        <Star className="star-icon" fill={added ? 'currentColor' : 'none'} />
                    </div>
                </button>
            </div>
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
