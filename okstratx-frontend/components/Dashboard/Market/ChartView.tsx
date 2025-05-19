// "use client";

// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// import { LineChart, CandlestickChart, AreaChart, Filter, Settings } from "lucide-react";
// import LivePriceChart from "@/components/Socket/LivePriceChart";
// import { useGetKlineDataQuery, useGetMarketDataQuery } from "@/Redux/apiSlice";
// import { useWebSocket } from "@/hooks/useWebSocket";
// import WebSocketStatus from "@/components/Socket/WebSocketStatus";
// import PriceCard from "./PriceCard";
// import MarketNews from "./MarketNews";
// import { MarketDataItem, TIME_INTERVALS, WATCHED_PAIRS } from "@/app/dashboard/market/page";

// interface ChartViewProps {
//     selectedPair: string;
//     setSelectedPair: (pair: string) => void;
//     timeInterval: string;
//     setTimeInterval: (interval: string) => void;
//     marketData: MarketDataItem[];
// }

// const ChartView: React.FC<ChartViewProps> = ({
//     selectedPair,
//     setSelectedPair,
//     timeInterval,
//     setTimeInterval,
//     marketData
// }) => {
//     // Fetch market data for selected pair using the Redux API
//     const { data: marketDataResponse, isLoading: isLoadingMarket } = useGetMarketDataQuery(selectedPair);

//     // Fetch kline data for selected pair and interval
//     const { data: klineData, isLoading: isLoadingKline } = useGetKlineDataQuery({
//         trading_pair: selectedPair,
//         bar: timeInterval,
//         limit: 100
//     });

//     // Connect to WebSocket for real-time updates
//     const wsEndpoint = `ws://localhost:8000/ws/market_data/${selectedPair}`;
//     const { isConnected, isConnecting, error, reconnect } = useWebSocket(wsEndpoint);

//     // Helper function to convert timeInterval to seconds
//     const getTimeWindowInSeconds = (interval: string): number => {
//         switch (interval) {
//             case "1m": return 60;
//             case "5m": return 300;
//             case "15m": return 900;
//             case "30m": return 1800;
//             case "1h": return 3600;
//             case "4h": return 14400;
//             case "1d": return 86400;
//             case "1w": return 604800;
//             default: return 3600;
//         }
//     };

//     return (
//         <>
//             {/* Watched Trading Pairs */}
//             <Card className="bg-slate-50 text-white dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
//                 <CardHeader className="pb-3">
//                     <CardTitle>Quick Access</CardTitle>
//                     <CardDescription className="text-slate-400">Commonly watched trading pairs</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {WATCHED_PAIRS.map((pair) => (
//                             <PriceCard
//                                 key={pair.symbol}
//                                 pair={pair}
//                                 isSelected={selectedPair === pair.symbol}
//                                 onClick={() => setSelectedPair(pair.symbol)}
//                             />
//                         ))}
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Main Chart */}
//             <Card className="overflow-hidden dark:bg-slate-900/90  dark:border-indigo-900/30 shadow-lg border-slate-700 text-white">
//                 <CardHeader className="pb-0">
//                     <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center">
//                         <div>
//                             <CardTitle>{selectedPair} Chart</CardTitle>
//                             <CardDescription className="text-slate-400">
//                                 Real-time and historical price data
//                             </CardDescription>
//                         </div>
//                         <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-2">
//                             <Select
//                                 value={selectedPair}
//                                 onValueChange={setSelectedPair}
//                             >
//                                 <SelectTrigger className="w-full md:w-[180px] bg-slate-700 border-slate-600 text-white">
//                                     <SelectValue placeholder="Select pair" />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-slate-700 border-slate-600 text-white">
//                                     {marketData.map((item) => (
//                                         <SelectItem key={item.symbol} value={item.symbol}>
//                                             {item.symbol}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>

//                             <Select
//                                 value={timeInterval}
//                                 onValueChange={setTimeInterval}
//                             >
//                                 <SelectTrigger className="w-full md:w-[130px] bg-slate-700 border-slate-600 text-white">
//                                     <SelectValue placeholder="Timeframe" />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-slate-700 border-slate-600 text-white">
//                                     {TIME_INTERVALS.map((interval) => (
//                                         <SelectItem key={interval.value} value={interval.value}>
//                                             {interval.label}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>

