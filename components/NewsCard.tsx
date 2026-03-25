'use client';

import React from 'react';

interface NewsCardProps {
    article: {
        id: number;
        headline: string;
        summary: string;
        source: string;
        url: string;
        datetime: number;
        category?: string;
        related?: string;
        image?: string;
    };
}

export function NewsCard({ article }: NewsCardProps) {
    const handleNewsClick = () => {
        window.open(article.url, '_blank', 'noreferrer');
    };

    return (
        <div 
            className="news-item flex flex-col items-start cursor-pointer hover:border-gray-500 transition-all h-full group" 
            onClick={handleNewsClick}
        >
            <div className="flex flex-col gap-2 w-full flex-1">
                {article.related && (
                    <span className="news-tag shrink-0">
                        {article.related}
                    </span>
                )}
                <h3 className="news-title line-clamp-3 min-h-[4.5rem] group-hover:text-gray-100 transition-colors">{article.headline}</h3>
                <p className="news-summary line-clamp-3 text-sm text-gray-400 leading-relaxed">{article.summary}</p>
            </div>
            
            <div className="mt-auto pt-5 flex items-center justify-between w-full border-t border-gray-700">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{new Date(article.datetime * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })}</span>
                </div>
                <span className="news-cta text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors">READ →</span>
            </div>
        </div>
    );
}
