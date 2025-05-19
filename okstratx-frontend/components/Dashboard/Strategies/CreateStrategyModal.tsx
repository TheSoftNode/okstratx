// "use client";

// import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle
// } from "@/components/ui/dialog";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import {
//     Plus,
//     Cpu,
//     Brain,
//     TrendingUp,
//     RefreshCw,
//     Activity,
//     LineChart,
//     AlertTriangle,
//     ChevronRight,
//     Sparkles
// } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { RiskTolerance, StrategyRequest, StrategyType, useCreateStrategyMutation } from "@/Redux/apiSlice";

// interface CreateStrategyModalProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
// }

// /**
//  * Create Strategy Modal - allows users to create a new AI-driven strategy
//  */
// export const CreateStrategyModal = ({ open, onOpenChange }: CreateStrategyModalProps) => {
//     // Form state
//     const [formData, setFormData] = useState<{
//         description: string;
//         type: StrategyType;
//         trading_pairs: string[];
//         risk_tolerance: RiskTolerance;
//     }>({
//         description: "",
//         type: StrategyType.TREND_FOLLOWING,
//         trading_pairs: ["BTC/USDT"],
//         risk_tolerance: RiskTolerance.MEDIUM,
//     });

//     // Active trading pair management
//     const [selectedPair, setSelectedPair] = useState("BTC/USDT");
//     const [pairInputValue, setPairInputValue] = useState("");

//     // RTK mutation hook
//     const [createStrategy, { isLoading, isError, error, isSuccess }] = useCreateStrategyMutation();

//     // Handle form input changes
//     const handleInputChange = (field: keyof typeof formData, value: any) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     // Handle adding trading pair
//     const handleAddPair = () => {
//         if (!pairInputValue) return;

//         const formattedPair = pairInputValue.toUpperCase().replace('/', '-');

//         if (!formData.trading_pairs.includes(formattedPair)) {
//             setFormData((prev) => ({
//                 ...prev,
//                 trading_pairs: [...prev.trading_pairs, formattedPair],
//             }));
//             setSelectedPair(formattedPair);
//         }

//         setPairInputValue("");
//     };

//     // Handle removing trading pair
//     const handleRemovePair = (pair: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             trading_pairs: prev.trading_pairs.filter((p) => p !== pair),
//         }));

//         if (selectedPair === pair && formData.trading_pairs.length > 1) {
//             const remainingPairs = formData.trading_pairs.filter((p) => p !== pair);
//             setSelectedPair(remainingPairs[0]);
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         try {
//             const strategyRequest: StrategyRequest = {
//                 description: formData.description,
//                 type: formData.type,
//                 trading_pairs: formData.trading_pairs,
//                 risk_tolerance: formData.risk_tolerance,
//             };

//             await createStrategy(strategyRequest).unwrap();

//             // Reset form on success
//             if (isSuccess) {
//                 setFormData({
//                     description: "",
//                     type: StrategyType.TREND_FOLLOWING,
//                     trading_pairs: ["BTC/USDT"],
//                     risk_tolerance: RiskTolerance.MEDIUM,
//                 });
//                 onOpenChange(false);
//             }
//         } catch (err) {
//             console.error("Failed to create strategy:", err);
//         }
//     };

//     // Get strategy type description
//     const getStrategyTypeDescription = (type: StrategyType): string => {
//         switch (type) {
//             case StrategyType.TREND_FOLLOWING:
//                 return "Follows market momentum to capture directional price movements";
//             case StrategyType.MEAN_REVERSION:
//                 return "Capitalizes on price movements returning to historical average";
//             case StrategyType.BREAKOUT:
//                 return "Identifies and trades significant price level breakouts";
//             case StrategyType.SENTIMENT:
//                 return "Analyzes market sentiment to predict price movements";
//             case StrategyType.ML_BASED:
//                 return "Uses machine learning models to predict market behavior";
//             default:
//                 return "Custom trading strategy with personalized parameters";
//         }
//     };

//     // Get strategy type icon
//     const getStrategyTypeIcon = (type: StrategyType) => {
//         switch (type) {
//             case StrategyType.TREND_FOLLOWING:
//                 return <TrendingUp className="h-5 w-5" />;
//             case StrategyType.MEAN_REVERSION:
//                 return <RefreshCw className="h-5 w-5" />;
//             case StrategyType.BREAKOUT:
//                 return <Activity className="h-5 w-5" />;
//             case StrategyType.SENTIMENT:
//                 return <Brain className="h-5 w-5" />;
//             case StrategyType.ML_BASED:
//                 return <Cpu className="h-5 w-5" />;
//             default:
//                 return <LineChart className="h-5 w-5" />;
//         }
//     };

//     // Get strategy type colors
//     const getStrategyTypeColor = (type: StrategyType): string => {
//         switch (type) {
//             case StrategyType.TREND_FOLLOWING:
//                 return "text-blue-600 dark:text-blue-400";
//             case StrategyType.MEAN_REVERSION:
//                 return "text-purple-600 dark:text-purple-400";
//             case StrategyType.BREAKOUT:
//                 return "text-amber-600 dark:text-amber-400";
//             case StrategyType.SENTIMENT:
//                 return "text-green-600 dark:text-green-400";
//             case StrategyType.ML_BASED:
//                 return "text-indigo-600 dark:text-indigo-400";
//             default:
//                 return "text-gray-600 dark:text-gray-400";
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange} >
//             <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-auto dark:bg-slate-900 border-none shadow-xl">
//                 <DialogHeader>
//                     <DialogTitle className="flex items-center text-2xl">
//                         <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
//                         Create AI Strategy
//                     </DialogTitle>
//                     <DialogDescription>
//                         Let AI design and optimize your trading strategy based on your preferences.
//                     </DialogDescription>
//                 </DialogHeader>

