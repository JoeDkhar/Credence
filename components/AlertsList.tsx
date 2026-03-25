'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { IAlert } from '@/types/alert';
import { deleteAlert } from '@/lib/actions/alerts';
import { toast } from 'sonner';

interface AlertsListProps {
    alerts: IAlert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
    const [localAlerts, setLocalAlerts] = useState<IAlert[]>(alerts);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

    const handleDelete = async (alertId: string) => {
        setDeletingId(alertId);
        const result = await deleteAlert(alertId);
        if (result.success) {
            setLocalAlerts((prev) => prev.filter((a) => a._id !== alertId));
            toast.success('Alert removed');
        } else {
            toast.error(result.error || 'Failed to remove alert');
        }
        setDeletingId(null);
    };

    const getAlertDescription = (alert: IAlert): string => {
        switch (alert.alertType) {
            case 'price_above': return `Price above $${alert.targetPrice}`;
            case 'price_below': return `Price below $${alert.targetPrice}`;
            case 'percent_change_up': return `Gain ${alert.targetPercent}%+ today`;
            case 'percent_change_down': return `Drop ${alert.targetPercent}%+ today`;
            case 'ma_cross_above': return `Cross above ${alert.maPeriod}-day MA`;
            case 'ma_cross_below': return `Cross below ${alert.maPeriod}-day MA`;
            case 'volume_spike': return `Volume ${alert.volumeMultiplier}× avg`;
            case 'earnings_proximity': return `Earnings in ${alert.earningsDaysBefore} day(s)`;
            default: return 'Alert';
        }
    };

    // Derived badge values so logic is written once, not duplicated across bg + color + label
    const getBadge = (alert: IAlert): { label: string; color: string; bg: string } => {
        if (alert.status === 'triggered') {
            return { label: 'Triggered', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
        }
        if (alert.frequency === 'once') {
            return { label: 'Pending', color: '#FDD458', bg: 'rgba(253, 212, 88, 0.2)' };
        }
        // once_per_day | once_per_week | every_time → green Active
        return { label: 'Active', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px 16px',
            gap: '17px',
            width: '400px',
            background: '#141414',
            boxShadow: '0px 0px 0px 1px rgba(18,18,18,0.05), 0px 1px 1px rgba(18,18,18,0.15), 0px 3px 6px rgba(18,18,18,0.1)',
            borderRadius: '12px',
            minHeight: '100px',
        }}>
            {localAlerts.length === 0 ? (
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '40px 0',
                    fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                    fontSize: '14px',
                    color: '#9095A1',
                }}>
                    No active alerts. Click "Set Alert" on any stock to get started.
                </div>
            ) : (
                localAlerts.map((alert) => {
                    const badge = getBadge(alert);
                    return (
                        <div
                            key={alert._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '14px',
                                gap: '12px',
                                width: '368px',
                                background: '#212328',
                                borderRadius: '6px',
                            }}
                        >
                            {/* Stock Info Row */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: '4px 0px',
                                gap: '10px',
                                width: '340px',
                            }}>
                                {/* Finnhub Logo with initials fallback */}
                                <div style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '4px',
                                    background: 'linear-gradient(138.96deg, #3E4A52 17.93%, #565669 129.2%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    overflow: 'hidden',
                                }}>
                                    {!logoErrors[alert.symbol] ? (
                                        <Image
                                            src={`https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/${alert.symbol}.png`}
                                            alt={alert.symbol}
                                            width={46}
                                            height={46}
                                            style={{ objectFit: 'contain', borderRadius: '4px' }}
                                            onError={() =>
                                                setLogoErrors((prev) => ({ ...prev, [alert.symbol]: true }))
                                            }
                                        />
                                    ) : (
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            color: '#FFFFFF',
                                        }}>
                                            {alert.symbol.slice(0, 2)}
                                        </span>
                                    )}
                                </div>

                                {/* Company name + symbol + price + frequency */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                    {/* Name + Symbol */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '18px',
                                            color: '#CCDADC',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '140px',
                                        }}>
                                            {alert.companyName}
                                        </span>
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '18px',
                                            color: '#CCDADC',
                                        }}>
                                            {alert.symbol}
                                        </span>
                                    </div>

                                    {/* Target Price + Frequency */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            lineHeight: '18px',
                                            color: '#FFFFFF',
                                        }}>
                                            {alert.targetPrice ? `$${alert.targetPrice}` : '—'}
                                        </span>
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            lineHeight: '18px',
                                            color: '#0FEDBE',
                                        }}>
                                            {alert.frequency === 'once' ? 'Once'
                                                : alert.frequency === 'once_per_day' ? 'Daily'
                                                    : alert.frequency === 'once_per_week' ? 'Weekly'
                                                        : 'Always'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ width: '340px', height: '1px', background: '#313234' }} />

                            {/* Alert section */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '340px' }}>
                                {/* "Alert" label + trash icon */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        lineHeight: '18px',
                                        color: '#CCDADC',
                                    }}>
                                        Alert
                                    </span>
                                    <button
                                        onClick={() => handleDelete(alert._id)}
                                        disabled={deletingId === alert._id}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: deletingId === alert._id ? 'not-allowed' : 'pointer',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: deletingId === alert._id ? 0.4 : 1,
                                            transition: 'opacity 0.15s',
                                        }}
                                    >
                                        <Trash2 size={14} color="#FFFFFF" />
                                    </button>
                                </div>

                                {/* Description + Status badge */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <span style={{
                                        fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        lineHeight: '20px',
                                        color: '#FFFFFF',
                                    }}>
                                        {getAlertDescription(alert)}
                                    </span>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '4px 6px',
                                        background: badge.bg,
                                        borderRadius: '4px',
                                    }}>
                                        <span style={{
                                            fontFamily: "'PP Neue Montreal', -apple-system, sans-serif",
                                            fontWeight: 500,
                                            fontSize: '12px',
                                            lineHeight: '14px',
                                            color: badge.color,
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {badge.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}