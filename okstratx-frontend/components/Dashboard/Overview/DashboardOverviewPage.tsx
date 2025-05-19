"use client";

import { useGetStrategiesQuery } from "@/Redux/apiSlice";
import { useState, useEffect } from "react";
import { PerformanceSummary } from "./PerformanceSummary";
import { MarketChart } from "./MarketChart";
import { FeatureCards, StrategyPerformanceCard } from "./StrategyPerformanceCard";
import TradingSignalsFeed from "@/components/Socket/TradingSignalsFeed";
import { ActiveStrategies } from "./ActiveStrategies";
import DashboardHeader from "./DashboardHeader";
import RiskStatus from "./RiskStatus";


const DashboardOverviewPage = () => {
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

    // Fetch strategies data
    const { data: strategies, isLoading } = useGetStrategiesQuery();

    // Select first strategy by default
    useEffect(() => {
        if (strategies && strategies.length > 0 && !selectedStrategy) {
            setSelectedStrategy(strategies[0].id);
        }
    }, [strategies, selectedStrategy]);

    // Handle strategy selection
    const handleStrategySelect = (strategyId: string) => {
        setSelectedStrategy(strategyId);
    };

    return (
        <div className="space-y-6">
            {/* Dashboard Header with Create Strategy Button/Modal */}
            <DashboardHeader />

            {/* Performance Summary Cards */}
            <PerformanceSummary />

            {/* Main Content - 2 Columns on Large Screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Charts and Strategy Cards (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Market Chart */}
                    <MarketChart />

                    {/* Strategy Performance Card */}
                    {selectedStrategy && (
                        <StrategyPerformanceCard
                            strategyId={selectedStrategy}
                            onChangeStrategy={handleStrategySelect}
                        />
                    )}

                    {/* Feature Cards */}
                    <FeatureCards />
                </div>

                {/* Right Column: Trading Signals and Status (1/3 width) */}
                <div className="space-y-6">
                    {/* Trading Signals Feed */}
                    <TradingSignalsFeed maxSignals={5} height={300} />

                    {/* Active Strategies with Create Strategy Modal */}
                    <ActiveStrategies
                        onSelectStrategy={handleStrategySelect}
                        selectedStrategy={selectedStrategy}
                    />

                    {/* Risk Status */}
                    <RiskStatus />
                </div>
            </div>
        </div>
    );
};

export default DashboardOverviewPage;


