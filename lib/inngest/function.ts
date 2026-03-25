import { inngest } from "@/lib/inngest/client";
import {
    NEWS_SUMMARY_EMAIL_PROMPT,
    PERSONALIZED_WELCOME_EMAIL_PROMPT,
    PRICE_ABOVE_ALERT_PROMPT,
    PRICE_BELOW_ALERT_PROMPT,
    PERCENT_CHANGE_ALERT_PROMPT,
    MA_CROSS_ALERT_PROMPT,
    VOLUME_SPIKE_ALERT_PROMPT,
    EARNINGS_PROXIMITY_ALERT_PROMPT
} from "@/lib/inngest/prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail, sendPriceAlertEmail } from "@/lib/nodemailer";
import { getAllUsersForNewsEmail } from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { getNews } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";
import { connectToDatabase } from '@/database/mongoose';
import AlertModel from '@/database/models/Alert';
import { updateAlertStatus } from '@/lib/actions/alerts';
import { IAlert } from '@/types/alert';


export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created' },
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'

            const { data: { email, name } } = event;

            return await sendWelcomeEmail({ email, name, intro: introText });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }],
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if (!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: (placeholder) Summarize news via AI
        const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
            try {
                const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                const response = await step.ai.infer(`summarize-news-${user.email}`, {
                    model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                    body: {
                        contents: [{ role: 'user', parts: [{ text: prompt }] }]
                    }
                });

                const part = response.candidates?.[0]?.content?.parts?.[0];
                const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                userNewsSummaries.push({ user, newsContent });
            } catch (e) {
                console.error('Failed to summarize news for : ', user.email);
                userNewsSummaries.push({ user, newsContent: null });
            }
        }

        // Step #4: (placeholder) Send the emails
        await step.run('send-news-emails', async () => {
            await Promise.all(
                userNewsSummaries.map(async ({ user, newsContent }) => {
                    if (!newsContent) return false;

                    return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent })
                })
            )
        })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)

const FINNHUB = (path: string) =>
    `https://finnhub.io/api/v1${path}&token=${process.env.FINNHUB_API_KEY}`;

// ── helpers ──────────────────────────────────────────────────────────────────

async function getQuote(symbol: string): Promise<{ c: number; dp: number; v: number } | null> {
    try {
        const res = await fetch(FINNHUB(`/quote?symbol=${symbol}`));
        return res.ok ? res.json() : null;
    } catch { return null; }
}

async function getCandles(symbol: string, days: number): Promise<number[]> {
    // Finnhub /stock/candle returns OHLCV; we need closing prices for MA
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60;
    try {
        const res = await fetch(FINNHUB(`/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}`));
        const data = await res.json();
        return data.s === 'ok' ? (data.c as number[]) : [];
    } catch { return []; }
}

async function getVolumes(symbol: string, days = 30): Promise<number[]> {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60;
    try {
        const res = await fetch(FINNHUB(`/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}`));
        const data = await res.json();
        return data.s === 'ok' ? (data.v as number[]) : [];
    } catch { return []; }
}

async function getNextEarningsDate(symbol: string): Promise<string | null> {
    // Finnhub earnings calendar — returns upcoming dates
    const from = new Date().toISOString().split('T')[0];
    const to = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    try {
        const res = await fetch(FINNHUB(`/calendar/earnings?symbol=${symbol}&from=${from}&to=${to}`));
        const data = await res.json();
        const dates: string[] = (data.earningsCalendar ?? []).map((e: { date: string }) => e.date);
        return dates.length > 0 ? dates[0] : null;
    } catch { return null; }
}

