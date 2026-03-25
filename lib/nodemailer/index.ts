import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Credence" <credence.financebusiness@gmail.com>`,
        to: email,
        subject: `Welcome to Credence - your stock market toolkit is ready!`,
        text: 'Thanks for joining Credence',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Credence News" <credence.financebusiness@gmail.com>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Credence`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};

export const sendPriceAlertEmail = async (
    { email, symbol, alertContent }: { email: string; symbol: string; alertContent: string }
): Promise<void> => {
    const { GENERIC_ALERT_TEMPLATE } = await import("@/lib/nodemailer/templates");
    
    const htmlTemplate = GENERIC_ALERT_TEMPLATE
        .replace('{{content}}', alertContent);

    const mailOptions = {
        from: `"Credence Alerts" <credence.financebusiness@gmail.com>`,
        to: email,
        subject: `🚨 Price Alert Triggered for ${symbol}`,
        text: `Your price alert for ${symbol} was triggered.`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};