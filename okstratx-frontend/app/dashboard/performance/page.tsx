"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    LineChart,
    BarChart,
    ResponsiveContainer,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    Area,
    AreaChart
} from "recharts";
import {
    Download,
    Calendar,
    RefreshCw,
    TrendingUp,
    BarChart3,
    BarChart2,
    ArrowUp,
    ArrowDown,
    Table as TableIcon,
    Zap,
    AlertTriangle,
    HelpCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetStrategiesQuery } from "@/Redux/apiSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Sample performance data for charts
const SAMPLE_PERFORMANCE_DATA = [
    { name: "Jan", return: 2.4, benchmark: 1.8 },
    { name: "Feb", return: -1.2, benchmark: -0.5 },
    { name: "Mar", return: 3.8, benchmark: 2.1 },
    { name: "Apr", return: 5.2, benchmark: 3.7 },
    { name: "May", return: -2.1, benchmark: -2.8 },
    { name: "Jun", return: 4.5, benchmark: 2.2 },
    { name: "Jul", return: 6.7, benchmark: 4.1 },
    { name: "Aug", return: 3.8, benchmark: 2.5 },
    { name: "Sep", return: -1.2, benchmark: -0.7 },
    { name: "Oct", return: 4.3, benchmark: 2.9 },
    { name: "Nov", return: 7.2, benchmark: 3.8 },
    { name: "Dec", return: 5.6, benchmark: 4.2 },
];

// Sample metrics data for different timeframes
const TIME_FRAMES = {
    "1m": {
        return: 3.8,
        sharpe: 1.4,
        drawdown: -2.1,
        winRate: 68,
        trades: 42
    },
    "3m": {
        return: 8.4,
        sharpe: 1.6,
        drawdown: -3.2,
        winRate: 70,
        trades: 124
    },
    "6m": {
        return: 12.7,
        sharpe: 1.8,
        drawdown: -5.1,
        winRate: 72,
        trades: 238
    },
    "ytd": {
        return: 15.2,
        sharpe: 1.7,
        drawdown: -5.1,
        winRate: 71,
        trades: 286
    },
    "1y": {
        return: 18.4,
        sharpe: 1.9,
        drawdown: -6.3,
        winRate: 71,
        trades: 365
    },
    "all": {
        return: 24.2,
        sharpe: 1.7,
        drawdown: -8.5,
        winRate: 69,
        trades: 487
    }
};

// Sample daily returns data
const DAILY_RETURNS_DATA = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Generate random values between -1.5 and 2
    const randomValue = (Math.random() * 3.5) - 1.5;

    return {
        day: dayStr,
        return: parseFloat(randomValue.toFixed(2)),
        positive: randomValue >= 0
    };
});

// Distribution of returns data for histogram
const RETURNS_DISTRIBUTION = [
    { range: "-5% to -4%", count: 5 },
    { range: "-4% to -3%", count: 8 },
    { range: "-3% to -2%", count: 12 },
    { range: "-2% to -1%", count: 18 },
    { range: "-1% to 0%", count: 24 },
    { range: "0% to 1%", count: 35 },
    { range: "1% to 2%", count: 28 },
    { range: "2% to 3%", count: 15 },
    { range: "3% to 4%", count: 9 },
    { range: "4% to 5%", count: 6 },
];

// Drawdown data
const DRAWDOWN_DATA = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Generate cumulative values that simulate drawdowns
    let value = -1 * Math.random() * (i % 10 === 0 ? 5 : i % 5 === 0 ? 3 : 1);

    return {
        day: dayStr,
        value: parseFloat(value.toFixed(2))
    };
});

/**
 * PerformancePage - Dashboard tab for performance analysis
 */
