'use client';

import { useState, useTransition } from 'react';
import { X } from 'lucide-react';
import { createAlert } from '@/lib/actions/alerts';
import {
    AlertType,
    AlertCondition,
    AlertNotification,
    MovingAveragePeriod,
    ALERT_TYPE_LABELS,
} from '@/types/alert';
import { toast } from 'sonner';

interface PriceAlertModalProps {
    symbol: string;
    companyName: string;
    isOpen: boolean;
    onClose: () => void;
}

const ALERT_TYPE_CONDITION: Record<AlertType, AlertCondition> = {
    price_above: 'price',
    price_below: 'price',
    percent_change_up: 'percent',
    percent_change_down: 'percent',
    ma_cross_above: 'moving_average',
    ma_cross_below: 'moving_average',
    volume_spike: 'volume',
    earnings_proximity: 'earnings',
};

export default function PriceAlertModal({
    symbol,
    companyName,
    isOpen,
    onClose,
}: PriceAlertModalProps) {
    const [alertType, setAlertType] = useState<AlertType>('price_above');
    const [targetPrice, setTargetPrice] = useState('');
    const [targetPercent, setTargetPercent] = useState('');
    const [maPeriod, setMaPeriod] = useState<MovingAveragePeriod>(50);
    const [volumeMultiplier, setVolumeMultiplier] = useState('2');
    const [earningsDays, setEarningsDays] = useState('2');
    const [notification, setNotification] = useState<AlertNotification>('email');
    const [isPending, startTransition] = useTransition();

    if (!isOpen) return null;

    const condition = ALERT_TYPE_CONDITION[alertType];

    const handleSubmit = () => {
        if (condition === 'price' && (!targetPrice || isNaN(parseFloat(targetPrice)))) {
            toast.error('Enter a valid target price'); return;
        }
        if (condition === 'percent' && (!targetPercent || isNaN(parseFloat(targetPercent)))) {
            toast.error('Enter a valid percentage'); return;
        }
        if (condition === 'volume' && (!volumeMultiplier || isNaN(parseFloat(volumeMultiplier)))) {
            toast.error('Enter a valid multiplier'); return;
        }

        startTransition(async () => {
            const result = await createAlert({
                symbol,
                companyName,
                alertType,
                condition,
                notification,
                ...(condition === 'price' && { targetPrice: parseFloat(targetPrice) }),
                ...(condition === 'percent' && { targetPercent: parseFloat(targetPercent) }),
                ...(condition === 'moving_average' && { maPeriod }),
                ...(condition === 'volume' && { volumeMultiplier: parseFloat(volumeMultiplier) }),
                ...(condition === 'earnings' && { earningsDaysBefore: parseInt(earningsDays) }),
            });

            if (result.success) {
                toast.success(`Alert set for ${symbol}`);
                onClose();
            } else {
                toast.error(result.error || 'Failed to create alert');
            }
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gray-800 rounded-[20px] w-[560px] px-[60px] py-[40px] flex flex-col gap-10 max-h-[90vh] overflow-y-auto scrollbar-hide-default"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-white bg-transparent border-none cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col gap-8 w-full">
                    <h2 className="alert-title">Price Alert</h2>

                    <div className="flex flex-col gap-6">

                        {/* Stock */}
                        <div className="flex flex-col gap-1.5">
                            <label className="form-label">Stock</label>
                            <input
                                value={symbol}
                                readOnly
                                className="form-input w-full cursor-not-allowed opacity-50"
                            />
                        </div>

                        {/* Alert Type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="form-label">Alert Type</label>
                            <div className="relative">
                                <select
                                    value={alertType}
                                    onChange={(e) => setAlertType(e.target.value as AlertType)}
                                    className="select-trigger appearance-none pr-10"
                                >
                                    <optgroup label="Price">
                                        <option value="price_above">{ALERT_TYPE_LABELS.price_above}</option>
                                        <option value="price_below">{ALERT_TYPE_LABELS.price_below}</option>
                                    </optgroup>
                                    <optgroup label="% Change (daily)">
                                        <option value="percent_change_up">{ALERT_TYPE_LABELS.percent_change_up}</option>
                                        <option value="percent_change_down">{ALERT_TYPE_LABELS.percent_change_down}</option>
                                    </optgroup>
                                    <optgroup label="Moving Average">
                                        <option value="ma_cross_above">{ALERT_TYPE_LABELS.ma_cross_above}</option>
                                        <option value="ma_cross_below">{ALERT_TYPE_LABELS.ma_cross_below}</option>
                                    </optgroup>
                                    <optgroup label="Volume">
                                        <option value="volume_spike">{ALERT_TYPE_LABELS.volume_spike}</option>
                                    </optgroup>
                                    <optgroup label="Events">
                                        <option value="earnings_proximity">{ALERT_TYPE_LABELS.earnings_proximity}</option>
                                    </optgroup>
                                </select>
                                <ChevronIcon />
                            </div>
                        </div>

                        {/* Price target */}
                        {condition === 'price' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="form-label">Target Price</label>
                                <div className="flex h-12 rounded-lg overflow-hidden border border-gray-700">
                                    <span className="flex items-center px-3 text-gray-500 text-base font-medium bg-gray-700 border-r border-gray-700 select-none">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={targetPrice}
                                        onChange={(e) => setTargetPrice(e.target.value)}
                                        className="flex-1 bg-gray-600 text-white text-base px-3 outline-none placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Percent change */}
                        {condition === 'percent' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="form-label">
                                    {alertType === 'percent_change_up' ? 'Gain threshold' : 'Drop threshold'}
                                </label>
                                <div className="flex h-12 rounded-lg overflow-hidden border border-gray-700">
                                    <input
                                        type="number"
                                        placeholder="5"
                                        min="0.1"
                                        max="100"
                                        value={targetPercent}
                                        onChange={(e) => setTargetPercent(e.target.value)}
                                        className="flex-1 bg-gray-600 text-white text-base px-3 outline-none placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="flex items-center px-3 text-gray-500 text-base font-medium bg-gray-700 border-l border-gray-700 select-none">
                                        %
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Fires when {symbol} moves {alertType === 'percent_change_up' ? 'up' : 'down'} by this % in a single trading day
                                </p>
                            </div>
                        )}

                        {/* Moving average */}
                        {condition === 'moving_average' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="form-label">Moving Average Period</label>
                                <div className="relative">
                                    <select
                                        value={maPeriod}
                                        onChange={(e) => setMaPeriod(parseInt(e.target.value) as MovingAveragePeriod)}
                                        className="select-trigger appearance-none pr-10"
                                    >
                                        <option value={20}>20-day MA</option>
                                        <option value={50}>50-day MA</option>
                                        <option value={200}>200-day MA</option>
                                    </select>
                                    <ChevronIcon />
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Fires when {symbol} crosses {alertType === 'ma_cross_above' ? 'above' : 'below'} the {maPeriod}-day moving average
                                </p>
                            </div>
                        )}

                        {/* Volume spike */}
                        {condition === 'volume' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="form-label">Volume Multiplier</label>
                                <div className="flex h-12 rounded-lg overflow-hidden border border-gray-700">
                                    <input
                                        type="number"
                                        placeholder="2"
                                        min="1.1"
                                        step="0.5"
                                        value={volumeMultiplier}
                                        onChange={(e) => setVolumeMultiplier(e.target.value)}
                                        className="flex-1 bg-gray-600 text-white text-base px-3 outline-none placeholder:text-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="flex items-center px-3 text-gray-500 text-base font-medium bg-gray-700 border-l border-gray-700 select-none">
                                        × avg
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Fires when {symbol} volume exceeds {volumeMultiplier}× its 30-day average
                                </p>
                            </div>
                        )}

                        {/* Earnings proximity */}
                        {condition === 'earnings' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="form-label">Days before earnings</label>
                                <div className="relative">
                                    <select
                                        value={earningsDays}
                                        onChange={(e) => setEarningsDays(e.target.value)}
                                        className="select-trigger appearance-none pr-10"
                                    >
                                        <option value="1">1 day before</option>
                                        <option value="2">2 days before</option>
                                        <option value="3">3 days before</option>
                                        <option value="5">5 days before</option>
                                        <option value="7">7 days before</option>
                                    </select>
                                    <ChevronIcon />
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    You'll get an email {earningsDays} day{parseInt(earningsDays) > 1 ? 's' : ''} before {symbol}'s next earnings report
                                </p>
                            </div>
                        )}

                        {/* Notification */}
                        <div className="flex flex-col gap-1.5">
                            <label className="form-label">Notification</label>
                            <div className="relative">
                                <select
                                    value={notification}
                                    onChange={(e) => setNotification(e.target.value as AlertNotification)}
                                    className="select-trigger appearance-none pr-10"
                                >
                                    <option value="email">Email</option>
                                    <option value="push">Push</option>
                                    <option value="both">Both</option>
                                </select>
                                <ChevronIcon />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="white-btn w-full"
                        >
                            {isPending ? 'Creating...' : 'Create Alert'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

function ChevronIcon() {
    return (
        <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="20" height="20" viewBox="0 0 20 20" fill="none"
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="#9095A1"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
