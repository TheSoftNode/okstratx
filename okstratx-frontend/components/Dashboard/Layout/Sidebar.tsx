"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    LayoutDashboard,
    LineChart,
    GitBranch,
    BarChart2,
    ShieldAlert,
    AreaChart,
    Settings,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Brain,
    RefreshCw,
} from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { NavItem } from "./NavItem";
import WebSocketStatus from "@/components/Socket/WebSocketStatus";
import ThemeToggle from "@/components/Shared/ThemeToggle";
import LinkedLogo from "@/components/Shared/Logo";
import Link from "next/link";




interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

/**
 * Sidebar navigation component for dashboard
 */
export const Sidebar = ({ isCollapsed, toggleSidebar, mobileOpen, setMobileOpen }: SidebarProps) => {
    const pathname = usePathname();
    const { theme } = useTheme();
    const marketDataSocket = useWebSocket("ws://localhost:8000/ws/market_data");
    const signalsSocket = useWebSocket("ws://localhost:8000/ws/strategy_signals");

    const navItems = [
        {
            title: "Overview",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-full h-full" />,
            badge: undefined,
        },
        {
            title: "Live Feed",
            href: "/dashboard/live-feed",
            icon: <LineChart className="w-full h-full" />,
            badge: {
                content: "Live",
                variant: "default" as const,
            },
        },
        {
            title: "Strategies",
            href: "/dashboard/strategies",
            icon: <GitBranch className="w-full h-full" />,
            badge: undefined,
        },
        {
            title: "Performance",
            href: "/dashboard/performance",
            icon: <BarChart2 className="w-full h-full" />,
            badge: undefined,
        },
        {
            title: "Risk Monitor",
            href: "/dashboard/risk",
            icon: <ShieldAlert className="w-full h-full" />,
            badge: undefined,
        },
        {
            title: "Market Data",
            href: "/dashboard/market",
            icon: <AreaChart className="w-full h-full" />,
            badge: undefined,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: <Settings className="w-full h-full" />,
            badge: undefined,
        },
    ];

    // Handle mobile menu
    const handleMobileNavClick = () => {
        setMobileOpen(false);
    };

    const sidebarClasses = cn(
        "flex flex-col h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
        mobileOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex"
    );

    return (
        <aside className={sidebarClasses}>
            {/* Sidebar Header */}
            <div className={cn(
                "flex items-center py-4 h-16",
                isCollapsed ? "justify-center px-2" : "px-4 justify-between"
            )}>
                <Link href={"/"}>
                    {!isCollapsed && (

                        <LinkedLogo showText />
                    )}
                    {isCollapsed && (
                        <LinkedLogo showText={false} />
                    )}
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-8 w-8 rounded-full hidden md:flex",
                        isCollapsed && "hidden"
                    )}
                    onClick={toggleSidebar}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>

            <div className="md:hidden flex items-center justify-end px-4 py-2">
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
            </div>

            {/* Navigation Links */}
            <ScrollArea className="flex-1 px-2">
                <nav className="flex flex-col">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            title={item.title}
                            isActive={
                                (item.href === "/dashboard" && pathname === "/dashboard") ||
                                (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                            }
                            isCollapsed={isCollapsed}
                            badge={item.badge}
                        />
                    ))}
                </nav>
            </ScrollArea>

            {/* WebSocket Status */}
            <div className={cn(
                "px-2 py-3 border-t border-gray-200 dark:border-gray-800",
                isCollapsed ? "items-center justify-center" : "px-4"
            )}>
                {!isCollapsed && (
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                        <span>WebSocket Status</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => {
                                marketDataSocket.reconnect();
                                signalsSocket.reconnect();
                            }}
                        >
                            <RefreshCw className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                <div className="space-y-2">
                    {isCollapsed ? (
                        <>
                            <div className="flex justify-center py-1">
                                <WebSocketStatus
                                    isConnected={marketDataSocket.isConnected}
                                    isConnecting={marketDataSocket.isConnecting}
                                    error={marketDataSocket.error}
                                    reconnect={marketDataSocket.reconnect}
                                    endpoint="ws://localhost:8000/ws/market_data"
                                    variant="indicator"
                                />
                            </div>
                            <div className="flex justify-center py-1">
                                <WebSocketStatus
                                    isConnected={signalsSocket.isConnected}
                                    isConnecting={signalsSocket.isConnecting}
                                    error={signalsSocket.error}
                                    reconnect={signalsSocket.reconnect}
                                    endpoint="ws://localhost:8000/ws/strategy_signals"
                                    variant="indicator"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md text-xs">
                                <div className="flex items-center">
                                    <WebSocketStatus
                                        isConnected={marketDataSocket.isConnected}
                                        isConnecting={marketDataSocket.isConnecting}
                                        error={marketDataSocket.error}
                                        reconnect={marketDataSocket.reconnect}
                                        endpoint="ws://localhost:8000/ws/market_data"
                                        variant="indicator"
                                    />
                                    <span className="ml-2">Market Data</span>
                                </div>
                                <span className={cn(
                                    marketDataSocket.isConnected ? "text-green-500 dark:text-green-400" :
                                        marketDataSocket.isConnecting ? "text-yellow-500 dark:text-yellow-400" :
                                            "text-red-500 dark:text-red-400"
                                )}>
                                    {marketDataSocket.isConnected ? "Connected" :
                                        marketDataSocket.isConnecting ? "Connecting..." :
                                            "Disconnected"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md text-xs">
                                <div className="flex items-center">
                                    <WebSocketStatus
                                        isConnected={signalsSocket.isConnected}
                                        isConnecting={signalsSocket.isConnecting}
                                        error={signalsSocket.error}
                                        reconnect={signalsSocket.reconnect}
                                        endpoint="ws://localhost:8000/ws/strategy_signals"
                                        variant="indicator"
                                    />
                                    <span className="ml-2">Strategy Signals</span>
                                </div>
                                <span className={cn(
                                    signalsSocket.isConnected ? "text-green-500 dark:text-green-400" :
                                        signalsSocket.isConnecting ? "text-yellow-500 dark:text-yellow-400" :
                                            "text-red-500 dark:text-red-400"
                                )}>
                                    {signalsSocket.isConnected ? "Connected" :
                                        signalsSocket.isConnecting ? "Connecting..." :
                                            "Disconnected"}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sidebar Footer */}
            <div className={cn(
                "flex items-center border-t border-gray-200 dark:border-gray-800 py-3",
                isCollapsed ? "justify-center px-2" : "justify-between px-4"
            )}>
                {!isCollapsed && (
                    <LinkedLogo showText />
                )}

                <div className="flex items-center gap-1">
                    {isCollapsed ? (
                        <>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                            <ChevronRight className="h-4 w-4" onClick={toggleSidebar} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <span>Expand sidebar</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
};