//                 {/* Error message if strategy creation fails */}
//                 {isError && (
//                     <Alert variant="destructive">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertDescription>
//                             {error instanceof Error ? error.message : "Failed to create strategy"}
//                         </AlertDescription>
//                     </Alert>
//                 )}

//                 <div className="space-y-6 py-4">
//                     {/* Strategy Type Selection */}
//                     <div className="space-y-4">
//                         <Label htmlFor="strategy-type" className="text-base font-medium">
//                             Strategy Type
//                         </Label>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                             {Object.values(StrategyType).map((type) => (
//                                 <div
//                                     key={type}
//                                     className={`p-4 rounded-lg border cursor-pointer transition-all ${formData.type === type
//                                         ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
//                                         : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
//                                         }`}
//                                     onClick={() => handleInputChange("type", type)}
//                                 >
//                                     <div className="flex items-center mb-2">
//                                         <div className={`mr-2 ${getStrategyTypeColor(type)}`}>
//                                             {getStrategyTypeIcon(type)}
//                                         </div>
//                                         <h3 className="font-medium">{type.replace(/_/g, " ")}</h3>
//                                     </div>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                                         {getStrategyTypeDescription(type)}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Risk Tolerance */}
//                     <div className="space-y-2">
//                         <Label htmlFor="risk-tolerance" className="text-base font-medium">
//                             Risk Tolerance
//                         </Label>
//                         <Select
//                             value={formData.risk_tolerance}
//                             onValueChange={(value) => handleInputChange("risk_tolerance", value)}
//                         >
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select risk level" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value={RiskTolerance.LOW}>
//                                     <div className="flex items-center">
//                                         <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
//                                             Low
//                                         </Badge>
//                                         <span className="text-sm text-gray-500 dark:text-gray-400">Conservative with capital preservation</span>
//                                     </div>
//                                 </SelectItem>
//                                 <SelectItem value={RiskTolerance.MEDIUM}>
//                                     <div className="flex items-center">
//                                         <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                                             Medium
//                                         </Badge>
//                                         <span className="text-sm text-gray-500 dark:text-gray-400">Balanced risk and reward</span>
//                                     </div>
//                                 </SelectItem>
//                                 <SelectItem value={RiskTolerance.HIGH}>
//                                     <div className="flex items-center">
//                                         <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
//                                             High
//                                         </Badge>
//                                         <span className="text-sm text-gray-500 dark:text-gray-400">Aggressive with higher volatility</span>
//                                     </div>
//                                 </SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     {/* Trading Pairs */}
//                     <div className="space-y-4">
//                         <div className="flex justify-between items-center">
//                             <Label htmlFor="trading-pairs" className="text-base font-medium">
//                                 Trading Pairs
//                             </Label>
//                             <div className="text-sm text-muted-foreground">
//                                 {formData.trading_pairs.length} selected
//                             </div>
//                         </div>

