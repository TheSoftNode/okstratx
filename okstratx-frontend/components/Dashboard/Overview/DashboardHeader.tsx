import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateStrategyModal } from "../Strategies/CreateStrategyModal";

/**
 * DashboardHeader component - displays the title and action buttons
 * Includes the Create Strategy modal
 */
const DashboardHeader = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Your AI trading strategies at a glance</p>
                </div>
                <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Strategy
                </Button>
            </div>

            {/* Create Strategy Modal */}
            <CreateStrategyModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
            />
        </>
    );
};

export default DashboardHeader;