'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MarketData } from '@/types/market';
import { SYMBOLS } from '@/types/market';
import { fetchMarketData as fetchMarketDataService } from '@/lib/services/market';
import StockChart from '@/components/charts/StockChart';

export default function PremarketScreener() {
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  // Error state is kept for future error handling
  const [, setError] = useState<string | null>(null);

  const loadMarketData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchMarketDataService();
      setMarketData(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to load market data. Using cached data if available.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
    
    // Set up polling every 60 seconds
    const intervalId = setInterval(loadMarketData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const getGapBadgeVariant = (gapPercent: number) => {
    if (gapPercent > 0) return 'success';
    if (gapPercent < 0) return 'destructive';
    return 'secondary';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Premarket Screener</CardTitle>
          <div className="text-sm text-muted-foreground">
            {isLoading ? 'Updating...' : `Updated: ${new Date(lastUpdated).toLocaleTimeString()}`}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <div role="table" className="w-full">
            <div role="rowheader" className="border-b">
              <div role="row" className="flex text-sm font-medium text-muted-foreground px-4 py-2">
                <div role="columnheader" className="flex-1">Symbol</div>
                <div role="columnheader" className="w-24 text-right">Last Close</div>
                <div role="columnheader" className="w-24 text-right">Premarket</div>
                <div role="columnheader" className="w-24 text-right">Gap %</div>
                <div role="columnheader" className="w-24 text-right">Volume</div>
                <div role="columnheader" className="w-24 text-right">ATR(14)</div>
              </div>
            </div>
            <div role="rowgroup">
              {SYMBOLS.map((symbol) => {
                const data = marketData[symbol];
                if (!data) return null;

                const gapPercent = data.lastClose !== 0 ? ((data.premarketPrice - data.lastClose) / data.lastClose) * 100 : 0;

                return (
                  <AccordionItem value={symbol} key={symbol}>
                    <AccordionTrigger>
                      <div role="row" className="flex items-center text-sm px-4">
                        <div role="cell" className="flex-1 font-medium">{symbol}</div>
                        <div role="cell" className="w-24 text-right">${formatNumber(data.lastClose)}</div>
                        <div role="cell" className="w-24 text-right">${formatNumber(data.premarketPrice)}</div>
                        <div role="cell" className="w-24 text-right">
                          <Badge variant={getGapBadgeVariant(gapPercent)} className="min-w-[60px] justify-center">
                            {gapPercent > 0 ? '+' : ''}{formatNumber(gapPercent)}%
                          </Badge>
                        </div>
                        <div role="cell" className="w-24 text-right">{formatVolume(data.premarketVolume)}</div>
                        <div role="cell" className="w-24 text-right">{formatNumber(data.atr14, 2)}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="p-4 bg-muted/20">
                        <StockChart symbol={symbol} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </div>
          </div>
        </Accordion>
      </CardContent>
    </Card>
  );
}
