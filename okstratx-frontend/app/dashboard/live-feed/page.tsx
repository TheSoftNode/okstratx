"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    LineChart,
    Zap,
    Clock,
    Bell,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    ArrowDown,
    ArrowUp
} from "lucide-react";

import { useWebSocket } from "@/hooks/useWebSocket";
import WebSocketStatus from "@/components/Socket/WebSocketStatus";
import { useGetStrategiesQuery } from "@/Redux/apiSlice";
import LivePriceChart from "@/components/Socket/LivePriceChart";
import TradingSignalsFeed from "@/components/Socket/TradingSignalsFeed";

/**
 * WebSocketStatusPanel - shows the status of all active WebSocket connections
 */
const WebSocketStatusPanel = () => {
    const marketDataSocket = useWebSocket("ws://localhost:8000/ws/market_data");
    const signalsSocket = useWebSocket("ws://localhost:8000/ws/strategy_signals");

    const connections = [
        {
            name: "Market Data",
            endpoint: "ws://localhost:8000/ws/market_data",
            status: marketDataSocket
        },
        {
            name: "Strategy Signals",
            endpoint: "ws://localhost:8000/ws/strategy_signals",
            status: signalsSocket
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-blue-500" />
                    WebSocket Status
                </CardTitle>
                <CardDescription>
                    Real-time data connection status
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {connections.map((connection) => (
                        <div
                            key={connection.name}
                            className="bg-muted/50 rounded-lg p-4 border border-border"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium text-sm">{connection.name}</h3>
                                <Badge
                                    variant={connection.status.isConnected ? "secondary" : connection.status.isConnecting ? "outline" : "destructive"}
                                >
                                    {connection.status.isConnected ? (
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                    ) : connection.status.isConnecting ? (
                                        <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                                    ) : (
                                        <AlertTriangle className="mr-1 h-3 w-3" />
                                    )}
                                    {connection.status.isConnected ? "Connected" :
                                        connection.status.isConnecting ? "Connecting..." :
                                            "Disconnected"}
                                </Badge>
                            </div>

                            <WebSocketStatus
                                isConnected={connection.status.isConnected}
                                isConnecting={connection.status.isConnecting}
                                error={connection.status.error}
                                reconnect={connection.status.reconnect}
                                endpoint={connection.endpoint}
                                showEndpoint={true}
                                variant="full"
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * EventLog - shows a real-time log of important platform events
 */
const EventLog = () => {
    // Mock events data with timestamps and types
    const [events, setEvents] = useState([
        {
            id: '1',
            timestamp: new Date(Date.now() - 60000).toISOString(),
            type: 'signal',
            message: 'Buy signal generated for BTC/USDT',
            severity: 'info'
        },
        {
            id: '2',
            timestamp: new Date(Date.now() - 120000).toISOString(),
            type: 'execution',
            message: 'Order executed: Buy 0.05 BTC at $63,245',
            severity: 'success'
        },
        {
            id: '3',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            type: 'system',
            message: 'Strategy RSI-14 optimization completed',
            severity: 'info'
        },
        {
            id: '4',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            type: 'error',
            message: 'Connection to OKX API temporarily lost',
            severity: 'error'
        },
        {
            id: '5',
            timestamp: new Date(Date.now() - 900000).toISOString(),
            type: 'warning',
            message: 'High volatility detected in ETH/USDT',
            severity: 'warning'
        }
    ]);

    // Format timestamp
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    // Get icon based on event type
    const getEventIcon = (type: string, severity: string) => {
        switch (type) {
            case 'signal':
                return severity === 'success' ? <ArrowUp className="h-4 w-4 text-green-500" /> :
                    severity === 'error' ? <ArrowDown className="h-4 w-4 text-red-500" /> :
                        <LineChart className="h-4 w-4 text-blue-500" />;
            case 'execution':
                return <Zap className="h-4 w-4 text-green-500" />;
            case 'system':
                return <RefreshCw className="h-4 w-4 text-blue-500" />;
            case 'error':
                return <AlertTriangle className="h-4 w-4 text-red-500" />;
            case 'warning':
                return <Bell className="h-4 w-4 text-yellow-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                    Event Log
                </CardTitle>
                <CardDescription>
                    Real-time system events and notifications
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-0 divide-y divide-border">
                    {events.map((event) => (
                        <div key={event.id} className="py-3 flex items-start gap-3">
                            <div className="mt-0.5">
                                {getEventIcon(event.type, event.severity)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{event.message}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                    <span>{formatTimestamp(event.timestamp)}</span>
                                    <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                                    <span className="capitalize">{event.type}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

/**
 * LiveFeedPage - Dedicated page for real-time data monitoring
 */
const LiveFeedPage = () => {
    const [selectedTradingPair, setSelectedTradingPair] = useState("BTC/USDT");

    // Fetch strategies data
    const { data: strategies } = useGetStrategiesQuery();

    // Select first deployed strategy to monitor, if any
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

    useEffect(() => {
        if (strategies) {
            const deployedStrategy = strategies.find(s => s.status === 'deployed');
            if (deployedStrategy && !selectedStrategy) {
                setSelectedStrategy(deployedStrategy.id);
            } else if (strategies.length > 0 && !selectedStrategy) {
                setSelectedStrategy(strategies[0].id);
            }
        }
    }, [strategies, selectedStrategy]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Live Feed</h1>
                <p className="text-muted-foreground">Real-time market data and trading signals</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Charts and Signal Feed (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Price Chart */}
                    <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                        <CardHeader className="pb-0">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <CardTitle>Live Market Data</CardTitle>
                                <Tabs
                                    value={selectedTradingPair}
                                    onValueChange={setSelectedTradingPair}
                                    className="w-auto"
                                >
                                    <TabsList className="h-8">
                                        <TabsTrigger value="BTC/USDT" className="text-xs px-2">BTC/USDT</TabsTrigger>
                                        <TabsTrigger value="ETH/USDT" className="text-xs px-2">ETH/USDT</TabsTrigger>
                                        <TabsTrigger value="SOL/USDT" className="text-xs px-2">SOL/USDT</TabsTrigger>
                                        <TabsTrigger value="DOGE/USDT" className="text-xs px-2">DOGE/USDT</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 pt-4">
                            <LivePriceChart
                                symbol={selectedTradingPair}
                                showHeader={false}
                                height={400}
                                showChange={true}
                            />
                        </CardContent>
                    </Card>

                    {/* Signal Feed */}
                    <Card className="dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <Zap className="mr-2 h-5 w-5 text-blue-500" />
                                    Trading Signals
                                </CardTitle>
                                {selectedStrategy && strategies && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        {strategies.find(s => s.id === selectedStrategy)?.name}
                                    </Badge>
                                )}
                            </div>
                            <CardDescription>
                                Real-time AI-generated trading signals
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <TradingSignalsFeed
                                strategyId={selectedStrategy || undefined}
                                maxSignals={10}
                                height={400}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Status and Event Log (1/3 width) */}
                <div className="space-y-6">
                    {/* WebSocket Status Panel */}
                    <WebSocketStatusPanel />

                    {/* Event Log */}
                    <EventLog />
                </div>
            </div>
        </div>
    );
};

export default LiveFeedPage;