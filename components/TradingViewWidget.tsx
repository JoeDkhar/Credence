'use client';


import React, { useRef, memo } from 'react';
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import {cn} from "@/lib/utils";

interface TradingViewWidgetProps {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height: number;
    className?: string;
}

const TradingViewWidget = ({ scriptUrl, config, height = 600, className}: TradingViewWidgetProps) =>{
    const containerRef = useTradingViewWidget(scriptUrl, config, height);

    return (
        <div className={cn('tradingview-widget-container w-full', className)} ref={containerRef} style={{ minHeight: `${height}px` }}>
            <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
        </div>
    );
}

export default memo(TradingViewWidget);
