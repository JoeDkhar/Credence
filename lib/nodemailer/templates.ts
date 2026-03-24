export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to Credence</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: #141414 !important; border: 1px solid #30333A !important; }
            .dark-bg { background-color: #050505 !important; }
            .dark-text { color: #ffffff !important; }
            .dark-text-secondary { color: #9ca3af !important; }
            .dark-text-muted { color: #6b7280 !important; }
            .dark-border { border-color: #30333A !important; }
        }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; margin: 0 !important; }
            .mobile-padding { padding: 24px !important; }
            .mobile-header-padding { padding: 24px 24px 12px 24px !important; }
            .mobile-text { font-size: 14px !important; line-height: 1.5 !important; }
            .mobile-title { font-size: 24px !important; line-height: 1.3 !important; }
            .mobile-button { width: 100% !important; text-align: center !important; }
            .mobile-button a { width: calc(100% - 64px) !important; display: block !important; text-align: center !important; }
            .mobile-outer-padding { padding: 20px 10px !important; }
            .dashboard-preview { padding: 0 15px 30px 15px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center" class="dashboard-preview" style="padding: 40px 40px 0px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/dashboard-preview.png" alt="Credence Dashboard Preview" width="100%" style="max-width: 520px; width: 100%; height: auto; border-radius: 12px; border: 1px solid #30333A;">
                        </td>
                    </tr>
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            <h1 class="mobile-title dark-text" style="margin: 0 0 30px 0; font-size: 24px; font-weight: 600; color: #FFFFFF; line-height: 1.2;">
                                Welcome aboard {{name}}
                            </h1>
                            {{intro}}  
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #CCDADC; font-weight: 600;">
                                Here's what you can do right now:
                            </p>
                            <ul class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; padding-left: 20px; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                <li style="margin-bottom: 12px;">Set up your watchlist to follow your favorite stocks</li>
                                <li style="margin-bottom: 12px;">Create price and volume alerts so you never miss a move</li>
                                <li style="margin-bottom: 12px;">Explore the dashboard for trends and the latest market news</li>
                            </ul>
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                We'll keep you informed with timely updates, insights, and alerts — so you can focus on making the right calls.
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 40px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: block; width: 100%; background: linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center; box-sizing: border-box;">
                                            Go to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p class="mobile-text dark-text-muted" style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important; text-align: center;">
                               Credence HQ, HSR Layout, Bangalore<br>
                                <a href="#" style="color: #CCDADC !important; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="https://stock-market-dev.vercel.app/" style="color: #CCDADC !important; text-decoration: underline;">Visit Credence</a><br>
                                © 2026 Credence
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market News Summary Today</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: #141414 !important; border: 1px solid #30333A !important; }
            .dark-text { color: #ffffff !important; }
        }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 24px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td align="left" style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150">
                        </td>
                    </tr>
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            <h1 class="dark-text" style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #FFFFFF; line-height: 1.2;">
                                Market News Summary Today
                            </h1>
                            <p style="margin: 0 0 30px 0; font-size: 14px; color: #6b7280;">{{date}}</p>
                            {{newsContent}}
                            <div style="text-align: center; margin: 40px 0 0 0; border-top: 1px solid #30333A; padding-top: 20px;">
                                <p style="font-size: 14px; color: #CCDADC !important;">© 2026 Credence</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Price Alert: {{symbol}} Hit Upper Target</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, sans-serif;">
    <table role="presentation" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <table width="100%" style="background-color: #10B981; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">📈 Price Above Reached</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <div style="text-align: center; padding: 30px 20px; background-color: #050505; border-radius: 8px; border: 1px solid #30333A; margin-bottom: 20px;">
                                <h2 style="margin: 0; font-size: 28px; color: #ffffff;">{{symbol}}</h2>
                                <p style="color: #6b7280;">{{company}}</p>
                                <p style="font-size: 36px; font-weight: 700; color: #10B981; margin: 10px 0;">{{currentPrice}}</p>
                            </div>
                            <div style="background-color: #212328; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <p style="color: #ffffff; margin: 0;"><strong>Target:</strong> {{targetPrice}}</p>
                                <p style="color: #9ca3af; margin: 5px 0 0 0;">Price exceeded your upper threshold.</p>
                            </div>
                            <a href="https://stock-market-dev.vercel.app/" style="display: block; background: linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%); color: #000000; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: 600;">View Dashboard</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Price Alert: {{symbol}} Hit Lower Target</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, sans-serif;">
    <table role="presentation" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <table width="100%" style="background-color: #dc2626; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">📉 Price Below Hit</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <div style="text-align: center; padding: 30px 20px; background-color: #050505; border-radius: 8px; border: 1px solid #30333A; margin-bottom: 20px;">
                                <h2 style="margin: 0; font-size: 28px; color: #ffffff;">{{symbol}}</h2>
                                <p style="color: #6b7280;">{{company}}</p>
                                <p style="font-size: 36px; font-weight: 700; color: #ef4444; margin: 10px 0;">{{currentPrice}}</p>
                            </div>
                            <div style="background-color: #050505; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #FFFFFF;">Potential Entry Found</h3>
                                <p style="margin: 0; color: #ccdadc;">{{symbol}} dropped below your target of {{targetPrice}}.</p>
                            </div>
                            <a href="https://stock-market-dev.vercel.app/" style="display: block; background: linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%); color: #000000; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: 600;">View Dashboard</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const VOLUME_ALERT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Volume Alert: {{symbol}}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, sans-serif;">
    <table role="presentation" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <table width="100%" style="background-color: #7c3aed; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">📊 Volume Alert</h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <div style="text-align: center; padding: 30px 20px; background-color: #050505; border-radius: 8px; border: 1px solid #30333A; margin-bottom: 30px;">
                                <h2 style="margin: 0; font-size: 28px; color: #ffffff;">{{symbol}}</h2>
                                <p style="font-size: 36px; font-weight: 700; color: #7c3aed; margin: 10px 0;">{{currentVolume}}M</p>
                            </div>
                            <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 10px 0; color: #ffffff;">Volume Spike Details</h3>
                                <p style="color: #9ca3af; margin: 0;">{{alertMessage}}</p>
                            </div>
                            <a href="https://stock-market-dev.vercel.app/" style="display: block; background: linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%); color: #000000; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: 600;">View Dashboard</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const INACTIVE_USER_REMINDER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We Miss You!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, sans-serif;">
    <table role="presentation" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="100%" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <img src="https://ik.imagekit.io/pai9aki0l/logo.png" alt="Credence Logo" width="150">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 40px 40px 40px;">
                            <h1 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 600; color: #FFFFFF; line-height: 1.2;">
                                We Miss You, {{name}}!
                            </h1>
                            <p style="margin: 0 0 30px 0; font-size: 16px; color: #CCDADC; line-height: 1.6;">
                                The markets have been moving, and there might be some opportunities you don't want to miss!
                            </p>
                            <div style="background-color: #050505; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; color: #FFFFFF;">Market Update</h3>
                                <p style="margin: 0; font-size: 14px; color: #ccdadc;">Major indices have seen significant movements since your last visit.</p>
                            </div>
                            <a href="{{dashboardUrl}}" style="display: block; background: linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 100%); color: #000000; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: 600;">Return to Dashboard</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;