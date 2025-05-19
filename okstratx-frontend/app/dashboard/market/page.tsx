"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CandlestickChart, BarChart, Star, Download } from "lucide-react";
import MarketView from "@/components/Dashboard/Market/MarketView";
import ChartView from "@/components/Dashboard/Market/ChartView";

// Define Market Data Types
export interface MarketDataItem {
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
}

export interface WatchedPair {
    symbol: string;
    price: number;
    change24h: number;
}

// Market data sample - In production, this would come from an API
const MARKET_DATA: MarketDataItem[] = [
    { symbol: "BTC/USDT", price: 64532.20, change24h: 2.5, volume24h: 12500000000, marketCap: 1280000000000 },
    { symbol: "ETH/USDT", price: 5372.45, change24h: -1.2, volume24h: 8200000000, marketCap: 650000000000 },
    { symbol: "SOL/USDT", price: 148.75, change24h: 4.8, volume24h: 3800000000, marketCap: 65000000000 },
    { symbol: "XRP/USDT", price: 1.27, change24h: 0.8, volume24h: 2100000000, marketCap: 57000000000 },
    { symbol: "DOGE/USDT", price: 0.18, change24h: -3.1, volume24h: 1750000000, marketCap: 24000000000 },
    { symbol: "AVAX/USDT", price: 42.36, change24h: 5.3, volume24h: 1450000000, marketCap: 16000000000 },
    { symbol: "MATIC/USDT", price: 1.48, change24h: 1.7, volume24h: 1350000000, marketCap: 15000000000 },
    { symbol: "LINK/USDT", price: 18.92, change24h: 3.2, volume24h: 950000000, marketCap: 11000000000 },
    { symbol: "UNI/USDT", price: 10.87, change24h: -0.5, volume24h: 850000000, marketCap: 8200000000 },
    { symbol: "AAVE/USDT", price: 162.35, change24h: 2.8, volume24h: 750000000, marketCap: 7100000000 },
];

// Sample trading pairs to watch
export const WATCHED_PAIRS: WatchedPair[] = [
    { symbol: "BTC/USDT", price: 64532.20, change24h: 2.5 },
    { symbol: "ETH/USDT", price: 5372.45, change24h: -1.2 },
    { symbol: "SOL/USDT", price: 148.75, change24h: 4.8 },
    { symbol: "XRP/USDT", price: 1.27, change24h: 0.8 },
];

// Time intervals for kline data
export interface TimeInterval {
    value: string;
    label: string;
}

export const TIME_INTERVALS: TimeInterval[] = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "4h", label: "4 Hours" },
    { value: "1d", label: "1 Day" },
    { value: "1w", label: "1 Week" },
];

/**
 * MarketDataPage - Dashboard section for market data and price charts
 */
const MarketDataPage: React.FC = () => {
    const [selectedPair, setSelectedPair] = useState<string>("BTC/USDT");
    const [timeInterval, setTimeInterval] = useState<string>("1h");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewType, setViewType] = useState<string>("charts");

    // Filter market data based on search
    const filteredMarketData = MARKET_DATA.filter(item =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6  dark:bg-slate-900/80 min-h-screen p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Market Data</h1>
                    <p className="text-slate-400">Live charts and market information</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <Tabs
                        value={viewType}
                        onValueChange={setViewType}
                        className="w-full md:w-auto dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg"
                    >
                        <TabsList className="flex flex-wrap gap-3 w-full md:w-[200px] h-full bg-slate-800">
                            <TabsTrigger value="charts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                <CandlestickChart className="mr-2 h-4 w-4" />
                                Charts
                            </TabsTrigger>
                            <TabsTrigger value="market" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                <BarChart className="mr-2 h-4 w-4" />
                                Market
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
                        <Star className="mr-2 h-4 w-4 text-yellow-500" />
                        Watchlist
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white">
                        <Download className="mr-2 h-4 w-4 text-blue-400" />
                        Export
                    </Button>
                </div>
            </div>

            <Tabs value={viewType} className="mt-0 space-y-6">
                <TabsContent value="charts" className="mt-0 space-y-6">
                    <ChartView
                        selectedPair={selectedPair}
                        setSelectedPair={setSelectedPair}
                        timeInterval={timeInterval}
                        setTimeInterval={setTimeInterval}
                        marketData={MARKET_DATA}
                    />
                </TabsContent>

                <TabsContent value="market" className="mt-0 space-y-6">
                    <MarketView
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filteredMarketData={filteredMarketData}
                        setSelectedPair={setSelectedPair}
                        setViewType={setViewType}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MarketDataPage;