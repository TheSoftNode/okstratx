"use client";

import { MobileNavBar } from "@/components/Dashboard/Layout/MobileNavBar";
import { Sidebar } from "@/components/Dashboard/Layout/Sidebar";
import { TopNav } from "@/components/Dashboard/Layout/TopNav";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

/**
 * Main Dashboard Layout component with sidebar, top nav, and content area
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Check if desktop view or mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle sidebar collapsed state
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar for mobile & desktop */}
            <Sidebar
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Navigation - desktop only */}
                <TopNav />

                {/* Mobile Navigation Bar */}
                <MobileNavBar setMobileOpen={setMobileOpen} />

                {/* Backdrop for mobile menu */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <main
                    className={cn(
                        "flex-1 overflow-auto transition-all duration-300",
                        mobileOpen && "blur-sm md:blur-none"
                    )}
                >
                    <div className="md:hidden h-16" /> {/* Space for mobile header */}
                    <div className="px-4 md:px-6 py-4 md:py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}