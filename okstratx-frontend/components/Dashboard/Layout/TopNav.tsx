"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Bell,
    Search,
    Settings,
    User,
    LogOut,
    HelpCircle,
    Bookmark,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/Shared/ThemeToggle";

/**
 * TopNav - Desktop navigation bar with search, notifications, and user profile
 */
export function TopNav() {
    const [notifications, setNotifications] = useState<number>(3);
    const { resolvedTheme } = useTheme();

    // Simulate notifications
    useEffect(() => {
        // Update notifications occasionally to simulate new incoming alerts
        const interval = setInterval(() => {
            setNotifications(prev => Math.min(prev + 1, 9));
        }, 60000); // Add a new notification every minute, up to 9 max

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden md:flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6">
            {/* Left: Search */}
            <div className="w-full max-w-sm">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search strategies, markets..."
                        className="w-full bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 pl-9 rounded-full"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative rounded-full">
                            <Bell className="h-5 w-5" />
                            {notifications > 0 && (
                                <Badge
                                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]"
                                    variant="destructive"
                                >
                                    {notifications > 9 ? '9+' : notifications}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notifications</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600 dark:text-blue-400">
                                Mark all as read
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-72 overflow-auto">
                            {[...Array(notifications)].map((_, i) => (
                                <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                                    <div className="flex gap-3 items-start w-full">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Bell className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="font-medium text-sm">Strategy Alert</p>
                                            <p className="text-xs text-muted-foreground">BTC/USDT crossed moving average</p>
                                            <p className="text-xs text-muted-foreground">2 min ago</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                            {notifications === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    No new notifications
                                </div>
                            )}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="py-2 justify-center cursor-pointer">
                            <Link href="/dashboard/notifications" className="text-blue-600 dark:text-blue-400 text-sm">
                                View all notifications
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                                <span className="text-xs font-semibold">AI</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-muted-foreground">admin@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="h-4 w-4 mr-2" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Bookmark className="h-4 w-4 mr-2" />
                                <span>Saved Strategies</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="h-4 w-4 mr-2" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Shield className="h-4 w-4 mr-2" />
                                <span>API Keys</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            <span>Help & Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer focus:text-red-700 dark:focus:text-red-300">
                            <LogOut className="h-4 w-4 mr-2" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}