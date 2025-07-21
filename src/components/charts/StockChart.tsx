'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchHistoricalData } from '@/lib/services/market';
import { HistoricalData } from '@/types/market';
import { ApexOptions } from 'apexcharts';

// Dynamically import the chart component to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StockChartProps {
  symbol: string;
}

export default function StockChart({ symbol }: StockChartProps) {
  const [data, setData] = useState<HistoricalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const historicalData = await fetchHistoricalData(symbol);
        setData(historicalData);
      } catch (err) {
        console.error(`Error fetching historical data for ${symbol}:`, err);
        setError('Failed to load chart data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [symbol]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-80">Loading chart...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-80 text-red-500">{error}</div>;
  }

  const series = [
    {
      data: data.map(d => ({
        x: new Date(d.time).getTime(),
        y: [d.open, d.high, d.low, d.close],
      })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#888',
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: '#888',
        },
        formatter: (value) => `$${value.toFixed(2)}`,
      }
    },
    grid: {
      borderColor: '#444',
      strokeDashArray: 3,
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy',
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00B746',
          downward: '#EF403C',
        },
        wick: {
          useFillColor: true,
        }
      }
    }
  };

  return (
    <div className="w-full h-80">
      <Chart options={options} series={series} type="candlestick" height="100%" />
    </div>
  );
}
