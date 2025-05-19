"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    BarChart2,
    Activity,
    Clock,
    MessageSquare,
    Zap,
    ChevronRight,
    ChevronRightCircle,
    Plus,
    ArrowRight,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

// More sophisticated card component with hover interactions
const UseCaseCard = ({
    useCase,
    isInView,
    delay,
    isExpanded,
    setExpandedId,
    expandedId
}: {
    useCase: {
        id: string;
        title: string;
        description: string;
        longDescription: string;
        icon: any;
        color: string;
        benefits: string[];
    };
    isInView: boolean;
    delay: number;
    isExpanded: boolean;
    setExpandedId: (id: string | null) => void;
    expandedId: string | null;
}) => {
    const Icon = useCase.icon;

    // Advanced color mappings with sophisticated gradients
    const colorMappings: Record<string, Record<string, string>> = {
        "blue": {
            primary: "text-blue-600 dark:text-blue-400",
            secondary: "text-blue-700 dark:text-blue-300",
            accent: "bg-blue-500",
            gradient: "from-blue-500 via-blue-600 to-blue-700",
            darkGradient: "dark:from-blue-500/20 dark:via-blue-600/20 dark:to-blue-700/10",
            iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
            iconRing: "ring-blue-400/20 dark:ring-blue-400/10",
            hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
            shadow: "shadow-blue-500/10",
            buttonGradient: "bg-gradient-to-r from-blue-500 to-blue-600"
        },
        "purple": {
            primary: "text-purple-600 dark:text-purple-400",
            secondary: "text-purple-700 dark:text-purple-300",
            accent: "bg-purple-500",
            gradient: "from-purple-500 via-purple-600 to-purple-700",
            darkGradient: "dark:from-purple-500/20 dark:via-purple-600/20 dark:to-purple-700/10",
            iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
            iconRing: "ring-purple-400/20 dark:ring-purple-400/10",
            hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
            shadow: "shadow-purple-500/10",
            buttonGradient: "bg-gradient-to-r from-purple-500 to-purple-600"
        },
        "green": {
            primary: "text-green-600 dark:text-green-400",
            secondary: "text-green-700 dark:text-green-300",
            accent: "bg-green-500",
            gradient: "from-green-500 via-green-600 to-green-700",
            darkGradient: "dark:from-green-500/20 dark:via-green-600/20 dark:to-green-700/10",
            iconBg: "bg-green-500/10 dark:bg-green-500/20",
            iconRing: "ring-green-400/20 dark:ring-green-400/10",
            hover: "hover:bg-green-50 dark:hover:bg-green-900/20",
            shadow: "shadow-green-500/10",
            buttonGradient: "bg-gradient-to-r from-green-500 to-green-600"
        },
        "amber": {
            primary: "text-amber-600 dark:text-amber-400",
            secondary: "text-amber-700 dark:text-amber-300",
            accent: "bg-amber-500",
            gradient: "from-amber-500 via-amber-600 to-amber-700",
            darkGradient: "dark:from-amber-500/20 dark:via-amber-600/20 dark:to-amber-700/10",
            iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
            iconRing: "ring-amber-400/20 dark:ring-amber-400/10",
            hover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
            shadow: "shadow-amber-500/10",
            buttonGradient: "bg-gradient-to-r from-amber-500 to-amber-600"
        },
        "red": {
            primary: "text-red-600 dark:text-red-400",
            secondary: "text-red-700 dark:text-red-300",
            accent: "bg-red-500",
            gradient: "from-red-500 via-red-600 to-red-700",
            darkGradient: "dark:from-red-500/20 dark:via-red-600/20 dark:to-red-700/10",
            iconBg: "bg-red-500/10 dark:bg-red-500/20",
            iconRing: "ring-red-400/20 dark:ring-red-400/10",
            hover: "hover:bg-red-50 dark:hover:bg-red-900/20",
            shadow: "shadow-red-500/10",
            buttonGradient: "bg-gradient-to-r from-red-500 to-red-600"
        },
        "indigo": {
            primary: "text-indigo-600 dark:text-indigo-400",
            secondary: "text-indigo-700 dark:text-indigo-300",
            accent: "bg-indigo-500",
            gradient: "from-indigo-500 via-indigo-600 to-indigo-700",
            darkGradient: "dark:from-indigo-500/20 dark:via-indigo-600/20 dark:to-indigo-700/10",
            iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
            iconRing: "ring-indigo-400/20 dark:ring-indigo-400/10",
            hover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
            shadow: "shadow-indigo-500/10",
            buttonGradient: "bg-gradient-to-r from-indigo-500 to-indigo-600"
        },
    };

    const styles = colorMappings[useCase.color];

    const toggleExpand = () => {
        if (isExpanded) {
            setExpandedId(null);
        } else {
            setExpandedId(useCase.id);
        }
    };

    return (
        <motion.div
            layout
            className={`relative rounded-xl transition-all duration-500 backdrop-blur-sm ${isExpanded
                    ? "col-span-3 bg-white/90 dark:bg-gray-900/90 shadow-xl border-0"
                    : "bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/30 shadow-md"
                } ${styles.shadow} ${expandedId && !isExpanded ? "opacity-30" : "opacity-100"}`}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: expandedId && !isExpanded ? 0.30 : 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{
                duration: 0.5,
                delay: isExpanded ? 0 : delay,
                layout: { type: "spring", damping: 25, stiffness: 120 }
            }}
            onClick={() => !isExpanded && expandedId === null && setExpandedId(useCase.id)}
            style={{
                cursor: expandedId === null ? 'pointer' : isExpanded ? 'default' : 'not-allowed',
                zIndex: isExpanded ? 50 : 10
            }}
        >
            {/* Top accent line */}
            <div className={`h-0.5 w-full ${styles.accent} rounded-t-xl`}></div>

            <div className="p-5">
                <div className="flex justify-between items-start">
                    {/* Icon container */}
                    <div className={`${styles.iconBg} rounded-lg p-3 mb-4 ring-1 ${styles.iconRing}`}>
                        <Icon className={`h-5 w-5 ${styles.primary}`} />
                    </div>

                    {expandedId === null && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: delay + 0.3 }}
                            className={`text-xs font-medium ${styles.primary} flex items-center`}
                        >
                            <span>View details</span>
                            <ChevronRightCircle className="ml-1 h-3.5 w-3.5" />
                        </motion.div>
                    )}

                    {isExpanded && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedId(null);
                            }}
                            className="h-8 w-8 p-0 rounded-full"
                        >
                            <Plus className="rotate-45 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </Button>
                    )}
                </div>

                <div>
                    <h3 className={`text-base font-semibold text-gray-900 dark:text-white mb-1.5 flex items-center ${isExpanded ? "text-lg" : ""}`}>
                        {useCase.title}
                    </h3>

                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{useCase.longDescription}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                    {useCase.benefits.map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            className="flex items-start"
                                        >
                                            <div className={`h-5 w-5 rounded-full ${styles.iconBg} flex-shrink-0 flex items-center justify-center mt-0.5 mr-2`}>
                                                <CheckIcon className={`h-3 w-3 ${styles.primary}`} />
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-start">
                                    <Button
                                        className={`${styles.buttonGradient} text-white shadow-md shadow-gray-900/5`}
                                        size="sm"
                                    >
                                        <span>Explore this strategy</span>
                                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.p
                                key="collapsed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2"
                            >
                                {useCase.description}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

// Simple check icon component
const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const UseCasesSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const useCases = [
        {
            id: "trend-following",
            title: "Trend Following Strategies",
            description: "Leverage AI to identify and capitalize on market trends with adaptive entry and exit points.",
            longDescription: "Our AI system identifies and capitalizes on established market trends across timeframes. Using a proprietary combination of machine learning and technical indicators, it identifies trend inception points earlier than traditional methods, maximizing profit potential while maintaining strict risk parameters.",
            icon: TrendingUp,
            color: "blue",
            benefits: [
                "Early trend identification using pattern recognition AI",
                "Dynamic position sizing based on trend strength",
                "Automatic trailing stop adjustments",
                "Multi-timeframe confluence analysis"
            ]
        },
        {
            id: "mean-reversion",
            title: "Mean Reversion Trading",
            description: "Automatically detect overbought and oversold conditions across multiple timeframes.",
            longDescription: "Our mean reversion models identify statistical anomalies where assets have deviated significantly from their historical averages. Using advanced statistical modeling and machine learning, these strategies capitalize on the tendency of prices to revert to their mean, with intelligent entry and exit calculations.",
            icon: Activity,
            color: "purple",
            benefits: [
                "Statistical arbitrage with Bollinger Band algorithms",
                "Z-score deviation calculations for precise entries",
                "ML-enhanced volatility normalization",
                "Adaptive mean calculation across market regimes"
            ]
        },
        {
            id: "sentiment-trading",
            title: "Sentiment-Based Trading",
            description: "Analyze social media and news feeds to gauge market sentiment and make informed decisions.",
            longDescription: "Utilizing sophisticated NLP algorithms, our sentiment analysis engine processes vast amounts of social media, news, and market commentary data to gauge market sentiment in real-time. This provides early insights into potential market moves before they manifest in price action.",
            icon: MessageSquare,
            color: "green",
            benefits: [
                "Real-time social media sentiment analysis",
                "Financial news NLP processing",
                "Weighted influence metrics for key opinion leaders",
                "Contrarian indicators during extreme sentiment readings"
            ]
        },
        {
            id: "arbitrage",
            title: "Arbitrage Detection",
            description: "Identify price differences across exchanges and execute trades with minimal latency.",
            longDescription: "Our arbitrage system simultaneously monitors multiple exchanges for price discrepancies, calculating potential profit after fees and slippage. When profitable opportunities are detected, the system executes coordinated transactions with microsecond precision to capture risk-free profits.",
            icon: Zap,
            color: "amber",
            benefits: [
                "Cross-exchange price differential monitoring",
                "Triangular arbitrage for crypto markets",
                "Gas-optimized execution for DeFi platforms",
                "Slippage prediction and mitigation"
            ]
        },
        {
            id: "volatility",
            title: "Volatility Trading",
            description: "Adapt to changing market conditions by dynamically adjusting strategy parameters.",
            longDescription: "Volatility-focused strategies that profit regardless of market direction. By measuring and analyzing volatility patterns, our systems can anticipate volatility expansions and contractions, deploying specialized techniques like volatility breakouts, range trading, and options-inspired synthetic positions.",
            icon: BarChart2,
            color: "red",
            benefits: [
                "Volatility regime classification and prediction",
                "ATR-based dynamic position sizing",
                "Volatility surface modeling",
                "Statistical volatility arbitrage across correlated assets"
            ]
        },
        {
            id: "time-based",
            title: "Time-Based Strategies",
            description: "Implement scheduled trading patterns based on historical time-series analysis.",
            longDescription: "Our chronological analysis engine identifies recurring patterns based on time-of-day, day-of-week, and seasonal factors. By analyzing terabytes of historical data, we identify statistically significant time-based patterns that provide edges in various market conditions.",
            icon: Clock,
            color: "indigo",
            benefits: [
                "Day-of-week statistical edge analysis",
                "Pre/post market hours volatility trading",
                "Seasonal pattern recognition",
                "Time-based correlation analysis between assets"
            ]
        },
    ];

    return (
        <section
            id="use-cases"
            ref={ref}
            className="py-16 md:py-20 relative"
        >
            {/* Sophisticated abstract background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 opacity-90"></div>

                {/* Abstract background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{
                            backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                    ></div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 dark:opacity-10">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="rgba(99, 102, 241, 0.1)" d="M47.6,-61.8C62.3,-56.5,75.4,-43.8,81.2,-28.3C87,-12.8,85.6,5.5,79.1,21.5C72.6,37.5,61.2,51.3,47.2,59.4C33.3,67.5,16.6,69.9,0.7,69C-15.1,68.1,-30.2,63.9,-40.5,54.9C-50.8,45.8,-56.4,31.8,-62.3,17C-68.3,2.3,-74.7,-13.2,-70.8,-26.5C-66.9,-39.8,-52.5,-51,-38.4,-56.5C-24.2,-62,-12.1,-61.8,2.1,-64.5C16.3,-67.2,32.6,-67.1,47.6,-61.8Z" transform="translate(120 120) scale(1.5)" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-full opacity-20 dark:opacity-10 transform rotate-180">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="rgba(139, 92, 246, 0.1)" d="M47.6,-61.8C62.3,-56.5,75.4,-43.8,81.2,-28.3C87,-12.8,85.6,5.5,79.1,21.5C72.6,37.5,61.2,51.3,47.2,59.4C33.3,67.5,16.6,69.9,0.7,69C-15.1,68.1,-30.2,63.9,-40.5,54.9C-50.8,45.8,-56.4,31.8,-62.3,17C-68.3,2.3,-74.7,-13.2,-70.8,-26.5C-66.9,-39.8,-52.5,-51,-38.4,-56.5C-24.2,-62,-12.1,-61.8,2.1,-64.5C16.3,-67.2,32.6,-67.1,47.6,-61.8Z" transform="translate(120 120) scale(1.5)" />
                        </svg>
                    </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50 dark:from-gray-900 dark:via-transparent dark:to-gray-900 opacity-80"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm text-blue-700 dark:text-blue-300 font-medium text-xs mb-4">
                        <Activity className="mr-2 h-4 w-4" />
                        Strategic Applications
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Advanced Trading Applications
                    </h2>

                    <div className="mt-4 relative">
                        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto relative z-10">
                            Discover how our AI Strategy Lab enables institutional-grade trading across multiple strategy classes.
                        </p>

                        {/* Accent line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </div>

                {/* Use Cases Grid with interactive expanding cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard
                            key={useCase.id}
                            useCase={useCase}
                            isInView={isInView}
                            delay={index * 0.08}
                            isExpanded={expandedId === useCase.id}
                            setExpandedId={setExpandedId}
                            expandedId={expandedId}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    {/* Advanced button styling with light beam effect */}
                    <div className="relative inline-block group">
                        {/* Animated gradient glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Light beam effect */}
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <div className="absolute h-10 w-40 bg-white/30 -rotate-45 transform -translate-x-36 -translate-y-8 animate-[sweep_3s_ease-in-out_infinite]"></div>
                        </div>

                        <Button
                            size="lg"
                            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg border-0 z-10 px-8"
                            asChild
                        >
                            <Link href="/dashboard">
                                Explore Platform <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">
                        Institutional-grade strategies with a user-friendly interface.
                    </p>
                </motion.div>
            </div>

            {/* Add keyframes for light beam animation */}
            <style jsx global>{`
                @keyframes sweep {
                    0% {
                        transform: translate(-100%, -100%) rotate(-45deg);
                    }
                    50% {
                        transform: translate(100%, 100%) rotate(-45deg);
                    }
                    100% {
                        transform: translate(-100%, -100%) rotate(-45deg);
                    }
                }
            `}</style>
        </section>
    );
};

