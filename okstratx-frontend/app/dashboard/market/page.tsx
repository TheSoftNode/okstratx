"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CandlestickChart, BarChart, Star, Download } from "lucide-react";
import MarketView from "@/components/Dashboard/Market/MarketView";
import ChartView from "@/components/Dashboard/Market/ChartView";
import { MARKET_DATA } from "@/components/Dashboard/helpers/util";



// Sample trading pairs to watch



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