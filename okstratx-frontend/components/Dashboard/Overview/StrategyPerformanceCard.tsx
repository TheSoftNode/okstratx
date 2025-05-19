"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Brain, ChevronRight, CpuIcon, Zap } from "lucide-react";
import { useGetStrategiesQuery, useGetStrategyPerformanceQuery } from "@/Redux/apiSlice";

interface StrategyPerformanceCardProps {
    strategyId: string;
    onChangeStrategy?: (id: string) => void;
}

/**
 * StrategyPerformanceCard - displays performance metrics for a selected strategy
 */
export const StrategyPerformanceCard = ({
    strategyId,
    onChangeStrategy
}: StrategyPerformanceCardProps) => {
    const { data: strategies } = useGetStrategiesQuery();
    const { data: performance, isLoading } = useGetStrategyPerformanceQuery(strategyId, {
        skip: !strategyId
    });

    // Find current strategy details
    const currentStrategy = strategies?.find(s => s.id === strategyId);

    if (isLoading) {
        return (
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader>
                    <CardTitle>Strategy Performance</CardTitle>
                    <CardDescription>Loading performance data...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!performance) {
        return (
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader>
                    <CardTitle>Strategy Performance</CardTitle>
                    <CardDescription>Select a strategy to view performance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                        No performance data available
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <CardHeader>
                <CardTitle>Selected Strategy Performance</CardTitle>
                <CardDescription>
                    <span className="font-medium">{currentStrategy?.name}</span> - Since {new Date(performance.start_time).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Return</p>
                        <p className={`text-2xl font-bold ${performance.total_return >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {performance.total_return}%
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                        <p className="text-2xl font-bold">{performance.metrics.sharpe_ratio}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-bold">{(performance.metrics.win_rate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Total Trades</p>
                        <p className="text-2xl font-bold">{performance.metrics.trades}</p>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <p className="font-medium">Current Positions</p>
                        {Object.entries(performance.current_positions).map(([asset, position]) => (
                            <div key={asset} className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                    <div className={`w-2 h-2 rounded-full ${position.profit_loss >= 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                                    <span>{asset}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-muted-foreground mr-2">{position.amount} @ ${position.entry_price.toLocaleString()}</span>
                                    <span className={position.profit_loss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                        {position.profit_loss}%
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* If no positions */}
                        {Object.keys(performance.current_positions).length === 0 && (
                            <div className="text-sm text-muted-foreground italic">
                                No open positions at the moment
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-3 bg-muted/50 gap-2 justify-end dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Zap className="mr-2 h-4 w-4" />
                    Optimize
                </Button>
            </CardFooter>
        </Card>
    );
};

/**
 * FeatureCards - displays feature highlight cards for the AI platform
 */
export const FeatureCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-100 dark:border-blue-900/50 overflow-hidden relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#smallGrid)" />
                    </svg>
                </div>

                <CardHeader className="pb-2 relative">
                    <CardTitle className="text-lg flex items-center text-blue-800 dark:text-blue-300">
                        <Brain className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                        AI-Driven Signals
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <p className="text-sm text-blue-700/80 dark:text-blue-300/80">
                        Advanced LLMs analyze market patterns and sentiment to generate trading signals with up to 92% accuracy.
                    </p>
                </CardContent>
                <CardFooter className="pt-0 relative">
                    <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border-purple-100 dark:border-purple-900/50 overflow-hidden relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-purple-500" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                </div>

                <CardHeader className="pb-2 relative">
                    <CardTitle className="text-lg flex items-center text-purple-800 dark:text-purple-300">
                        <CpuIcon className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                        Reinforcement Learning
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <p className="text-sm text-purple-700/80 dark:text-purple-300/80">
                        Strategies automatically adapt and improve through reinforcement learning, optimizing performance over time.
                    </p>
                </CardContent>
                <CardFooter className="pt-0 relative">
                    <Button variant="outline" size="sm" className="border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};