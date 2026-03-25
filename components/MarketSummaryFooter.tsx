'use client';

import React, { useEffect } from 'react';

export default function MarketSummaryFooter() {
    useEffect(() => {
        const scriptId = 'tradingview-market-summary-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://widgets.tradingview-widget.com/w/en/tv-market-summary.js';
            script.type = 'module';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="w-full mt-8 pb-10 bg-[#050505]">
            <div className="min-h-[120px] bg-[#050505]">
                <tv-market-summary
                    direction="horizontal"
                    theme="dark"
                    transparent="true"
                    locale="en"
                ></tv-market-summary>
            </div>
        </div>
    );
}
