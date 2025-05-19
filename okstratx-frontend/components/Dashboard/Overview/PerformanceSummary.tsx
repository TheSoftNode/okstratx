"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ChevronRight, Play, Plus } from "lucide-react";
import { useGetStrategiesQuery } from "@/Redux/apiSlice";

/**
 * Performance Summary component - displays key metrics in card format
 */
export const PerformanceSummary = () => {
    // Mock data for account balance
    const accountBalance = {
        total: 58750.32,
        change24h: 3.2,
        assets: [
            { symbol: "BTC", amount: 0.58, value: 31580 },
            { symbol: "ETH", amount: 5.2, value: 22360 },
            { symbol: "USDT", amount: 4810.32, value: 4810.32 }
        ]
    };

    // Mock data for market sentiment
    const marketSentiment = {
        value: 68,
        trend: "neutral",
        change: 3.5,
    };

    // Fetch strategies data
    const { data: strategies } = useGetStrategiesQuery();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Account Balance Card */}
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Account Balance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-2xl font-bold">${accountBalance.total.toLocaleString()}</div>
                            <div className={`text-sm flex items-center ${accountBalance.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {accountBalance.change24h >= 0 ? (
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                ) : (
                                    <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
                                )}
                                {accountBalance.change24h}% today
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                            Deposit
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Active Strategies Card */}
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-2xl font-bold">{strategies?.length || 0}</div>
                            <div className="text-sm flex items-center text-muted-foreground">
                                <Play className="mr-1 h-3 w-3 text-green-500" />
                                {strategies?.filter(s => s.status === 'deployed').length || 0} currently running
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                            Manage
                            <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Market Sentiment Card */}
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Market Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-2xl font-bold">{marketSentiment.value}%</div>
                            <div className={`text-sm flex items-center ${marketSentiment.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {marketSentiment.change >= 0 ? (
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                ) : (
                                    <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
                                )}
                                {marketSentiment.change}% from yesterday
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={
                                marketSentiment.value > 70
                                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                                    : marketSentiment.value < 30
                                        ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
                                        : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            }
                        >
                            {marketSentiment.value > 70
                                ? "Bullish"
                                : marketSentiment.value < 30
                                    ? "Bearish"
                                    : "Neutral"}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

