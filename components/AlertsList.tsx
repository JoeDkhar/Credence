'use client';

import React, { useTransition } from 'react';
import { Trash2 } from 'lucide-react';
import { IAlert } from '@/types/alert';
import { deleteAlert } from '@/lib/actions/alerts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AlertsListProps {
    alerts: IAlert[];
}

const AlertsList = ({ alerts }: AlertsListProps) => {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (alertId: string) => {
        startTransition(async () => {
            const res = await deleteAlert(alertId);
            if (res.success) {
                toast.success('Alert deleted');
            } else {
                toast.error(res.error || 'Failed to delete alert');
            }
        });
    };

    return (
        <div className="watchlist-alerts flex flex-col">
            {/* Header row */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="watchlist-title">Alerts</h2>
            </div>

            {/* List container */}
            <div className="alert-list">
                {!alerts || alerts.length === 0 ? (
                    <p className="alert-empty">No alerts set. Add one from your watchlist.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {alerts.map((alert) => (
                            <div className="alert-item" key={alert._id}>
                                {/* Stock header */}
                                <div className="alert-details">
                                    <div>
                                        <p className="alert-name">{alert.symbol}</p>
                                        <p className="alert-company">{alert.companyName}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="alert-price">
                                            {typeof alert.targetPrice === 'number' ? `$${alert.targetPrice.toFixed(2)}` : '—'}
                                        </span>
                                        <span className={cn(
                                            "text-xs px-2 py-0.5 rounded font-medium",
                                            alert.status === 'active'
                                                ? "bg-[#FDD458]/20 text-[#FDD458]"
                                                : "bg-teal-400/20 text-teal-400"
                                        )}>
                                            {alert.status === 'active' ? 'Pending' : 'Triggered'}
                                        </span>
                                    </div>
                                </div>

                                {/* Alert meta */}
                                <div className="alert-actions">
                                    <div className="text-sm text-gray-500 capitalize">
                                        {(alert.alertType.endsWith('_above') || alert.alertType.endsWith('_up') ? '↑ Above/Up' : '↓ Below/Down')} · {alert.condition}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="alert-delete-btn p-1.5"
                                            onClick={() => handleDelete(alert._id)}
                                            disabled={isPending}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsList;