const PerformancePage = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState("3m");
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

    // Fetch strategies data
    const { data: strategies } = useGetStrategiesQuery();

    // Current metrics for selected timeframe
    const metrics = TIME_FRAMES[selectedTimeframe as keyof typeof TIME_FRAMES];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Performance Analytics</h1>
                    <p className="text-muted-foreground">Track and analyze your strategy performance</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <Select
                        value={selectedStrategy || (strategies?.[0]?.id || "")}
                        onValueChange={setSelectedStrategy}
                    >
                        <SelectTrigger className="w-full md:w-[220px]">
                            <SelectValue placeholder="Select a strategy" />
                        </SelectTrigger>
                        <SelectContent>
                            {strategies?.map((strategy) => (
                                <SelectItem key={strategy.id} value={strategy.id}>
                                    {strategy.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Custom Range
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Time Range Selector and Key Metrics */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader className="pb-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <CardTitle>Performance Overview</CardTitle>
                            <Tabs
                                defaultValue={selectedTimeframe}
                                onValueChange={(value) => setSelectedTimeframe(value)}
                                className="w-auto"
                            >
                                <TabsList className="h-8">
                                    <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
                                    <TabsTrigger value="3m" className="text-xs px-2">3M</TabsTrigger>
                                    <TabsTrigger value="6m" className="text-xs px-2">6M</TabsTrigger>
                                    <TabsTrigger value="ytd" className="text-xs px-2">YTD</TabsTrigger>
                                    <TabsTrigger value="1y" className="text-xs px-2">1Y</TabsTrigger>
                                    <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Total Return</p>
                                <p className={`text-2xl font-bold ${metrics.return >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {metrics.return}%
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                                <p className="text-2xl font-bold">{metrics.sharpe}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Max Drawdown</p>
                                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{metrics.drawdown}%</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Win Rate</p>
                                <p className="text-2xl font-bold">{metrics.winRate}%</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Total Trades</p>
                                <p className="text-2xl font-bold">{metrics.trades}</p>
                            </div>
                        </div>

                        {/* Performance Chart */}
                        <div className="h-[300px] w-full dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={SAMPLE_PERFORMANCE_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <RechartsTooltip
                                        formatter={(value) => [`${value}%`, "Return"]}
                                        contentStyle={{
                                            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                            borderColor: "var(--tooltip-border, #e5e7eb)",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="return"
                                        stroke="#3b82f6" // blue-500
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                        name="Strategy Return"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="benchmark"
                                        stroke="#9ca3af" // gray-400
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        name="Market Benchmark"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Returns */}
                <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChart2 className="mr-2 h-5 w-5 text-muted-foreground" />
                            Monthly Returns
                        </CardTitle>
                        <CardDescription>Performance breakdown by month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={SAMPLE_PERFORMANCE_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <RechartsTooltip
                                        formatter={(value) => [`${value}%`, "Return"]}
                                        contentStyle={{
                                            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                            borderColor: "var(--tooltip-border, #e5e7eb)",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                    <Bar
                                        dataKey="return"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                        name="Monthly Return"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Daily Returns */}
                <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
                            Daily Returns
                        </CardTitle>
                        <CardDescription>Performance breakdown by day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={DAILY_RETURNS_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                    <XAxis
                                        dataKey="day"
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => value.split(" ")[1]} // Only show day number
                                        interval={2} // Show every 3rd label
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <RechartsTooltip
                                        formatter={(value) => [`${value}%`, "Return"]}
                                        contentStyle={{
                                            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                            borderColor: "var(--tooltip-border, #e5e7eb)",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                    <Bar
                                        dataKey="return"
                                        radius={[4, 4, 0, 0]}
                                        fill="#4ade80" // Static color
                                        name="Daily Return"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Drawdown Chart */}
                <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ArrowDown className="mr-2 h-5 w-5 text-muted-foreground" />
                            Drawdown Analysis
                        </CardTitle>
                        <CardDescription>Historical drawdown periods</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={DRAWDOWN_DATA}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                    <XAxis
                                        dataKey="day"
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        interval={2} // Show every 3rd label
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => `${value}%`}
                                    />
                                    <RechartsTooltip
                                        formatter={(value) => [`${value}%`, "Drawdown"]}
                                        contentStyle={{
                                            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                            borderColor: "var(--tooltip-border, #e5e7eb)",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                    <defs>
                                        <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ef4444" // red-500
                                        fill="url(#drawdownGradient)"
                                        name="Drawdown"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Return Distribution */}
                <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TrendingUp className="mr-2 h-5 w-5 text-muted-foreground" />
                            Return Distribution
                        </CardTitle>
                        <CardDescription>Distribution of daily returns</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={RETURNS_DISTRIBUTION}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                    <XAxis
                                        dataKey="range"
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        tickFormatter={(value) => value.split(" to ")[0]}
                                    />
                                    <YAxis
                                        tick={{ fill: "var(--chart-text, #6b7280)" }}
                                        axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                        label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
                                    />
                                    <RechartsTooltip
                                        formatter={(value) => [value, "Occurrences"]}
                                        contentStyle={{
                                            backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                            borderColor: "var(--tooltip-border, #e5e7eb)",
                                            borderRadius: "0.5rem",
                                        }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                        name="Frequency"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Advanced Metrics */}
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader>
                    <CardTitle>Advanced Performance Metrics</CardTitle>
                    <CardDescription>
                        Detailed metrics for risk assessment and strategy optimization
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Alpha</p>
                                    <TooltipMetric label="Excess return relative to benchmark" />
                                </div>
                                <p className="text-lg font-bold">2.8%</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Beta</p>
                                    <TooltipMetric label="Sensitivity to market movements" />
                                </div>
                                <p className="text-lg font-bold">0.85</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Sortino Ratio</p>
                                    <TooltipMetric label="Return adjusted for downside risk" />
                                </div>
                                <p className="text-lg font-bold">2.1</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Calmar Ratio</p>
                                    <TooltipMetric label="Return relative to max drawdown" />
                                </div>
                                <p className="text-lg font-bold">3.2</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Information Ratio</p>
                                    <TooltipMetric label="Risk-adjusted excess return" />
                                </div>
                                <p className="text-lg font-bold">1.4</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Treynor Ratio</p>
                                    <TooltipMetric label="Return per unit of systematic risk" />
                                </div>
                                <p className="text-lg font-bold">9.7</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Maximum Consecutive Wins</p>
                                    <TooltipMetric label="Longest winning streak" />
                                </div>
                                <p className="text-lg font-bold">8</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Maximum Consecutive Losses</p>
                                    <TooltipMetric label="Longest losing streak" />
                                </div>
                                <p className="text-lg font-bold">3</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Average Profit/Loss Ratio</p>
                                    <TooltipMetric label="Avg profit vs avg loss magnitude" />
                                </div>
                                <p className="text-lg font-bold">1.85</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Tooltip component for metrics
interface TooltipMetricProps {
    label: string;
    className?: string;
}

const TooltipMetric = ({ label, className }: TooltipMetricProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={`inline-flex ${className}`}>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                    <p className="text-xs max-w-[200px] text-center">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default PerformancePage;