export type AlertType =
    | 'price_above'
    | 'price_below'
    | 'percent_change_up'
    | 'percent_change_down'
    | 'ma_cross_above'
    | 'ma_cross_below'
    | 'volume_spike'
    | 'earnings_proximity';

export type AlertCondition = 'price' | 'volume' | 'percent' | 'moving_average' | 'earnings';

// How often the alert email fires once the condition is met
export type AlertFrequency =
    | 'once'           // fire once then mark triggered — never repeat
    | 'once_per_day'   // fire at most once per calendar day
    | 'once_per_week'  // fire at most once per week
    | 'every_time';    // fire every 5-min check while condition holds

export type AlertStatus = 'active' | 'triggered' | 'dismissed';
export type MovingAveragePeriod = 20 | 50 | 200;

export interface IAlert {
    _id: string;
    userId: string;
    symbol: string;
    companyName: string;
    alertType: AlertType;
    condition: AlertCondition;
    // Price / % alerts
    targetPrice?: number;
    targetPercent?: number;
    // MA alerts
    maPeriod?: MovingAveragePeriod;
    // Volume spike alerts
    volumeMultiplier?: number;
    // Earnings proximity alerts
    earningsDaysBefore?: number;
    // Shared
    currentPrice?: number;
    frequency: AlertFrequency;
    lastNotifiedAt?: Date;   // tracks when we last sent an email for this alert
    status: AlertStatus;
    createdAt: Date;
    triggeredAt?: Date;
}

export interface CreateAlertInput {
    symbol: string;
    companyName: string;
    alertType: AlertType;
    condition: AlertCondition;
    frequency: AlertFrequency;
    targetPrice?: number;
    targetPercent?: number;
    maPeriod?: MovingAveragePeriod;
    volumeMultiplier?: number;
    earningsDaysBefore?: number;
}

export interface AlertFormState {
    alerts: IAlert[];
    isLoading: boolean;
    error: string | null;
}

export const ALERT_TYPE_LABELS: Record<AlertType, string> = {
    price_above: 'Price rises above',
    price_below: 'Price falls below',
    percent_change_up: '% gain in a day',
    percent_change_down: '% drop in a day',
    ma_cross_above: 'Price crosses above MA',
    ma_cross_below: 'Price crosses below MA',
    volume_spike: 'Volume spike',
    earnings_proximity: 'Earnings coming up',
};

export const ALERT_FREQUENCY_LABELS: Record<AlertFrequency, string> = {
    once: 'Once (then stop)',
    once_per_day: 'Once per day',
    once_per_week: 'Once per week',
    every_time: 'Every time it triggers',
};