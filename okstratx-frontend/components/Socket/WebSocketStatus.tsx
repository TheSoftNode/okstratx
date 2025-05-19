"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

interface WebSocketStatusProps {
    isConnected: boolean;
    isConnecting: boolean;
    error: Event | null;
    reconnect: () => void;
    endpoint: string;
    showEndpoint?: boolean;
    variant?: "badge" | "indicator" | "full";
}

/**
 * A reusable component to display WebSocket connection status
 */
const WebSocketStatus = ({
    isConnected,
    isConnecting,
    error,
    reconnect,
    endpoint,
    showEndpoint = false,
    variant = "full",
}: WebSocketStatusProps) => {
    const [lastConnected, setLastConnected] = useState<string | null>(null);

    // Update last connected timestamp when connected
    useEffect(() => {
        if (isConnected) {
            setLastConnected(new Date().toLocaleTimeString());
        }
    }, [isConnected]);

    // Render a simple indicator dot
    if (variant === "indicator") {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center">
                            {isConnecting ? (
                                <Loader2 className="h-3 w-3 text-yellow-500 dark:text-yellow-400 animate-spin" />
                            ) : isConnected ? (
                                <div className="h-3 w-3 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                            ) : (
                                <div className="h-3 w-3 rounded-full bg-red-500 dark:bg-red-400" />
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <div className="text-xs">
                            {isConnecting ? (
                                <span>Connecting to WebSocket...</span>
                            ) : isConnected ? (
                                <span>Connected to WebSocket{lastConnected ? ` since ${lastConnected}` : ""}</span>
                            ) : (
                                <span>Disconnected from WebSocket{error ? ": " + error.type : ""}</span>
                            )}
                            {showEndpoint && (
                                <div className="mt-1 text-gray-500 dark:text-gray-400">
                                    Endpoint: {endpoint}
                                </div>
                            )}
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Render a badge
    if (variant === "badge") {
        return (
            <Badge
                variant="outline"
                className={`
          ${isConnecting
                        ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
                        : isConnected
                            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                            : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                    }
        `}
            >
                {isConnecting ? (
                    <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Connecting
                    </>
                ) : isConnected ? (
                    <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Connected
                    </>
                ) : (
                    <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Disconnected
                    </>
                )}
            </Badge>
        );
    }

    // Render full component
    return (
        <div className="flex flex-col space-y-2 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {isConnecting ? (
                        <Loader2 className="h-4 w-4 text-yellow-500 dark:text-yellow-400 animate-spin mr-2" />
                    ) : isConnected ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400 mr-2" />
                    ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400 mr-2" />
                    )}

                    <span className="font-medium text-sm">
                        {isConnecting
                            ? "Connecting to WebSocket..."
                            : isConnected
                                ? "Connected to WebSocket"
                                : "Disconnected from WebSocket"
                        }
                    </span>
                </div>

                {!isConnected && !isConnecting && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={reconnect}
                        className="h-8 px-2"
                    >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reconnect
                    </Button>
                )}
            </div>

            {showEndpoint && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Endpoint: {endpoint}
                </div>
            )}

            {isConnected && lastConnected && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Connected since {lastConnected}
                </div>
            )}

            {error && (
                <div className="text-xs text-red-500 dark:text-red-400">
                    Error: {error.type}
                </div>
            )}
        </div>
    );
};

export default WebSocketStatus;