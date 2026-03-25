// Type declarations for TradingView custom web components.
// These are HTML custom elements registered at runtime by TradingView widget scripts.
// Without these declarations, TypeScript will error on hyphenated JSX tags.

import type { HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tv-market-summary': HTMLAttributes<HTMLElement> & {
        direction?: 'horizontal' | 'vertical';
        theme?: 'light' | 'dark';
        transparent?: 'true' | 'false';
        locale?: string;
        'color-theme'?: 'light' | 'dark';
        width?: string | number;
        height?: string | number;
      };
    }
  }
}

