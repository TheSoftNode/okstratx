"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    AreaChart,
    Area,
    Cell,
    Pie
} from "recharts";
import {
    ShieldAlert,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Settings,
    BarChart2,
    Download,
    AlertCircle,
    CheckCircle,
    Info,
    MoreVertical,
    CreditCard,
    PieChart,
    ChevronRight,
    RefreshCcw,
    Activity
} from "lucide-react";
import { useGetStrategiesQuery } from "@/Redux/apiSlice";
import { cn } from "@/lib/utils";

// Sample risk metrics data
const RISK_METRICS = {
    portfolioRisk: 42,
    volatility: 18,
    correlation: 0.68,
    var95: 4.2,
    cvar95: 5.8,
    marketStress: 35
};

// Sample risk exposure by asset
const RISK_EXPOSURE = [
    { asset: "BTC", exposure: 45, riskContribution: 35, change24h: 1.2 },
    { asset: "ETH", exposure: 30, riskContribution: 28, change24h: -0.8 },
    { asset: "SOL", exposure: 15, riskContribution: 22, change24h: 3.5 },
    { asset: "DOGE", exposure: 8, riskContribution: 12, change24h: -2.1 },
    { asset: "AVAX", exposure: 2, riskContribution: 3, change24h: 0.5 }
];

// Sample historical risk data
const HISTORICAL_RISK_DATA = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Generate risk metrics with some random fluctuation but overall trend
    return {
        date: dayStr,
        portfolioRisk: Math.max(20, Math.min(60, 40 + (Math.sin(i / 5) * 15) + (Math.random() * 10 - 5))),
        volatility: Math.max(10, Math.min(30, 18 + (Math.sin(i / 4) * 7) + (Math.random() * 5 - 2.5))),
        var95: Math.max(2, Math.min(7, 4 + (Math.sin(i / 6) * 1.5) + (Math.random() * 1 - 0.5))),
    };
});

// Sample alerts data
const RISK_ALERTS = [
    {
        id: 1,
        type: "high_volatility",
        severity: "high",
        asset: "BTC/USDT",
        message: "Unusually high volatility detected",
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
    },
    {
        id: 2,
        type: "correlation_change",
        severity: "medium",
        asset: "Multiple",
        message: "Significant correlation shifts detected between assets",
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
    },
    {
        id: 3,
        type: "drawdown_threshold",
        severity: "medium",
        asset: "SOL/USDT",
        message: "Strategy approaching maximum drawdown threshold (4.8%)",
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
    },
    {
        id: 4,
        type: "risk_exposure",
        severity: "low",
        asset: "Portfolio",
        message: "Overall risk exposure has increased by 15% in the last 24 hours",
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() // 3 hours ago
    },
    {
        id: 5,
        type: "var_breach",
        severity: "high",
        asset: "ETH/USDT",
        message: "Value at Risk (VaR) threshold breached",
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString() // 5 hours ago
    }
];

// Limit settings data
const LIMIT_SETTINGS = [
    { setting: "Maximum Portfolio Risk", current: 42, limit: 60, unit: "%" },
    { setting: "Maximum Drawdown", current: 8.2, limit: 15, unit: "%" },
    { setting: "Single Asset Exposure", current: 45, limit: 50, unit: "%" },
    { setting: "Value at Risk (95%)", current: 4.2, limit: 7, unit: "%" },
    { setting: "Leverage", current: 1, limit: 3, unit: "x" }
];

/**
 * RiskMonitorPage - Dashboard section for monitoring and managing risk
 */