//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white">
//                                         <Settings className="mr-2 h-4 w-4" />
//                                         Options
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end" className="bg-slate-700 border-slate-600 text-white">
//                                     <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
//                                         <LineChart className="mr-2 h-4 w-4 text-blue-400" />
//                                         Line Chart
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
//                                         <CandlestickChart className="mr-2 h-4 w-4 text-green-400" />
//                                         Candlestick
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
//                                         <AreaChart className="mr-2 h-4 w-4 text-purple-400" />
//                                         Area Chart
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator className="bg-slate-600" />
//                                     <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
//                                         <Filter className="mr-2 h-4 w-4 text-yellow-400" />
//                                         Technical Indicators
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </div>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="pt-6 pb-2 px-2 md:px-6">
//                     <div className="h-[500px] bg-slate-900 rounded-lg p-4">
//                         <LivePriceChart
//                             symbol={selectedPair}
//                             height={500}
//                             showHeader={false}
//                             showChange={true}
//                             timeWindow={getTimeWindowInSeconds(timeInterval)}
//                         />
//                     </div>

//                     {isLoadingMarket ? (
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-slate-700">
//                             {Array(4).fill(0).map((_, i) => (
//                                 <div key={i} className="text-center">
//                                     <div className="text-sm text-slate-400 animate-pulse bg-slate-700 h-4 w-20 mx-auto mb-2 rounded"></div>
//                                     <div className="text-lg font-bold text-white animate-pulse bg-slate-700 h-6 w-24 mx-auto rounded"></div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-slate-700">
//                             <div className="text-center">
//                                 <div className="text-sm text-slate-400">24h High</div>
//                                 <div className="text-lg font-bold text-white">$65,842</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-sm text-slate-400">24h Low</div>
//                                 <div className="text-lg font-bold text-white">$62,198</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-sm text-slate-400">24h Volume</div>
//                                 <div className="text-lg font-bold text-white">$12.5B</div>
//                             </div>
//                             <div className="text-center">
//                                 <div className="text-sm text-slate-400">Market Cap</div>
//                                 <div className="text-lg font-bold text-white">$1.28T</div>
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>

//             {/* WebSocket Status */}
//             <div className="mb-4">
//                 <WebSocketStatus
//                     endpoint={wsEndpoint}
//                     isConnected={isConnected}
//                     isConnecting={isConnecting}
//                     error={error}
//                     reconnect={reconnect}
//                     variant="badge"
//                 //   useInternalWebSocket={false} 
//                 />
//             </div>

//             {/* Market News */}
//             <MarketNews />
//         </>
//     );
// };
// export default ChartView;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LineChart, CandlestickChart, AreaChart, Filter, Settings } from "lucide-react";
import LivePriceChart from "@/components/Socket/LivePriceChart";
import { useGetKlineDataQuery, useGetMarketDataQuery } from "@/Redux/apiSlice";
import { useWebSocket } from "@/hooks/useWebSocket";
import WebSocketStatus from "@/components/Socket/WebSocketStatus";
import PriceCard from "./PriceCard";
import MarketNews from "./MarketNews";
import { MarketDataItem, TIME_INTERVALS, WATCHED_PAIRS } from "@/app/dashboard/market/page";

interface ChartViewProps {
    selectedPair: string;
    setSelectedPair: (pair: string) => void;
    timeInterval: string;
    setTimeInterval: (interval: string) => void;
    marketData: MarketDataItem[];
}

const ChartView: React.FC<ChartViewProps> = ({
    selectedPair,
    setSelectedPair,
    timeInterval,
    setTimeInterval,
    marketData
}) => {
    // Ensure the trading pair is properly formatted with dash for API calls
    const formattedPair = selectedPair.replace('/', '-');

    // Fetch market data for selected pair using the Redux API
    const { data: marketDataResponse, isLoading: isLoadingMarket, error: marketError } = useGetMarketDataQuery(selectedPair);

    // Fetch kline data for selected pair and interval
    const { data: klineData, isLoading: isLoadingKline, error: klineError } = useGetKlineDataQuery({
        trading_pair: selectedPair,
        bar: timeInterval,
        limit: 100
    });

    // Connect to WebSocket for real-time updates
    const wsEndpoint = `ws://localhost:8000/ws/market_data/${formattedPair}`;
    const { isConnected, isConnecting, error, reconnect } = useWebSocket(wsEndpoint);

    // Helper function to convert timeInterval to seconds
    const getTimeWindowInSeconds = (interval: string): number => {
        switch (interval) {
            case "1m": return 60;
            case "5m": return 300;
            case "15m": return 900;
            case "30m": return 1800;
            case "1h": return 3600;
            case "4h": return 14400;
            case "1d": return 86400;
            case "1w": return 604800;
            default: return 3600;
        }
    };

    // Log any API errors for debugging
    React.useEffect(() => {
        if (marketError) {
            console.error("Market data fetch error:", marketError);
        }
        if (klineError) {
            console.error("Kline data fetch error:", klineError);
        }
    }, [marketError, klineError]);

    return (
        <>
            {/* Watched Trading Pairs */}
            <Card className="bg-slate-800 border-slate-700 text-white">
                <CardHeader className="pb-3">
                    <CardTitle>Quick Access</CardTitle>
                    <CardDescription className="text-slate-400">Commonly watched trading pairs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {WATCHED_PAIRS.map((pair) => (
                            <PriceCard
                                key={pair.symbol}
                                pair={pair}
                                isSelected={selectedPair === pair.symbol}
                                onClick={() => setSelectedPair(pair.symbol)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Main Chart */}
            <Card className="overflow-hidden bg-slate-800 border-slate-700 text-white">
                <CardHeader className="pb-0">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between md:items-center">
                        <div>
                            <CardTitle>{selectedPair} Chart</CardTitle>
                            <CardDescription className="text-slate-400">
                                Real-time and historical price data
                            </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-2">
                            <Select
                                value={selectedPair}
                                onValueChange={setSelectedPair}
                            >
                                <SelectTrigger className="w-full md:w-[180px] bg-slate-700 border-slate-600 text-white">
                                    <SelectValue placeholder="Select pair" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                                    {marketData.map((item) => (
                                        <SelectItem key={item.symbol} value={item.symbol}>
                                            {item.symbol}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={timeInterval}
                                onValueChange={setTimeInterval}
                            >
                                <SelectTrigger className="w-full md:w-[130px] bg-slate-700 border-slate-600 text-white">
                                    <SelectValue placeholder="Timeframe" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                                    {TIME_INTERVALS.map((interval) => (
                                        <SelectItem key={interval.value} value={interval.value}>
                                            {interval.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Options
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-slate-700 border-slate-600 text-white">
                                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                                        <LineChart className="mr-2 h-4 w-4 text-blue-400" />
                                        Line Chart
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                                        <CandlestickChart className="mr-2 h-4 w-4 text-green-400" />
                                        Candlestick
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                                        <AreaChart className="mr-2 h-4 w-4 text-purple-400" />
                                        Area Chart
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-600" />
                                    <DropdownMenuItem className="hover:bg-slate-600 cursor-pointer">
                                        <Filter className="mr-2 h-4 w-4 text-yellow-400" />
                                        Technical Indicators
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 pb-2 px-2 md:px-6">
                    <div className="h-[500px] bg-slate-900 rounded-lg p-4">
                        <LivePriceChart
                            symbol={selectedPair}
                            height={500}
                            showHeader={false}
                            showChange={true}
                            timeWindow={getTimeWindowInSeconds(timeInterval)}
                        />
                    </div>

                    {isLoadingMarket ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-slate-700">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-sm text-slate-400 animate-pulse bg-slate-700 h-4 w-20 mx-auto mb-2 rounded"></div>
                                    <div className="text-lg font-bold text-white animate-pulse bg-slate-700 h-6 w-24 mx-auto rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-slate-700">
                            <div className="text-center">
                                <div className="text-sm text-slate-400">24h High</div>
                                <div className="text-lg font-bold text-white">$65,842</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-slate-400">24h Low</div>
                                <div className="text-lg font-bold text-white">$62,198</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-slate-400">24h Volume</div>
                                <div className="text-lg font-bold text-white">$12.5B</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-slate-400">Market Cap</div>
                                <div className="text-lg font-bold text-white">$1.28T</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* WebSocket Status */}
            <div className="mb-4">
                <WebSocketStatus
                    endpoint={wsEndpoint}
                    isConnected={isConnected}
                    isConnecting={isConnecting}
                    error={error}
                    reconnect={reconnect}
                    variant="badge"
                />
            </div>

            {/* Market News */}
            <MarketNews />
        </>
    );
};

export default ChartView;