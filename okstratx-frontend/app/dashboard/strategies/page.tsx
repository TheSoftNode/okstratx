"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    TrendingUp,
    RefreshCw,
    Activity,
    Brain,
    Bot,
    LineChart,
    MoreVertical,
    PlayCircle,
    PauseCircle,
    BarChart,
    AlertTriangle,
    Plus,
    Sliders,
    Search,
    Filter,
    Calendar,
    XCircle,
    CopyCheck,
    Archive,
    Flame
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { RiskTolerance, StrategyType, useDeployStrategyMutation, useGetStrategiesQuery } from "@/Redux/apiSlice";
import { CreateStrategyModal } from "@/components/Dashboard/Strategies/CreateStrategyModal";

/**
 * StrategiesPage - List and manage all strategies
 */
const StrategiesPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set());

    // API Hooks
    const { data: strategies, isLoading, error, refetch } = useGetStrategiesQuery();
    const [deployStrategy, { isLoading: isDeploying }] = useDeployStrategyMutation();

    // Handle deployment of a strategy
    const handleDeploy = async (strategyId: string) => {
        try {
            await deployStrategy(strategyId).unwrap();
            refetch(); // Refresh the list after deploying
        } catch (err) {
            console.error("Failed to deploy strategy:", err);
        }
    };

    // Filter strategies based on search and filter
    const filteredStrategies = strategies?.filter(strategy => {
        // Apply status filter if set
        if (filterStatus && strategy.status !== filterStatus) {
            return false;
        }

        // Apply search filter if there's a query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                strategy.name.toLowerCase().includes(query) ||
                strategy.description.toLowerCase().includes(query) ||
                strategy.trading_pairs.some(pair => pair.toLowerCase().includes(query)) ||
                strategy.type.toLowerCase().includes(query)
            );
        }

        return true;
    });

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
                return <Flame className="h-4 w-4" />;
            default:
                return <LineChart className="h-4 w-4" />;
        }
    };

    // Get formatted risk level
    const getRiskLabel = (risk: RiskTolerance) => {
        switch (risk) {
            case RiskTolerance.LOW:
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        Low
                    </Badge>
                );
            case RiskTolerance.MEDIUM:
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        Medium
                    </Badge>
                );
            case RiskTolerance.HIGH:
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        High
                    </Badge>
                );
        }
    };

    // Get formatted status badge
    const getStatusBadge = (status?: string) => {
        switch (status) {
            case 'deployed':
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
                        <PlayCircle className="mr-1 h-3 w-3" />
                        Deployed
                    </Badge>
                );
            case 'paused':
                return (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                        <PauseCircle className="mr-1 h-3 w-3" />
                        Paused
                    </Badge>
                );
            case 'backtesting':
                return (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                        <BarChart className="mr-1 h-3 w-3" />
                        Backtesting
                    </Badge>
                );
            default:
                return (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800">
                        Draft
                    </Badge>
                );
        }
    };

    // Toggle strategy selection
    const toggleStrategySelection = (strategyId: string) => {
        const newSelection = new Set(selectedStrategies);
        if (newSelection.has(strategyId)) {
            newSelection.delete(strategyId);
        } else {
            newSelection.add(strategyId);
        }
        setSelectedStrategies(newSelection);
    };

    // Clear all selections
    const clearSelections = () => {
        setSelectedStrategies(new Set());
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Strategies</h1>
                    <p className="text-muted-foreground">Manage and deploy your AI trading strategies</p>
                </div>
                <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Strategy
                </Button>
            </div>

            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <CardTitle>Trading Strategies</CardTitle>
                        <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search strategies..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="absolute right-2.5 top-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <Tabs
                                value={filterStatus || "all"}
                                onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}
                                className="w-full md:w-auto"
                            >
                                <TabsList className="w-full md:w-auto h-9 overflow-x-auto">
                                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                                    <TabsTrigger value="deployed" className="text-xs">Deployed</TabsTrigger>
                                    <TabsTrigger value="paused" className="text-xs">Paused</TabsTrigger>
                                    <TabsTrigger value="backtesting" className="text-xs">Backtesting</TabsTrigger>
                                    <TabsTrigger value="draft" className="text-xs">Draft</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-9 w-9">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>By Date</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Sliders className="mr-2 h-4 w-4" />
                                        <span>By Performance</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <BarChart className="mr-2 h-4 w-4" />
                                        <span>By Risk Level</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <RefreshCw className="h-6 w-6 text-blue-500 animate-spin" />
                        </div>
                    ) : error ? (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Failed to load strategies. Please try again.
                            </AlertDescription>
                        </Alert>
                    ) : filteredStrategies && filteredStrategies.length > 0 ? (
                        <>
                            {/* Actions for selected strategies */}
                            {selectedStrategies.size > 0 && (
                                <div className="flex justify-between items-center py-2 px-4 mb-4 bg-blue-50 dark:bg-blue-950/20 rounded-md">
                                    <div className="text-sm font-medium">
                                        {selectedStrategies.size} {selectedStrategies.size === 1 ? 'strategy' : 'strategies'} selected
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={clearSelections}>
                                            <XCircle className="mr-1 h-3 w-3" />
                                            Clear
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Archive className="mr-1 h-3 w-3" />
                                            Archive
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <CopyCheck className="mr-1 h-3 w-3" />
                                            Deploy
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[40px]">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                                                    checked={selectedStrategies.size === filteredStrategies.length && filteredStrategies.length > 0}
                                                    onChange={() => {
                                                        if (selectedStrategies.size === filteredStrategies.length) {
                                                            clearSelections();
                                                        } else {
                                                            setSelectedStrategies(new Set(filteredStrategies.map(s => s.id)));
                                                        }
                                                    }}
                                                />
                                            </TableHead>
                                            <TableHead className="min-w-[150px]">Strategy</TableHead>
                                            <TableHead className="hidden md:table-cell">Trading Pairs</TableHead>
                                            <TableHead className="hidden md:table-cell">Risk Level</TableHead>
                                            <TableHead className="w-[120px]">Status</TableHead>
                                            <TableHead className="w-[80px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStrategies.map((strategy) => (
                                            <TableRow key={strategy.id}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                                                        checked={selectedStrategies.has(strategy.id)}
                                                        onChange={() => toggleStrategySelection(strategy.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-1.5 rounded-md ${strategy.type === StrategyType.MOMENTUM ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' :
                                                            strategy.type === StrategyType.MEAN_REVERSION ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' :
                                                                strategy.type === StrategyType.BREAKOUT ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' :
                                                                    strategy.type === StrategyType.ARBITRAGE ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                                                                        strategy.type === StrategyType.MARKET_MAKING ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                                                                            'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                                                            }`}>
                                                            {getStrategyIcon(strategy.type)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{strategy.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {strategy.type.replace(/_/g, ' ')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <div className="flex flex-wrap gap-1">
                                                        {strategy.trading_pairs.map((pair) => (
                                                            <Badge key={pair} variant="outline" className="text-xs">
                                                                {pair}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {getRiskLabel(strategy.risk_tolerance)}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(strategy.status)}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => window.location.href = `/dashboard/strategies/${strategy.id}`}>
                                                                View Details
                                                            </DropdownMenuItem>
                                                            {strategy.status !== 'deployed' && (
                                                                <DropdownMenuItem onClick={() => handleDeploy(strategy.id)}>
                                                                    Deploy Strategy
                                                                </DropdownMenuItem>
                                                            )}
                                                            {strategy.status === 'deployed' && (
                                                                <DropdownMenuItem>
                                                                    Pause Strategy
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem>
                                                                Backtest Strategy
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Duplicate Strategy
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                                                Delete Strategy
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <LineChart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <h3 className="text-lg font-medium">No strategies found</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-4">
                                {searchQuery ? "Try a different search query or clear filters." : "Get started by creating your first AI trading strategy."}
                            </p>
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Strategy
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create Strategy Modal */}
            <CreateStrategyModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </div>
    );
};

export default StrategiesPage;