const RiskMonitorPage = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
    const { data: strategies } = useGetStrategiesQuery();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Risk Monitor</h1>
                    <p className="text-muted-foreground">Real-time risk analytics and alerts</p>
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
                            <SelectItem value="portfolio">Entire Portfolio</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* Risk Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RiskOverviewCard />
                <AlertsCard />
                <ExposureCard />
            </div>

            {/* Risk History Chart */}
            <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                <CardHeader className="pb-3">
                    <CardTitle>Risk Metrics History</CardTitle>
                    <CardDescription>30-day view of key risk indicators</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={HISTORICAL_RISK_DATA}
                                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid, #e5e7eb)" opacity={0.3} />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "var(--chart-text, #6b7280)" }}
                                    axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    tickFormatter={(value) => value.split(" ")[1]} // Only show day
                                    interval={2} // Show every 3rd label
                                />
                                <YAxis
                                    yAxisId="left"
                                    tick={{ fill: "var(--chart-text, #6b7280)" }}
                                    axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    domain={[0, 100]}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    tick={{ fill: "var(--chart-text, #6b7280)" }}
                                    axisLine={{ stroke: "var(--chart-grid, #e5e7eb)" }}
                                    domain={[0, 10]}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <RechartsTooltip
                                    formatter={(value, name) => {
                                        if (name === "var95") return [`${value}%`, "Value at Risk"];
                                        if (typeof name === "string") {
                                            return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
                                        }
                                        return [`${value}%`, String(name)];
                                    }}

                                    contentStyle={{
                                        backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                        borderColor: "var(--tooltip-border, #e5e7eb)",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="portfolioRisk"
                                    stroke="#7c3aed" // purple
                                    strokeWidth={2}
                                    name="Portfolio Risk"
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="volatility"
                                    stroke="#ec4899" // pink
                                    strokeWidth={2}
                                    name="Volatility"
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="var95"
                                    stroke="#f59e0b" // amber
                                    strokeWidth={2}
                                    name="var95"
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Risk Limits & Asset Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskLimitsCard />
                <RiskExposureTable />
            </div>
        </div>
    );
};

/**
 * RiskOverviewCard - Shows main risk metrics
 */
