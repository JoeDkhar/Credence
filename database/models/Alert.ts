import mongoose, { Schema, model, models } from 'mongoose';

const AlertSchema = new Schema(
    {
        userId: { type: String, required: true, index: true },
        symbol: { type: String, required: true, uppercase: true, trim: true, index: true },
        companyName: { type: String, required: true, trim: true },
        alertType: {
            type: String,
            enum: [
                'price_above', 'price_below',
                'percent_change_up', 'percent_change_down',
                'ma_cross_above', 'ma_cross_below',
                'volume_spike', 'earnings_proximity',
            ],
            required: true,
        },
        condition: { type: String, enum: ['price', 'volume', 'percent', 'moving_average', 'earnings'], required: true },
        // Per-type optional fields
        targetPrice: { type: Number },
        targetPercent: { type: Number },
        maPeriod: { type: Number, enum: [20, 50, 200] },
        volumeMultiplier: { type: Number },
        earningsDaysBefore: { type: Number },
        // Shared
        currentPrice: { type: Number },
        notification: { type: String, enum: ['email', 'push', 'both'], required: true },
        status: { type: String, enum: ['active', 'triggered', 'dismissed'], default: 'active' },
        triggeredAt: { type: Date },
    },
    { timestamps: true }
);

export default models.Alert || model('Alert', AlertSchema);
