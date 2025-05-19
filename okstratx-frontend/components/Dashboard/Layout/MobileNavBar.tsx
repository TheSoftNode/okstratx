import ThemeToggle from "@/components/Shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";

export const MobileNavBar = ({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) => {
    return (
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 z-40">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="ml-3 flex items-center">
                        <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-1.5" />
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500">
                            AI Strategy Lab
                        </span>
                    </div>
                </div>
                <ThemeToggle />
            </div>
        </div>
    );
};