//                         <div className="flex gap-2">
//                             <Input
//                                 id="pair-input"
//                                 placeholder="Add trading pair (e.g., ETH/USDT)"
//                                 value={pairInputValue}
//                                 onChange={(e) => setPairInputValue(e.target.value)}
//                                 className="flex-1"
//                             />
//                             <Button onClick={handleAddPair} type="button" variant="outline">
//                                 <Plus className="h-4 w-4 mr-1" />
//                                 Add
//                             </Button>
//                         </div>

//                         <div className="flex flex-wrap gap-2">
//                             {formData.trading_pairs.map((pair) => (
//                                 <Badge
//                                     key={pair}
//                                     variant={selectedPair === pair ? "default" : "outline"}
//                                     className="px-3 py-1 cursor-pointer"
//                                     onClick={() => setSelectedPair(pair)}
//                                 >
//                                     {pair}
//                                     <button
//                                         className="ml-2 text-xs hover:text-red-500 dark:hover:text-red-400"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleRemovePair(pair);
//                                         }}
//                                     >
//                                         ×
//                                     </button>
//                                 </Badge>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Strategy Description */}
//                     <div className="space-y-2">
//                         <Label htmlFor="description" className="text-base font-medium">
//                             Strategy Description (Optional)
//                         </Label>
//                         <Textarea
//                             id="description"
//                             placeholder="Describe your strategy goals and objectives..."
//                             value={formData.description}
//                             onChange={(e) => handleInputChange("description", e.target.value)}
//                             rows={3}
//                         />
//                     </div>
//                 </div>

//                 <DialogFooter className="flex-col sm:flex-row gap-2">
//                     <Button
//                         variant="outline"
//                         onClick={() => onOpenChange(false)}
//                         className="sm:w-auto w-full order-1 sm:order-none"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleSubmit}
//                         disabled={isLoading || formData.trading_pairs.length === 0}
//                         className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white sm:w-auto w-full"
//                     >
//                         {isLoading ? (
//                             <>
//                                 <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
//                                 Creating...
//                             </>
//                         ) : (
//                             <>
//                                 <Cpu className="mr-2 h-4 w-4" />
//                                 Generate AI Strategy
//                             </>
//                         )}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    Plus,
    Cpu,
    TrendingUp,
    RefreshCw,
    Activity,
    AlertTriangle,
    Sparkles,
    BarChart,
    Flame,
    ArrowBigUpDash
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RiskTolerance, StrategyRequest, StrategyType, useCreateStrategyMutation } from "@/Redux/apiSlice";

interface CreateStrategyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Create Strategy Modal - allows users to create a new AI-driven strategy
 */
