import { HistoricalData, MarketData, SYMBOLS } from '@/types/market';

// Always use mock data for now
const USE_MOCK_DATA = true;

// Get API keys from environment variables (not used when USE_MOCK_DATA is true)
const POLYGON_API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

export async function fetchMarketData(): Promise<Record<string, MarketData>> {
  if (USE_MOCK_DATA) {
    return getMockMarketData();
  }

  try {
    // Try Polygon.io first if API key is available
    if (POLYGON_API_KEY) {
      return await fetchPolygonMarketData();
    }
    
    // Fallback to Finnhub if Polygon fails or no Polygon key
    if (FINNHUB_API_KEY) {
      return await fetchFinnhubMarketData();
    }
    
    throw new Error('No market data API keys configured');
  } catch (error) {
    console.error('Error fetching market data:', error);
    // Return mock data as fallback
    return getMockMarketData();
  }
}

async function fetchPolygonMarketData(): Promise<Record<string, MarketData>> {
  // This is a simplified example - you'd need to implement the actual API calls
  // and data transformation based on Polygon's API response format
  const results: Record<string, MarketData> = {};
  
  for (const symbol of SYMBOLS) {
    // In a real implementation, you would make API calls to Polygon's API here
    // For example:
    // const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`);
    // const data = await response.json();
    
    // For now, we'll use mock data
    results[symbol] = {
      symbol,
      lastClose: 100 + Math.random() * 100, // Random price between 100-200
      premarketPrice: 100 + Math.random() * 100, // Random price between 100-200
      premarketVolume: Math.floor(Math.random() * 1000000), // Random volume up to 1M
      atr14: 2 + Math.random() * 5, // Random ATR between 2-7
      gapPercent: -5 + Math.random() * 10, // Random gap between -5% and +5%
      updatedAt: new Date().toISOString(),
    };
  }
  
  return results;
}

async function fetchFinnhubMarketData(): Promise<Record<string, MarketData>> {
  const now = new Date();
  const results: Record<string, MarketData> = {};
  
  const stockData = [
    { symbol: 'NVDA', lastClose: 125.5, volatility: 0.03, avgVolume: 5000000 },
    { symbol: 'TSLA', lastClose: 250.75, volatility: 0.04, avgVolume: 8000000 },
    { symbol: 'AAPL', lastClose: 185.2, volatility: 0.02, avgVolume: 6000000 },
    { symbol: 'MSFT', lastClose: 330.4, volatility: 0.025, avgVolume: 4000000 },
    { symbol: 'AMZN', lastClose: 135.7, volatility: 0.03, avgVolume: 7000000 },
    { symbol: 'GOOGL', lastClose: 142.3, volatility: 0.025, avgVolume: 3000000 },
    { symbol: 'META', lastClose: 310.8, volatility: 0.035, avgVolume: 4500000 },
    { symbol: 'AMD', lastClose: 110.25, volatility: 0.04, avgVolume: 5500000 },
    { symbol: 'SPY', lastClose: 450.8, volatility: 0.015, avgVolume: 10000000 },
    { symbol: 'QQQ', lastClose: 375.2, volatility: 0.02, avgVolume: 8500000 },
  ];

  for (const stock of stockData) {
    const priceChange = (Math.random() * 2 - 1) * stock.volatility * stock.lastClose;
    const premarketPrice = stock.lastClose + priceChange;
    const gapPercent = (priceChange / stock.lastClose) * 100;
    
    const volumeMultiplier = 0.5 + Math.random(); 
    const premarketVolume = Math.floor(stock.avgVolume * volumeMultiplier * 0.1); 
    
    const atr14 = stock.lastClose * (0.01 + Math.random() * 0.02);
    
    results[stock.symbol] = {
      symbol: stock.symbol,
      lastClose: stock.lastClose,
      premarketPrice,
      premarketVolume,
      atr14,
      gapPercent,
      updatedAt: now.toISOString(),
    };
  }
  
  return results;
}

export async function fetchHistoricalData(symbol: string): Promise<HistoricalData[]> {
  if (USE_MOCK_DATA) {
    return getMockHistoricalData(symbol);
  }

  // In a real implementation, you would fetch data from Polygon/Finnhub here
  // For now, we'll just return mock data as a fallback.
  return getMockHistoricalData(symbol);
}

function getMockMarketData(): Record<string, MarketData> {
  const now = new Date().toISOString();
  return {
    NVDA: {
      symbol: 'NVDA',
      lastClose: 125.5,
      premarketPrice: 130.25,
      premarketVolume: 1250000,
      atr14: 3.2,
      gapPercent: 3.78,
      updatedAt: now,
    },
    TSLA: {
      symbol: 'TSLA',
      lastClose: 250.75,
      premarketPrice: 248.5,
      premarketVolume: 850000,
      atr14: 8.5,
      gapPercent: -0.9,
      updatedAt: now,
    },
    QQQ: {
      symbol: 'QQQ',
      lastClose: 375.2,
      premarketPrice: 378.9,
      premarketVolume: 250000,
      atr14: 5.7,
      gapPercent: 0.99,
      updatedAt: now,
    },
    SPY: {
      symbol: 'SPY',
      lastClose: 450.8,
      premarketPrice: 452.3,
      premarketVolume: 500000,
      atr14: 7.2,
      gapPercent: 0.33,
      updatedAt: now,
    },
  };
}

export const getMockHistoricalData = (symbol: string): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 90); // 90 days of data

  let currentDate = startDate;
  let lastClose = Math.random() * 500 + 50; // Start with a random price

  while (currentDate <= endDate) {
    const open = parseFloat((lastClose * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2));
    const high = parseFloat((Math.max(open, lastClose) * (1 + Math.random() * 0.02)).toFixed(2));
    const low = parseFloat((Math.min(open, lastClose) * (1 - Math.random() * 0.02)).toFixed(2));
    const close = parseFloat((low + Math.random() * (high - low)).toFixed(2));

    data.push({
      time: currentDate.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
    });

    lastClose = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Add a little extra logic for some symbols to make charts look different
  if (symbol === 'AAPL' || symbol === 'TSLA') {
    // Simulate a more volatile stock
    return data.map(d => ({
      ...d,
      high: d.high * 1.1,
      low: d.low * 0.9,
      close: d.low + Math.random() * (d.high - d.low),
    }));
  }

  return data;
};