const RiskOverviewCard = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-purple-500" />
                    Risk Overview
                </CardTitle>
                <CardDescription>Current risk profile assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Portfolio Risk</span>
                        <Badge
                            variant="outline"
                            className={RISK_METRICS.portfolioRisk > 50
                                ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                : RISK_METRICS.portfolioRisk > 30
                                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            }
                        >
                            {RISK_METRICS.portfolioRisk > 50
                                ? "High"
                                : RISK_METRICS.portfolioRisk > 30
                                    ? "Medium"
                                    : "Low"}
                        </Badge>
                    </div>
                    <Progress
                        value={RISK_METRICS.portfolioRisk}
                        className={cn(
                            "h-2",
                            RISK_METRICS.portfolioRisk > 50
                                ? "bg-red-100 dark:bg-red-950 [&>div]:bg-red-500"
                                : RISK_METRICS.portfolioRisk > 30
                                    ? "bg-amber-100 dark:bg-amber-950 [&>div]:bg-amber-500"
                                    : "bg-green-100 dark:bg-green-950 [&>div]:bg-green-500"
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Volatility</span>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">{RISK_METRICS.volatility}%</span>
                            <Badge className="ml-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Value at Risk (95%)</span>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">{RISK_METRICS.var95}%</span>
                            <Badge className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">Low</Badge>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Conditional VaR</span>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">{RISK_METRICS.cvar95}%</span>
                            <Badge className="ml-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Correlation</span>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">{RISK_METRICS.correlation}</span>
                            <Badge className="ml-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
                        </div>
                    </div>
                </div>

                <div className="pt-1">
                    <Alert className="bg-purple-50 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                            Risk profile is within acceptable parameters, but volatility has increased by 15% in the last 24 hours.
                        </AlertDescription>
                    </Alert>
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * AlertsCard - Risk alerts and notifications
 */
const AlertsCard = () => {
    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "high":
                return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case "medium":
                return <AlertCircle className="h-4 w-4 text-amber-500" />;
            case "low":
                return <Info className="h-4 w-4 text-blue-500" />;
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800";
            case "medium":
                return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
            case "low":
                return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
            default:
                return "";
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));

        if (minutes < 60) return `${minutes}m ago`;
        if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
        return `${Math.floor(minutes / 1440)}d ago`;
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                        Risk Alerts
                    </CardTitle>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800">
                        {RISK_ALERTS.length} Active
                    </Badge>
                </div>
                <CardDescription>Recent risk threshold violations</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[350px] overflow-auto">
                <div className="space-y-3">
                    {RISK_ALERTS.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p-3 rounded-md border ${getSeverityClass(alert.severity)}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                    {getSeverityIcon(alert.severity)}
                                    <span className="ml-2 font-medium text-sm">{alert.asset}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{formatTime(alert.timestamp)}</span>
                            </div>
                            <p className="text-sm">{alert.message}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * ExposureCard - Risk exposure by asset
 */

const ExposureCard = () => {
    // Calculate total for percentages
    const total = RISK_EXPOSURE.reduce((sum, item) => sum + item.exposure, 0);

    // Sample data for the chart
    const chartData = RISK_EXPOSURE.map(item => ({
        name: item.asset,
        value: item.exposure
    }));

    // Colors for the chart
    const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                    Exposure by Asset
                </CardTitle>
                <CardDescription>Current portfolio allocation</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2">
                    <div className="h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <RechartsTooltip
                                    formatter={(value) => [`${value}%`, "Exposure"]}
                                    contentStyle={{
                                        backgroundColor: "var(--tooltip-bg, rgba(255, 255, 255, 0.9))",
                                        borderColor: "var(--tooltip-border, #e5e7eb)",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                        {RISK_EXPOSURE.map((item, index) => (
                            <div key={item.asset} className="text-xs flex justify-between items-center">
                                <div className="flex items-center">
                                    <div
                                        className="w-2 h-2 rounded-full mr-1.5"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></div>
                                    <span>{item.asset}</span>
                                </div>
                                <div className="flex items-center">
                                    <span>{item.exposure}%</span>
                                    <span
                                        className={`ml-1.5 flex items-center ${item.change24h >= 0
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {item.change24h >= 0
                                            ? <ArrowUpRight className="h-3 w-3" />
                                            : <ArrowDownRight className="h-3 w-3" />}
                                        {Math.abs(item.change24h)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
/**
 * RiskLimitsCard - Shows risk limits and current status
 */
const RiskLimitsCard = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-blue-500" />
                        Risk Limits
                    </CardTitle>
                    <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                    </Button>
                </div>
                <CardDescription>Current limits and thresholds</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {LIMIT_SETTINGS.map((setting) => {
                        const percentage = (setting.current / setting.limit) * 100;
                        let statusColor = "bg-green-500";
                        if (percentage > 80) statusColor = "bg-red-500";
                        else if (percentage > 60) statusColor = "bg-amber-500";

                        return (
                            <div key={setting.setting} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center">
                                        <span className="font-medium">{setting.setting}</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs">Maximum allowed value</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground text-sm">
                                            {setting.current}{setting.unit} / {setting.limit}{setting.unit}
                                        </span>
                                        <div className={`h-2 w-2 rounded-full ${statusColor}`}></div>
                                    </div>
                                </div>
                                <Progress
                                    value={percentage}
                                    className="h-1.5 bg-gray-100 dark:bg-gray-800 [&>div]:bg-green-500"
                                />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * RiskExposureTable - Detailed asset exposure table
 */
const RiskExposureTable = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                        <BarChart2 className="mr-2 h-5 w-5 text-blue-500" />
                        Risk Contribution
                    </CardTitle>
                    <Button variant="outline" size="sm">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>
                <CardDescription>Asset-level risk breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Asset</TableHead>
                                <TableHead className="text-right">Exposure</TableHead>
                                <TableHead className="text-right">Risk Contrib.</TableHead>
                                <TableHead className="text-right">24h Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {RISK_EXPOSURE.map((item) => (
                                <TableRow key={item.asset}>
                                    <TableCell className="font-medium">{item.asset}</TableCell>
                                    <TableCell className="text-right">{item.exposure}%</TableCell>
                                    <TableCell className="text-right">{item.riskContribution}%</TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={`flex items-center justify-end ${item.change24h >= 0
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-red-600 dark:text-red-400"
                                                }`}
                                        >
                                            {item.change24h >= 0
                                                ? <ArrowUpRight className="mr-1 h-3 w-3" />
                                                : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                            {Math.abs(item.change24h)}%
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RiskMonitorPage;