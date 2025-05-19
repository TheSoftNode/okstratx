"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { format } from 'date-fns';

interface PriceData {
    symbol: string;
    price: number;
    timestamp: string;
    change24h?: number;
}

interface LivePriceChartProps {
    symbol: string;
    height?: number;
    showHeader?: boolean;
    showChange?: boolean;
    timeWindow?: number; // in minutes
}

const LivePriceChart = ({
    symbol,
    height = 300,
    showHeader = true,
    showChange = true,
    timeWindow = 5,
}: LivePriceChartProps) => {
    const [priceHistory, setPriceHistory] = useState<{ timestamp: string; price: number }[]>([]);
    const [lastChange, setLastChange] = useState<number | null>(null);
    const [dataError, setDataError] = useState<string | null>(null);

    // Connect to the WebSocket
    const { data, isConnected, isConnecting, error } = useWebSocket<PriceData>(
        `wss://okstratx-api.onrender.com/ws/market_data`,
        symbol
    );

    // Update price history when new data comes in
    useEffect(() => {
        if (data) {
            try {
                let timestamp;
                try {
                    const date = new Date(data.timestamp);
                    if (isNaN(date.getTime())) {
                        timestamp = format(new Date(), 'HH:mm:ss');
                    } else {
                        timestamp = format(date, 'HH:mm:ss');
                    }
                } catch (e) {
                    timestamp = format(new Date(), 'HH:mm:ss');
                }

                setPriceHistory((prev) => {
                    const updated = [...prev, { timestamp, price: data.price }];
                    const maxPoints = timeWindow * 60;
                    return updated.length > maxPoints ? updated.slice(updated.length - maxPoints) : updated;
                });

                if (data.change24h !== undefined) {
                    setLastChange(data.change24h);
                }
                setDataError(null);
            } catch (e) {
                setDataError('Error processing price data');
                console.error('Data processing error:', e);
            }
        }
    }, [data, timeWindow]);

    const getChangeColor = (change: number | null) => {
        if (change === null) return "text-gray-500 dark:text-gray-400";
        return change >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400";
    };

    // Get error message safely
    const getErrorMessage = () => {
        if (dataError) return dataError;
        if (error instanceof Error) return error.message;
        if (typeof error === 'string') return error;
        return "Error connecting to price feed. Please try again later.";
    };

    return (
        <Card className="overflow-hidden dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            {showHeader && (
                <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">{symbol}</CardTitle>
                        <div className="flex items-center space-x-3">
                            {showChange && lastChange !== null && (
                                <span className={`font-medium ${getChangeColor(lastChange)}`}>
                                    {lastChange >= 0 ? "+" : ""}
                                    {lastChange.toFixed(2)}%
                                </span>
                            )}

                            {isConnecting ? (
                                <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800">
                                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                    Connecting
                                </Badge>
                            ) : isConnected ? (
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Live
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Disconnected
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
            )}

            <CardContent className={`p-0 ${!showHeader ? 'pt-4' : ''}`}>
                {error || dataError ? (
                    <Alert variant="destructive" className="mx-4 my-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            {getErrorMessage()}
                        </AlertDescription>
                    </Alert>
                ) : priceHistory.length === 0 ? (
                    <div className="flex items-center justify-center h-[200px]">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <span className="ml-2 text-gray-500 dark:text-gray-400">Loading price data...</span>
                    </div>
                ) : (
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={priceHistory}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" />
                                <XAxis
                                    dataKey="timestamp"
                                    tick={{ fill: "var(--chart-text, #6b7280)" }}
                                    tickLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fill: "var(--chart-text, #6b7280)" }}
                                    tickLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    tickMargin={10}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                        borderColor: "var(--tooltip-border, #e5e7eb)",
                                        borderRadius: "0.5rem",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                    itemStyle={{ color: "var(--tooltip-text, #111827)" }}
                                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
                                    labelFormatter={(label) => `Time: ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LivePriceChart;