export const CreateStrategyModal = ({ open, onOpenChange }: CreateStrategyModalProps) => {
    // Form state
    const [formData, setFormData] = useState<{
        description: string;
        type: StrategyType;
        trading_pairs: string[];
        risk_tolerance: RiskTolerance;
        constraints?: Record<string, any>;
    }>({
        description: "",
        type: StrategyType.MOMENTUM, // Changed from TREND_FOLLOWING to MOMENTUM to match backend enum
        trading_pairs: ["ETH-USDT"], // Use dash instead of slash for backend compatibility
        risk_tolerance: RiskTolerance.MEDIUM,
        constraints: {
            max_position_size: 0.5,
            min_profit_target: 2.0
        }
    });

    // Active trading pair management
    const [selectedPair, setSelectedPair] = useState("ETH-USDT");
    const [pairInputValue, setPairInputValue] = useState("");

    // RTK mutation hook
    const [createStrategy, { isLoading, isError, error, isSuccess }] = useCreateStrategyMutation();

    // Handle form input changes
    const handleInputChange = (field: keyof typeof formData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle adding trading pair
    const handleAddPair = () => {
        if (!pairInputValue) return;

        // Format the pair with dash instead of slash for backend compatibility
        const formattedPair = pairInputValue.toUpperCase().replace('/', '-');

        if (!formData.trading_pairs.includes(formattedPair)) {
            setFormData((prev) => ({
                ...prev,
                trading_pairs: [...prev.trading_pairs, formattedPair],
            }));
            setSelectedPair(formattedPair);
        }

        setPairInputValue("");
    };

    // Handle removing trading pair
    const handleRemovePair = (pair: string) => {
        setFormData((prev) => ({
            ...prev,
            trading_pairs: prev.trading_pairs.filter((p) => p !== pair),
        }));

        if (selectedPair === pair && formData.trading_pairs.length > 1) {
            const remainingPairs = formData.trading_pairs.filter((p) => p !== pair);
            setSelectedPair(remainingPairs[0]);
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Construct the request object to match the backend API schema
            const strategyRequest: StrategyRequest = {
                description: formData.description,
                type: formData.type,
                trading_pairs: formData.trading_pairs,
                risk_tolerance: formData.risk_tolerance,
                constraints: formData.constraints // Use constraints directly - backend expects this field
            };

            await createStrategy(strategyRequest).unwrap();

            // Reset form on success
            if (isSuccess) {
                setFormData({
                    description: "",
                    type: StrategyType.MOMENTUM,
                    trading_pairs: ["ETH-USDT"],
                    risk_tolerance: RiskTolerance.MEDIUM,
                    constraints: {
                        max_position_size: 0.5,
                        min_profit_target: 2.0
                    }
                });
                onOpenChange(false);
            }
        } catch (err) {
            console.error("Failed to create strategy:", err);
        }
    };

    // Get strategy type description
    const getStrategyTypeDescription = (type: StrategyType): string => {
        switch (type) {
            case StrategyType.MOMENTUM:
                return "Follows market momentum to capture directional price movements";
            case StrategyType.MEAN_REVERSION:
                return "Capitalizes on price movements returning to historical average";
            case StrategyType.BREAKOUT:
                return "Identifies and trades significant price level breakouts";
            case StrategyType.ARBITRAGE:
                return "Exploits price differences between markets";
            case StrategyType.MARKET_MAKING:
                return "Provides liquidity by placing buy and sell orders";
            default:
                return "Custom trading strategy with personalized parameters";
        }
    };

    // Get strategy type icon
    const getStrategyTypeIcon = (type: StrategyType) => {
        switch (type) {
            case StrategyType.MOMENTUM:
                return <TrendingUp className="h-5 w-5" />;
            case StrategyType.MEAN_REVERSION:
                return <RefreshCw className="h-5 w-5" />;
            case StrategyType.BREAKOUT:
                return <Activity className="h-5 w-5" />;
            case StrategyType.ARBITRAGE:
                return <ArrowBigUpDash className="h-5 w-5" />;
            case StrategyType.MARKET_MAKING:
                return <BarChart className="h-5 w-5" />;
            default:
                return <Flame className="h-5 w-5" />;
        }
    };

    // Get strategy type colors
    const getStrategyTypeColor = (type: StrategyType): string => {
        switch (type) {
            case StrategyType.MOMENTUM:
                return "text-blue-600 dark:text-blue-400";
            case StrategyType.MEAN_REVERSION:
                return "text-purple-600 dark:text-purple-400";
            case StrategyType.BREAKOUT:
                return "text-amber-600 dark:text-amber-400";
            case StrategyType.ARBITRAGE:
                return "text-green-600 dark:text-green-400";
            case StrategyType.MARKET_MAKING:
                return "text-indigo-600 dark:text-indigo-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="max-w-2xl bg-white max-h-[90vh] overflow-auto dark:bg-slate-900 border-none shadow-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center text-2xl">
                        <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
                        Create AI Strategy
                    </DialogTitle>
                    <DialogDescription>
                        Let AI design and optimize your trading strategy based on your preferences.
                    </DialogDescription>
                </DialogHeader>

                {/* Error message if strategy creation fails */}
                {isError && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            {error instanceof Error ? error.message :
                                typeof error === 'object' && error !== null ?
                                    JSON.stringify(error) :
                                    "Failed to create strategy"}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6 py-4">
                    {/* Strategy Type Selection */}
                    <div className="space-y-4">
                        <Label htmlFor="strategy-type" className="text-base font-medium">
                            Strategy Type
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.values(StrategyType).map((type) => (
                                <div
                                    key={type}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all ${formData.type === type
                                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                                        }`}
                                    onClick={() => handleInputChange("type", type)}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className={`mr-2 ${getStrategyTypeColor(type)}`}>
                                            {getStrategyTypeIcon(type)}
                                        </div>
                                        <h3 className="font-medium">{type.replace(/_/g, " ")}</h3>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {getStrategyTypeDescription(type)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risk Tolerance */}
                    <div className="space-y-2">
                        <Label htmlFor="risk-tolerance" className="text-base font-medium">
                            Risk Tolerance
                        </Label>
                        <Select
                            value={formData.risk_tolerance}
                            onValueChange={(value) => handleInputChange("risk_tolerance", value as RiskTolerance)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={RiskTolerance.LOW}>
                                    <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            Low
                                        </Badge>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Conservative with capital preservation</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value={RiskTolerance.MEDIUM}>
                                    <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            Medium
                                        </Badge>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Balanced risk and reward</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value={RiskTolerance.HIGH}>
                                    <div className="flex items-center">
                                        <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                            High
                                        </Badge>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Aggressive with higher volatility</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Trading Pairs */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="trading-pairs" className="text-base font-medium">
                                Trading Pairs
                            </Label>
                            <div className="text-sm text-muted-foreground">
                                {formData.trading_pairs.length} selected
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Input
                                id="pair-input"
                                placeholder="Add trading pair (e.g., ETH/USDT)"
                                value={pairInputValue}
                                onChange={(e) => setPairInputValue(e.target.value)}
                                className="flex-1"
                            />
                            <Button onClick={handleAddPair} type="button" variant="outline">
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {formData.trading_pairs.map((pair) => (
                                <Badge
                                    key={pair}
                                    variant={selectedPair === pair ? "default" : "outline"}
                                    className="px-3 py-1 cursor-pointer"
                                    onClick={() => setSelectedPair(pair)}
                                >
                                    {pair}
                                    <button
                                        className="ml-2 text-xs hover:text-red-500 dark:hover:text-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemovePair(pair);
                                        }}
                                    >
                                        ×
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Strategy Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium">
                            Strategy Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your strategy goals and objectives..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* Advanced Settings (Constraints) */}
                    <div className="space-y-2">
                        <Label htmlFor="constraints" className="text-base font-medium flex items-center">
                            Advanced Settings
                            <Badge className="ml-2 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                                Optional
                            </Badge>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
                            <div>
                                <Label htmlFor="max-position">Max Position Size (%)</Label>
                                <Input
                                    id="max-position"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={formData.constraints?.max_position_size ? formData.constraints.max_position_size * 100 : 50}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value) / 100;
                                        setFormData(prev => ({
                                            ...prev,
                                            constraints: {
                                                ...prev.constraints,
                                                max_position_size: value
                                            }
                                        }));
                                    }}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="min-profit">Min Profit Target (%)</Label>
                                <Input
                                    id="min-profit"
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={formData.constraints?.min_profit_target || 2.0}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        setFormData(prev => ({
                                            ...prev,
                                            constraints: {
                                                ...prev.constraints,
                                                min_profit_target: value
                                            }
                                        }));
                                    }}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="sm:w-auto w-full order-1 sm:order-none"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || formData.trading_pairs.length === 0}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white sm:w-auto w-full"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Cpu className="mr-2 h-4 w-4" />
                                Generate AI Strategy
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateStrategyModal;