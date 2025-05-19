"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

interface TradingSignal {
    id: string;
    timestamp: string;
    symbol: string;
    type: "BUY" | "SELL";
    price: number;
    confidence: number;
    source: string;
}

interface TradingSignalsFeedProps {
    strategyId?: string;
    maxSignals?: number;
    height?: number;
}

/**
 * A component that displays real-time trading signals from a strategy
 */
const TradingSignalsFeed = ({
    strategyId,
    maxSignals = 10,
    height = 400,
}: TradingSignalsFeedProps) => {
    const [signals, setSignals] = useState<TradingSignal[]>([]);

    // Connect to the WebSocket - either for a specific strategy or all signals
    const wsEndpoint = strategyId
        ? `ws://localhost:8000/ws/strategy_signals/${strategyId}`
        : `ws://localhost:8000/ws/strategy_signals`;

    const { data, isConnected, isConnecting, error } = useWebSocket<TradingSignal>(wsEndpoint);

    // Update signals when new data comes in
    useEffect(() => {
        if (data) {
            setSignals((prev) => {
                // Add new signal to the beginning of the array
                const updated = [data, ...prev];

                // Limit the number of signals to display
                if (updated.length > maxSignals) {
                    return updated.slice(0, maxSignals);
                }

                return updated;
            });
        }
    }, [data, maxSignals]);

    // Format date from ISO string
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <Card className="overflow-hidden dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">Trading Signals</CardTitle>
                    <div className="flex items-center space-x-2">
                        {isConnecting ? (
                            <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                Connecting
                            </Badge>
                        ) : isConnected ? (
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                Connected
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                Disconnected
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {error ? (
                    <div className="flex items-center justify-center text-red-500 p-6">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Error connecting to signals feed
                    </div>
                ) : signals.length === 0 ? (
                    <div className="flex items-center justify-center h-[200px]">
                        {isConnecting ? (
                            <>
                                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                                <span className="ml-2 text-gray-500 dark:text-gray-400">Connecting to signals feed...</span>
                            </>
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">No trading signals yet</span>
                        )}
                    </div>
                ) : (
                    <ScrollArea className={`h-[${height}px]`}>
                        <div className="p-4">
                            {signals.map((signal, index) => (
                                <div key={signal.id}>
                                    <div className="flex items-start py-3">
                                        <div className={`mt-0.5 mr-3 p-1.5 rounded-full ${signal.type === "BUY"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                            }`}>
                                            {signal.type === "BUY" ? (
                                                <ArrowUpRight className="h-4 w-4" />
                                            ) : (
                                                <ArrowDownRight className="h-4 w-4" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {signal.type} {signal.symbol}
                                                    </span>
                                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                        @ ${signal.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDate(signal.timestamp)}
                                                </span>
                                            </div>

                                            <div className="mt-1 flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                    Source: {signal.source}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className={`
                            ${signal.confidence >= 0.8 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800" :
                                                            signal.confidence >= 0.6 ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800" :
                                                                "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                                                        }
                          `}
                                                >
                                                    {(signal.confidence * 100).toFixed(0)}% Confidence
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {index < signals.length - 1 && (
                                        <Separator className="my-1" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    );
};

export default TradingSignalsFeed;