'use client';

import React, { useEffect, useRef, memo } from 'react';

interface CompanyProfileWidgetProps {
    symbol?: string;
}

function CompanyProfileWidget({ symbol = 'NASDAQ:AAPL' }: CompanyProfileWidgetProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        // Cleanup: Clear existing content to prevent widget duplication
        container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbol: symbol.toUpperCase(),
            colorTheme: 'dark',
            isTransparent: false,
            locale: 'en',
            width: '100%',
            height: 550,
            backgroundColor: '#050505',
        });

        container.current.appendChild(script);
    }, [symbol]);


    return (
        <div className="flex flex-col gap-4 w-full">
            <div
                className="tradingview-widget-container rounded-xl overflow-hidden border border-gray-800"
                ref={container}
            >
                <div className="tradingview-widget-container__widget" />
            </div>
        </div>
    );
}

export default memo(CompanyProfileWidget);
