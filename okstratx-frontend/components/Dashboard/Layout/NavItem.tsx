import Link from "next/link";
import { cn } from "@/lib/utils";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


interface NavItemProps {
    icon: React.ReactNode;
    title: string;
    href: string;
    isActive: boolean;
    isCollapsed: boolean;
    badge?: {
        content: string;
        variant: "default" | "secondary" | "destructive" | "outline";
    };
}

/**
 * Navigation item component for the sidebar
 */
export const NavItem = ({ icon, title, href, isActive, isCollapsed, badge }: NavItemProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                        href={href}
                        className={cn(
                            "flex items-center gap-x-2 text-sm font-medium rounded-md py-2 px-3 my-1 transition-colors",
                            isActive
                                ? "bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5",
                            isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                        )}>
                            {icon}
                        </div>
                        {!isCollapsed && (
                            <>
                                <span>{title}</span>
                                {badge && (
                                    <span className={cn(
                                        "ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full",
                                        badge.variant === "default" && "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
                                        badge.variant === "secondary" && "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
                                        badge.variant === "destructive" && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                                        badge.variant === "outline" && "border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300"
                                    )}>
                                        {badge.content}
                                    </span>
                                )}
                            </>
                        )}
                    </Link>
                </TooltipTrigger>
                {isCollapsed && (
                    <TooltipContent side="right">
                        <div className="flex items-center gap-2">
                            <span>{title}</span>
                            {badge && (
                                <span className={cn(
                                    "text-xs font-semibold px-1.5 py-0.5 rounded-full",
                                    badge.variant === "default" && "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
                                    badge.variant === "secondary" && "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
                                    badge.variant === "destructive" && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                                    badge.variant === "outline" && "border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300"
                                )}>
                                    {badge.content}
                                </span>
                            )}
                        </div>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};
