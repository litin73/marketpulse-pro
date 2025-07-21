export interface MarketData {
  symbol: string;
  lastClose: number;
  premarketPrice: number;
  premarketVolume: number;
  atr14: number;
  gapPercent: number;
  updatedAt: string;
}

export const SYMBOLS = ['NVDA', 'TSLA', 'QQQ', 'SPY'] as const;
export type Symbol = typeof SYMBOLS[number];

export interface MarketDataMap {
  [symbol: string]: MarketData;
}

export interface HistoricalData {
  time: string; 
  open: number;
  high: number;
  low: number;
  close: number;
}