function average(arr: number[]): number {
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

// ── main function ─────────────────────────────────────────────────────────────

export const checkPriceAlerts = inngest.createFunction(
    { id: 'check-price-alerts' },
    { cron: '*/5 * * * *' },
    async ({ step }) => {
        // 1. Fetch all active alerts using .lean()
        const alerts: IAlert[] = await step.run('fetch-active-alerts', async () => {
            await connectToDatabase();
            const docs = await AlertModel.find({ status: 'active' }).lean();
            return JSON.parse(JSON.stringify(docs));
        });

        if (!alerts || alerts.length === 0) return { success: true, message: 'No active alerts to check' };

        const results: string[] = [];
        let triggeredCount = 0;

        for (const alert of alerts) {
            // 2. Frequency Gate — Check if we should evaluate this alert based on its frequency
            const shouldCheck = await step.run(`frequency-gate-${alert._id}`, async () => {
                if (alert.frequency === 'every_time') return true;
                if (!alert.lastNotifiedAt) return true;

                const lastNotified = new Date(alert.lastNotifiedAt).getTime();
                const now = Date.now();
                const oneDayMs = 24 * 60 * 60 * 1000;
                const oneWeekMs = 7 * oneDayMs;

                if (alert.frequency === 'once_per_day') return (now - lastNotified) >= oneDayMs;
                if (alert.frequency === 'once_per_week') return (now - lastNotified) >= oneWeekMs;

                return false; // 'once' freq with active status is handled by evaluation
            });

            if (!shouldCheck) continue;

            const triggerResult = await step.run(`evaluate-alert-${alert._id}`, async () => {
                const quote = await getQuote(alert.symbol);
                console.log('Quote for', alert.symbol, ':', quote);
                if (!quote) return null;

                let isTriggered = false;
                let direction: 'up' | 'down' | 'above' | 'below' = 'above';
                let maValue: number | null = null;
                let currentVolume: number | null = null;
                let avgVolume: number | null = null;
                let earningsDate: string | null = null;
                let daysUntilEarnings: number | null = null;

                switch (alert.alertType) {
                    case 'price_above':
                        isTriggered = Boolean(alert.targetPrice && quote.c >= alert.targetPrice);
                        direction = 'above';
                        break;
                    case 'price_below':
                        isTriggered = Boolean(alert.targetPrice && quote.c <= alert.targetPrice);
                        direction = 'below';
                        break;
                    case 'percent_change_up':
                        isTriggered = Boolean(alert.targetPercent && quote.dp >= alert.targetPercent);
                        direction = 'up';
                        break;
                    case 'percent_change_down':
                        isTriggered = Boolean(alert.targetPercent && quote.dp <= -(alert.targetPercent));
                        direction = 'down';
                        break;
                    case 'ma_cross_above':
                    case 'ma_cross_below': {
                        const period = alert.maPeriod ?? 50;
                        const closes = await getCandles(alert.symbol, period + 5);
                        if (closes.length < period) break;
                        // Exclude current (partial) candle (the last element)
                        const historicCloses = closes.slice(0, -1).slice(-period);
                        maValue = average(historicCloses);
                        isTriggered = alert.alertType === 'ma_cross_above' ? quote.c > maValue : quote.c < maValue;
                        direction = alert.alertType === 'ma_cross_above' ? 'above' : 'below';
                        break;
                    }
                    case 'volume_spike': {
                        const vols = await getVolumes(alert.symbol, 31);
                        if (vols.length < 2) break;
                        // Exclude today's volume (index vols.length-1) to calculate historic average
                        const historicVols = vols.slice(0, -1).slice(-30);
                        avgVolume = average(historicVols);
                        currentVolume = quote.v || vols[vols.length - 1]; // Use current quote volume or last candle
                        isTriggered = Boolean(alert.volumeMultiplier && currentVolume >= (avgVolume * alert.volumeMultiplier));
                        break;
                    }
                    case 'earnings_proximity': {
                        earningsDate = await getNextEarningsDate(alert.symbol);
                        if (!earningsDate) break;
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const earnings = new Date(earningsDate);
                        earnings.setHours(0, 0, 0, 0);
                        daysUntilEarnings = Math.round((earnings.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                        isTriggered = Boolean(alert.earningsDaysBefore && daysUntilEarnings === alert.earningsDaysBefore);
                        break;
                    }
                }

                if (isTriggered) {
                    return {
                        isTriggered: true,
                        quote,
                        direction,
                        maValue,
                        currentVolume,
                        avgVolume,
                        earningsDate,
                        daysUntilEarnings
                    };
                }
                return null;
            });

            if (triggerResult?.isTriggered) {
                triggeredCount++;

                // 3. Document status update
                await step.run(`update-alert-doc-${alert._id}`, async () => {
                    await connectToDatabase();
                    if (alert.frequency === 'once') {
                        await updateAlertStatus(alert._id, 'triggered');
                    } else {
                        await AlertModel.updateOne({ _id: alert._id }, { lastNotifiedAt: new Date() });
                    }
                });

                // 4. Claude AI Email Generation
                const alertPrompt = await step.run(`generate-prompt-${alert._id}`, async () => {
                    let p = '';
                    const data = triggerResult;
                    const timestamp = new Date().toLocaleString();

                    switch (alert.alertType) {
                        case 'price_above':
                            p = PRICE_ABOVE_ALERT_PROMPT;
                            break;
                        case 'price_below':
                            p = PRICE_BELOW_ALERT_PROMPT;
                            break;
                        case 'percent_change_up':
                        case 'percent_change_down':
                            p = PERCENT_CHANGE_ALERT_PROMPT
                                .replace('{{direction}}', data.direction || 'up')
                                .replace('{{changePercent}}', Math.abs(data.quote?.dp || 0).toFixed(2));
                            break;
                        case 'ma_cross_above':
                        case 'ma_cross_below':
                            p = MA_CROSS_ALERT_PROMPT
                                .replace('{{direction}}', data.direction || 'above')
                                .replace('{{maPeriod}}', String(alert.maPeriod))
                                .replace('{{maValue}}', (data.maValue || 0).toFixed(2));
                            break;
                        case 'volume_spike':
                            p = VOLUME_SPIKE_ALERT_PROMPT
                                .replace('{{currentVolume}}', ((data.currentVolume || 0) / 1e6).toFixed(2) + 'M')
                                .replace('{{avgVolume}}', ((data.avgVolume || 0) / 1e6).toFixed(2) + 'M')
                                .replace('{{multiplier}}', String(alert.volumeMultiplier));
                            break;
                        case 'earnings_proximity':
                            p = EARNINGS_PROXIMITY_ALERT_PROMPT
                                .replace('{{earningsDate}}', data.earningsDate || '')
                                .replace('{{daysUntil}}', String(data.daysUntilEarnings));
                            break;
                    }

                    return p
                        .replace(/{{symbol}}/g, alert.symbol)
                        .replace(/{{companyName}}/g, alert.companyName)
                        .replace(/{{targetPrice}}/g, String(alert.targetPrice || 0))
                        .replace(/{{currentPrice}}/g, (data.quote?.c || 0).toFixed(2))
                        .replace(/{{triggeredAt}}/g, timestamp);
                });

                const response = await step.ai.infer(`generate-alert-html-${alert._id}`, {
                    model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                    body: {
                        contents: [{ role: 'user', parts: [{ text: alertPrompt }] }]
                    }
                });

                const part = response.candidates?.[0]?.content?.parts?.[0];
                const htmlContent = (part && 'text' in part ? part.text : null) || '<p>Your alert was triggered.</p>';

                // 5. Send via mailer
                await step.run(`send-email-${alert._id}`, async () => {
                    // Fetch user email from database — using lean collection access for speed
                    await connectToDatabase();
                    const mongoose = await import('mongoose');
                    const db = mongoose.default.connection.db;
                    if (!db) return;

                    // Mongoose maps 'id' in schema but in raw collection it depends on auth setup (usually it's a field)
                    // We assume alert.userId matches the user document's ID field
                    const user = await db.collection('user').findOne<{ email: string }>(
                        { $or: [{ id: alert.userId }, { _id: new mongoose.default.Types.ObjectId(alert.userId) }] }
                    );

                    if (user?.email) {
                        await sendPriceAlertEmail({
                            email: user.email,
                            symbol: alert.symbol,
                            alertContent: htmlContent
                        });
                    }
                });

                results.push(`${alert.symbol} triggered`);
            }
        }

        return {
            success: true,
            message: `Processed ${alerts.length} alerts, ${triggeredCount} triggered.`,
            triggeredSymbols: results
        };
    }
);


// ── util: human-readable summary per alert type ───────────────────────────────
function buildAlertSummary(alert: IAlert): string {
    switch (alert.alertType) {
        case 'price_above':
            return `${alert.symbol} rose above your target of $${alert.targetPrice}`;
        case 'price_below':
            return `${alert.symbol} fell below your target of $${alert.targetPrice}`;
        case 'percent_change_up':
            return `${alert.symbol} gained ${alert.targetPercent}%+ today`;
        case 'percent_change_down':
            return `${alert.symbol} dropped ${alert.targetPercent}%+ today`;
        case 'ma_cross_above':
            return `${alert.symbol} crossed above the ${alert.maPeriod}-day moving average`;
        case 'ma_cross_below':
            return `${alert.symbol} crossed below the ${alert.maPeriod}-day moving average`;
        case 'volume_spike':
            return `${alert.symbol} volume spiked ${alert.volumeMultiplier}× above its 30-day average`;
        case 'earnings_proximity':
            return `${alert.symbol} earnings report is ${alert.earningsDaysBefore} day(s) away`;
        default:
            return `Alert triggered for ${alert.symbol}`;
    }
}