export default UseCasesSection;


// "use client";

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//     TrendingUp,
//     BarChart2,
//     Activity,
//     Clock,
//     MessageSquare,
//     Zap,
//     ChevronRight
// } from "lucide-react";
// import Link from "next/link";

// // Create the component for each use case card
// const UseCaseCard = ({ icon: Icon, title, description, color, isInView, delay }: {
//     icon: any;
//     title: string;
//     description: string;
//     color: string;
//     isInView: boolean;
//     delay: number;
// }) => {
//     return (
//         <motion.div
//             className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.5, delay }}
//         >
//             <div className={`h-2 ${color}`}></div>
//             <div className="p-6">
//                 <div className={`w-12 h-12 rounded-full ${color} bg-opacity-20 dark:bg-opacity-20 flex items-center justify-center mb-4`}>
//                     <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-').replace('/20', '')}`} />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300">{description}</p>
//             </div>
//         </motion.div>
//     );
// };

// const UseCasesSection = () => {
//     const ref = useRef<HTMLDivElement>(null);
//     const isInView = useInView(ref, { once: true, amount: 0.1 });

//     const useCases = [
//         {
//             title: "Trend Following Strategies",
//             description: "Leverage AI to identify and capitalize on market trends with adaptive entry and exit points.",
//             icon: TrendingUp,
//             color: "bg-blue-500/20",
//         },
//         {
//             title: "Mean Reversion Trading",
//             description: "Automatically detect overbought and oversold conditions across multiple timeframes.",
//             icon: Activity,
//             color: "bg-purple-500/20",
//         },
//         {
//             title: "Sentiment-Based Trading",
//             description: "Analyze social media and news feeds to gauge market sentiment and make informed decisions.",
//             icon: MessageSquare,
//             color: "bg-green-500/20",
//         },
//         {
//             title: "Arbitrage Detection",
//             description: "Identify price differences across exchanges and execute trades with minimal latency.",
//             icon: Zap,
//             color: "bg-amber-500/20",
//         },
//         {
//             title: "Volatility Trading",
//             description: "Adapt to changing market conditions by dynamically adjusting strategy parameters.",
//             icon: BarChart2,
//             color: "bg-red-500/20",
//         },
//         {
//             title: "Time-Based Strategies",
//             description: "Implement scheduled trading patterns based on historical time-series analysis.",
//             icon: Clock,
//             color: "bg-indigo-500/20",
//         },
//     ];

