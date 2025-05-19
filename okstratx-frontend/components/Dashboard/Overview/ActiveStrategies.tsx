"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    RefreshCw,
    AlertTriangle,
    TrendingUp,
    Activity,
    Brain,
    Bot,
    LineChart,
    ChevronRight,
    Plus,
} from "lucide-react";
import { StrategyType, useGetStrategiesQuery } from "@/Redux/apiSlice";
import { CreateStrategyModal } from "../Strategies/CreateStrategyModal";


interface ActiveStrategiesProps {
    onSelectStrategy: (id: string) => void;
    selectedStrategy: string | null;
    limit?: number;
}

/**
 * ActiveStrategies component - displays a list of active strategies
 * Includes the Create Strategy modal for the Create button
 */
export const ActiveStrategies = ({
    onSelectStrategy,
    selectedStrategy,
    limit = 3
}: ActiveStrategiesProps) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { data: strategies, isLoading, error } = useGetStrategiesQuery();

    // Function to get strategy icon based on type
    const getStrategyIcon = (type: StrategyType) => {
        switch (type) {
            case StrategyType.MOMENTUM:
                return <TrendingUp className="h-4 w-4" />;
            case StrategyType.MEAN_REVERSION:
                return <RefreshCw className="h-4 w-4" />;
            case StrategyType.BREAKOUT:
                return <Activity className="h-4 w-4" />;
            case StrategyType.ARBITRAGE:
                return <Brain className="h-4 w-4" />;
            case StrategyType.MARKET_MAKING:
                return <Bot className="h-4 w-4" />;
            default:
                return <LineChart className="h-4 w-4" />;
        }
    };

    // Function to get background color based on strategy type
    const getStrategyTypeStyles = (type: StrategyType) => {
        switch (type) {
            case StrategyType.MOMENTUM:
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
            case StrategyType.MEAN_REVERSION:
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300';
            case StrategyType.BREAKOUT:
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
            case StrategyType.ARBITRAGE:
                return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
            case StrategyType.MARKET_MAKING:
                return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    // Function to get badge color based on strategy status
    const getStatusBadgeStyles = (status?: string) => {
        switch (status) {
            case 'deployed':
                return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'paused':
                return 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            case 'backtesting':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
        }
    };

    return (
        <>
            <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle>Active Strategies</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" asChild>
                            <a href="/dashboard/strategies">
                                View All
                                <ChevronRight className="h-3 w-3" />
                            </a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 ">
                    <div className="px-6 divide-y divide-gray-100 dark:divide-gray-800">
                        {isLoading ? (
                            <div className="py-6 flex justify-center">
                                <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <Alert variant="destructive" className="m-4">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Failed to load strategies. Please try again.
                                </AlertDescription>
                            </Alert>
                        ) : strategies && strategies.length > 0 ? (
                            strategies.slice(0, limit).map((strategy) => (
                                <div
                                    key={strategy.id}
                                    className={`py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${selectedStrategy === strategy.id ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                                    onClick={() => onSelectStrategy(strategy.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-start gap-3">
                                            <div className={`mt-0.5 p-1.5 rounded-md ${getStrategyTypeStyles(strategy.type)}`}>
                                                {getStrategyIcon(strategy.type)}
                                            </div>
                                            <div>
                                                <div className="font-medium">{strategy.name}</div>
                                                <div className="text-xs text-muted-foreground flex items-center mt-1">
                                                    <span>{strategy.trading_pairs.join(", ")}</span>
                                                    <span className="mx-1.5">•</span>
                                                    <span className="capitalize">{strategy.risk_tolerance.toLowerCase()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={getStatusBadgeStyles(strategy.status)}>
                                            {strategy.status || 'Draft'}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-6 text-center text-muted-foreground">
                                No strategies found. Create your first strategy.
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="border-t py-3 justify-center dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full hover:bg-blue-50 dark:hover:bg-blue-950/20 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Strategy
                    </Button>
                </CardFooter>
            </Card>

            {/* Create Strategy Modal */}
            <CreateStrategyModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </>
    );
};

export default ActiveStrategies;
