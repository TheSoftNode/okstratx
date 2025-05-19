"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    ExternalLink,
    LineChart as LineChartIcon,
    BarChart2,
    TrendingUp,
    Zap,
    Share2
} from "lucide-react";
import Link from "next/link";

// Demo trading data generation
const generateDemoData = () => {
    const basePrice = 50000;
    const data = [];

    for (let i = 1; i <= 30; i++) {
        // Generate some random price movements
        const noise = Math.random() * 2000 - 1000;
        const trend = (i / 3) * 100; // Upward trend
        const cyclical = Math.sin(i / 5) * 500; // Cyclical component

        // Calculate price
        const price = basePrice + trend + cyclical + noise;

        // Generate volume
        const volume = 100 + Math.random() * 400;

        // Generate signals
        const signal = i % 7 === 0 ? (Math.random() > 0.5 ? "buy" : "sell") : null;

        data.push({
            day: i,
            price: Math.round(price),
            volume: Math.round(volume),
            signal,
        });
    }

    return data;
};

// Generate optimization data for RL tab
const generateOptimizationData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
        data.push({
            version: i,
            return: 5 + Math.random() * 20, // Return percentage
            sharpe: 0.8 + Math.random() * 2.2, // Sharpe ratio
        });
    }
    return data;
};

const DataVisualizationSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [demoData, setDemoData] = useState<any[]>([]);
    const [optimizationData, setOptimizationData] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("performance");

    // Generate data once component mounts
    useEffect(() => {
        setDemoData(generateDemoData());
        setOptimizationData(generateOptimizationData());
    }, []);

    // Enhanced color palette - more sophisticated
    const colors = {
        price: {
            main: "#3b82f6", // blue-500
            gradient: {
                start: "#3b82f6", // blue-500
                end: "#60a5fa", // blue-400
            }
        },
        volume: {
            main: "#8b5cf6", // purple-500
            light: "rgba(139, 92, 246, 0.3)"
        },
        gridLines: "rgba(229, 231, 235, 0.5)", // gray-200 with transparency
        darkGridLines: "rgba(55, 65, 81, 0.3)", // gray-700 with transparency
        buy: "#10b981", // emerald-500
        sell: "#ef4444", // red-500
        optimization: {
            bar: "#f97316", // orange-500
            line: "#10b981", // emerald-500
        },
        backtesting: {
            main: "#8b5cf6", // purple-500
            light: "rgba(139, 92, 246, 0.1)"
        }
    };

    // Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section
            id="visualization"
            ref={ref}
            className="py-12 md:py-16 relative bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-900 overflow-hidden"
        >
            {/* Modern background elements */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-purple-500/10"></div>

            {/* Decorative elements */}
            <div className="absolute top-12 right-4 h-64 w-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl -z-10"></div>
            <div className="absolute bottom-24 left-8 h-48 w-48 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header - More compact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-8"
                >
                    <div className="inline-flex items-center rounded-full px-3 py-1 mb-2 text-xs font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 backdrop-blur-sm">
                        <LineChartIcon className="mr-1.5 h-3.5 w-3.5" />
                        Live Analytics
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        Real-Time Data &amp; Optimization
                    </h2>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                        Advanced visualization tools to track and improve your trading strategies
                    </p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <Tabs
                        defaultValue="performance"
                        className="w-full"
                        onValueChange={setActiveTab}
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                            <TabsList className=" h-full flex flex-wrap gap-2  p-0.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
                                <TabsTrigger
                                    value="performance"
                                    className="h-8 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-md transition-all"
                                >
                                    <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                                    Performance
                                </TabsTrigger>
                                <TabsTrigger
                                    value="backtesting"
                                    className="h-8 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 rounded-md transition-all"
                                >
                                    <LineChartIcon className="h-3.5 w-3.5 mr-1.5" />
                                    Backtesting
                                </TabsTrigger>
                                <TabsTrigger
                                    value="optimization"
                                    className="h-8 px-3 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 rounded-md transition-all"
                                >
                                    <BarChart2 className="h-3.5 w-3.5 mr-1.5" />
                                    RL Optimization
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-9 w-9 p-0 rounded-full"
                                    title="Share"
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="h-9 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                >
                                    <Link href="/dashboard">
                                        Full Dashboard <ExternalLink className="h-3.5 w-3.5 ml-1.5 -mt-0.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TabsContent value="performance" className="mt-0">
                                    <Card className="overflow-hidden border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md">
                                        <CardHeader className="pb-1 pt-5 px-5">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">Strategy Performance</CardTitle>
                                                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400">Real-time price and volume with AI signals</CardDescription>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 flex items-center gap-1.5"
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    Live
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pb-4 pt-2">
                                            <div className="h-[350px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <ComposedChart data={demoData} margin={{ top: 15, right: 25, bottom: 15, left: 15 }}>
                                                        <defs>
                                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={colors.price.gradient.start} stopOpacity={0.7} />
                                                                <stop offset="95%" stopColor={colors.price.gradient.end} stopOpacity={0.05} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="var(--chart-grid, rgba(229, 231, 235, 0.4))"
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="day"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                        />
                                                        <YAxis
                                                            yAxisId="left"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                            tickFormatter={(value) => `$${value / 1000}k`}
                                                        />
                                                        <YAxis
                                                            yAxisId="right"
                                                            orientation="right"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.95))",
                                                                borderColor: "var(--tooltip-border, rgba(229, 231, 235, 0.5))",
                                                                borderRadius: "0.5rem",
                                                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
                                                                fontSize: "0.875rem",
                                                            }}
                                                            itemStyle={{ color: "var(--tooltip-text, #111827)" }}
                                                            formatter={(value, name) => {
                                                                if (name === "price") return [`$${value.toLocaleString()}`, "Price"];
                                                                if (name === "volume") return [value.toLocaleString(), "Volume"];
                                                                return [value, name];
                                                            }}
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="price"
                                                            stroke={colors.price.main}
                                                            strokeWidth={2}
                                                            fillOpacity={1}
                                                            fill="url(#colorPrice)"
                                                            yAxisId="left"
                                                            animationDuration={1000}
                                                        />
                                                        <Bar
                                                            dataKey="volume"
                                                            fill={colors.volume.light}
                                                            yAxisId="right"
                                                            barSize={6}
                                                            radius={[3, 3, 0, 0]}
                                                            animationDuration={1000}
                                                        />

                                                        {/* Trading Signals */}
                                                        {demoData.map((entry, index) => {
                                                            if (entry.signal === "buy") {
                                                                return (
                                                                    <Line
                                                                        key={`signal-${index}`}
                                                                        type="monotone"
                                                                        data={[{ day: entry.day, price: entry.price }]}
                                                                        dataKey="price"
                                                                        stroke="transparent"
                                                                        yAxisId="left"
                                                                        dot={{
                                                                            stroke: colors.buy,
                                                                            strokeWidth: 2,
                                                                            r: 5,
                                                                            fill: "white",
                                                                            strokeDasharray: "",
                                                                        }}
                                                                        activeDot={false}
                                                                        isAnimationActive={false}
                                                                    />
                                                                );
                                                            } else if (entry.signal === "sell") {
                                                                return (
                                                                    <Line
                                                                        key={`signal-${index}`}
                                                                        type="monotone"
                                                                        data={[{ day: entry.day, price: entry.price }]}
                                                                        dataKey="price"
                                                                        stroke="transparent"
                                                                        yAxisId="left"
                                                                        dot={{
                                                                            stroke: colors.sell,
                                                                            strokeWidth: 2,
                                                                            r: 5,
                                                                            fill: "white",
                                                                            strokeDasharray: "",
                                                                        }}
                                                                        activeDot={false}
                                                                        isAnimationActive={false}
                                                                    />
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    { label: "Total Return", value: "+18.7%", color: "text-green-600 dark:text-green-400" },
                                                    { label: "Win Rate", value: "73.2%", color: "text-gray-900 dark:text-gray-100" },
                                                    { label: "Sharpe Ratio", value: "1.89", color: "text-gray-900 dark:text-gray-100" },
                                                    { label: "Max Drawdown", value: "-7.2%", color: "text-red-600 dark:text-red-400" },
                                                ].map((stat, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-gray-50/70 dark:bg-gray-800/70 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-sm transition-shadow"
                                                    >
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                                                        <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="backtesting" className="mt-0">
                                    <Card className="overflow-hidden border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md">
                                        <CardHeader className="pb-1 pt-5 px-5">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">Backtesting Results</CardTitle>
                                                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400">Historical performance simulation</CardDescription>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-purple-50/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                                                >
                                                    Simulated
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pb-4 pt-2">
                                            <div className="h-[350px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={demoData} margin={{ top: 15, right: 25, bottom: 15, left: 15 }}>
                                                        <defs>
                                                            <linearGradient id="colorBacktest" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor={colors.backtesting.main} stopOpacity={0.7} />
                                                                <stop offset="95%" stopColor={colors.backtesting.main} stopOpacity={0.05} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="var(--chart-grid, rgba(229, 231, 235, 0.4))"
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="day"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                        />
                                                        <YAxis
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                            tickFormatter={(value) => `$${value / 1000}k`}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.95))",
                                                                borderColor: "var(--tooltip-border, rgba(229, 231, 235, 0.5))",
                                                                borderRadius: "0.5rem",
                                                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
                                                                fontSize: "0.875rem",
                                                            }}
                                                            itemStyle={{ color: "var(--tooltip-text, #111827)" }}
                                                            formatter={(value) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="price"
                                                            stroke={colors.backtesting.main}
                                                            strokeWidth={2}
                                                            fillOpacity={1}
                                                            fill="url(#colorBacktest)"
                                                            name="Portfolio Value"
                                                            animationDuration={1000}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {[
                                                    { label: "Expected Annual Return", value: "+22.4%", color: "text-green-600 dark:text-green-400" },
                                                    { label: "Profit Factor", value: "2.3", color: "text-gray-900 dark:text-gray-100" },
                                                    { label: "Avg. Trade Duration", value: "3.2d", color: "text-gray-900 dark:text-gray-100" },
                                                    { label: "Recovery Factor", value: "4.7", color: "text-gray-900 dark:text-gray-100" },
                                                ].map((stat, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-gray-50/70 dark:bg-gray-800/70 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-sm transition-shadow"
                                                    >
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                                                        <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="optimization" className="mt-0">
                                    <Card className="overflow-hidden border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md">
                                        <CardHeader className="pb-1 pt-5 px-5">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">Reinforcement Learning Optimization</CardTitle>
                                                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400">Strategy parameters fine-tuned by RL</CardDescription>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-amber-50/80 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 flex items-center gap-1.5"
                                                >
                                                    <Zap className="h-3 w-3" />
                                                    Optimized
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pb-4 pt-2">
                                            <div className="h-[350px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={optimizationData} margin={{ top: 15, right: 25, bottom: 15, left: 15 }}>
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="var(--chart-grid, rgba(229, 231, 235, 0.4))"
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="version"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                        />
                                                        <YAxis
                                                            yAxisId="left"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                            tickFormatter={(value) => `${value}%`}
                                                        />
                                                        <YAxis
                                                            yAxisId="right"
                                                            orientation="right"
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tick={{ fill: "var(--chart-text, #6b7280)", fontSize: 11 }}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.95))",
                                                                borderColor: "var(--tooltip-border, rgba(229, 231, 235, 0.5))",
                                                                borderRadius: "0.5rem",
                                                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
                                                                fontSize: "0.875rem",
                                                            }}
                                                            itemStyle={{ color: "var(--tooltip-text, #111827)" }}
                                                            formatter={(value, name) => {
                                                                if (name === "return") return [`${(value as number).toFixed(1)}%`, "Return"];
                                                                if (name === "sharpe") return [(value as number).toFixed(2), "Sharpe Ratio"];
                                                                return [value, name];
                                                            }}
                                                        />
                                                        <Bar
                                                            dataKey="return"
                                                            fill={colors.optimization.bar}
                                                            name="Return (%)"
                                                            yAxisId="left"
                                                            radius={[4, 4, 0, 0]}
                                                            animationDuration={1000}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="sharpe"
                                                            stroke={colors.optimization.line}
                                                            name="Sharpe Ratio"
                                                            yAxisId="right"
                                                            strokeWidth={2}
                                                            dot={{ fill: colors.optimization.line, r: 3 }}
                                                            activeDot={{ r: 5, strokeWidth: 0 }}
                                                            animationDuration={1500}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>

                                            <div className="mt-3 p-3 bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-100/70 dark:border-amber-800/30">
                                                <h4 className="font-medium text-amber-800 dark:text-amber-300 text-sm mb-1.5">RL Optimization Results</h4>
                                                <p className="text-amber-700 dark:text-amber-400 text-xs leading-relaxed">
                                                    The reinforcement learning algorithm tested 153 parameter combinations and found an optimal configuration that increased returns by 42% while maintaining risk parameters within acceptable bounds.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
};

export default DataVisualizationSection;

