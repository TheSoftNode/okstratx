import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

/**
 * RiskStatus component - displays risk metrics and portfolio health
 */
const RiskStatus = () => {
    // Mock risk data
    const riskData = {
        portfolioRisk: 30, // Percentage (0-100)
        maxDrawdown: -8.2,
        volatility: "Low"
    };

    return (
        <Card className="hover:shadow-md transition-shadow duration-300 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                    Risk Status
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Portfolio Risk</span>
                        <span className="font-medium">
                            {riskData.portfolioRisk <= 30
                                ? "Low"
                                : riskData.portfolioRisk <= 70
                                    ? "Medium"
                                    : "High"}
                        </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${riskData.portfolioRisk <= 30
                                ? "bg-green-500"
                                : riskData.portfolioRisk <= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                            style={{ width: `${riskData.portfolioRisk}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-muted/60 rounded-md p-2">
                        <div className="text-xs text-muted-foreground">Max Drawdown</div>
                        <div className="text-lg font-semibold">{riskData.maxDrawdown}%</div>
                    </div>
                    <div className="bg-muted/60 rounded-md p-2">
                        <div className="text-xs text-muted-foreground">Volatility</div>
                        <div className="text-lg font-semibold">{riskData.volatility}</div>
                    </div>
                </div>

                {/* Additional Risk Metrics */}
                <div className="mt-2 space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Risk-to-Reward Ratio</span>
                        <span className="font-medium">1.8</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Stop-Loss Activations</span>
                        <span className="font-medium">2 <span className="text-xs text-muted-foreground">(Last 30d)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Market Exposure</span>
                        <span className="font-medium">42%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RiskStatus;