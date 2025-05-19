"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useGetKlineDataQuery } from "@/Redux/apiSlice";
import LivePriceChart from "@/components/Socket/LivePriceChart";

/**
 * MarketChart component - displays real-time price charts with tabs
 */
export const MarketChart = () => {
    const [activeSymbol, setActiveSymbol] = useState("BTC/USDT");

    const formattedPair = activeSymbol.replace('/', '-');

    // Optional: Fetch initial kline data to supplement WebSocket data
    const { data: klineData } = useGetKlineDataQuery(
        { trading_pair: formattedPair, bar: "1m", limit: 100 },
        { skip: !formattedPair }
    );

    const handleSymbolChange = (value: string) => {
        setActiveSymbol(value);
    };

    return (
        <Card className="overflow-hidden dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <CardTitle>Price Chart</CardTitle>
                    <Tabs defaultValue="BTC/USDT" onValueChange={handleSymbolChange} className="w-auto">
                        <TabsList className="h-8">
                            <TabsTrigger value="BTC/USDT" className="text-xs px-2">BTC/USDT</TabsTrigger>
                            <TabsTrigger value="ETH/USDT" className="text-xs px-2">ETH/USDT</TabsTrigger>
                            <TabsTrigger value="SOL/USDT" className="text-xs px-2">SOL/USDT</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent className="p-0 pb-0">
                <div className="h-[350px]">
                    <LivePriceChart
                        symbol={activeSymbol}
                        showHeader={false}
                        height={350}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * TradingPairs component - a simpler version showing multiple charts in a grid
 */
export const TradingPairsGrid = () => {
    const tradingPairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "DOGE/USDT"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tradingPairs.map((pair) => (
                <Card key={pair} className="overflow-hidden dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader className="py-3">
                        <CardTitle className="text-base">{pair}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <LivePriceChart
                            symbol={pair}
                            showHeader={false}
                            height={200}
                            showChange={true}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};