//     return (
//         <section
//             id="use-cases"
//             ref={ref}
//             className="py-20 bg-gray-50 dark:bg-gray-900/50"
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <div className="max-w-3xl mx-auto text-center mb-16">
//                     <span className="text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wider uppercase">
//                         Applications
//                     </span>
//                     <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//                         Trading Use Cases
//                     </h2>
//                     <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
//                         Explore how the AI Strategy Lab can optimize various trading approaches
//                     </p>
//                 </div>

//                 {/* Use Cases Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {useCases.map((useCase, index) => (
//                         <UseCaseCard
//                             key={index}
//                             icon={useCase.icon}
//                             title={useCase.title}
//                             description={useCase.description}
//                             color={useCase.color}
//                             isInView={isInView}
//                             delay={index * 0.1}
//                         />
//                     ))}
//                 </div>

//                 {/* Call to Action */}
//                 <motion.div
//                     className="mt-16 text-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                     transition={{ duration: 0.5, delay: 0.6 }}
//                 >
//                     <Button
//                         size="lg"
//                         className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
//                         asChild
//                     >
//                         <Link href="/dashboard">
//                             Start Building Your Strategy <ChevronRight className="ml-2 h-5 w-5" />
//                         </Link>
//                     </Button>

//                     <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//                         No coding required. Start with a template or build from scratch.
//                     </p>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default UseCasesSection;