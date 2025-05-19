// "use client";

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import {
//     Brain,
//     BarChart2,
//     RefreshCw,
//     Zap,
//     ShieldCheck,
//     Cpu,
//     Network
// } from "lucide-react";

// const FeaturesSection = () => {
//     const ref = useRef<HTMLDivElement>(null);
//     const isInView = useInView(ref, { once: true, amount: 0.2 });

//     const features = [
//         {
//             title: "AI-Driven Strategy Generation",
//             description: "Leverage Large Language Models and RAG to create customized trading strategies based on user goals and market conditions.",
//             icon: Brain,
//             color: "from-blue-500 to-purple-500",
//         },
//         {
//             title: "Reinforcement Learning Optimization",
//             description: "Continuously refine strategies using RL for optimal performance and adaptive behavior in changing markets.",
//             icon: RefreshCw,
//             color: "from-amber-500 to-red-500",
//         },
//         {
//             title: "Multi-Agent Collaboration",
//             description: "Utilize specialized agents for data analysis, strategy optimization, and execution to make smarter decisions.",
//             icon: Network,
//             color: "from-emerald-500 to-cyan-500",
//         },
//         {
//             title: "Real-Time Execution",
//             description: "Execute strategies via OKX Swap API with real-time monitoring and low-latency WebSocket communication.",
//             icon: Zap,
//             color: "from-indigo-500 to-blue-500",
//         },
//         {
//             title: "Risk & Sentiment Analysis",
//             description: "Incorporate market sentiment and risk assessment into strategy decisions to protect your investments.",
//             icon: ShieldCheck,
//             color: "from-green-500 to-emerald-500",
//         },
//         {
//             title: "Advanced Technical Analysis",
//             description: "Built-in indicators and pattern recognition powered by machine learning for next-level technical analysis.",
//             icon: BarChart2,
//             color: "from-violet-500 to-purple-500",
//         },
//     ];

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.6, ease: "easeOut" },
//         },
//     };

//     return (
//         <section
//             id="features"
//             ref={ref}
//             className="py-20 bg-white dark:bg-gray-900"
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <div className="max-w-3xl mx-auto text-center mb-16">
//                     <span className="text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wider uppercase">
//                         Capabilities
//                     </span>
//                     <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//                         Cutting-Edge Features
//                     </h2>
//                     <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
//                         Combine the power of LLMs, RL, and real-time data to create sophisticated trading strategies.
//                     </p>
//                 </div>

//                 {/* Features Grid */}
//                 <motion.div
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate={isInView ? "visible" : "hidden"}
//                 >
//                     {features.map((feature, index) => (
//                         <motion.div
//                             key={index}
//                             variants={itemVariants}
//                             className="relative p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:shadow-xl transition-all duration-300 overflow-hidden group"
//                         >
//                             {/* Feature Icon */}
//                             <div className={`p-3 rounded-xl mb-5 inline-flex bg-gradient-to-r ${feature.color} shadow-lg`}>
//                                 <feature.icon className="h-6 w-6 text-white" />
//                             </div>

//                             {/* Feature Title & Description */}
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
//                                 {feature.title}
//                             </h3>
//                             <p className="text-gray-600 dark:text-gray-300">
//                                 {feature.description}
//                             </p>

//                             {/* Background Pattern */}
//                             <div className={`absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${feature.color}`} />

//                             {/* Animated Circuit Lines - Only appears on hover */}
//                             <svg className="absolute -right-10 -bottom-10 h-40 w-40 text-gray-900 dark:text-white opacity-0 group-hover:opacity-5 transition-opacity duration-500">
//                                 <defs>
//                                     <pattern
//                                         id={`circuit-pattern-${index}`}
//                                         patternUnits="userSpaceOnUse"
//                                         width="30"
//                                         height="30"
//                                         patternTransform="rotate(45)"
//                                     >
//                                         <line
//                                             x1="15"
//                                             y1="0"
//                                             x2="15"
//                                             y2="30"
//                                             strokeWidth="0.5"
//                                             stroke="currentColor"
//                                         />
//                                         <line
//                                             x1="0"
//                                             y1="15"
//                                             x2="30"
//                                             y2="15"
//                                             strokeWidth="0.5"
//                                             stroke="currentColor"
//                                         />
//                                     </pattern>
//                                 </defs>
//                                 <rect width="100%" height="100%" fill={`url(#circuit-pattern-${index})`} />
//                             </svg>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>

//             {/* Architecture Overview - as an extra highlight */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
//                 <motion.div
//                     className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 lg:p-12 relative"
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
//                     transition={{ delay: 0.6, duration: 0.8 }}
//                 >
//                     {/* Glow Effect */}
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30 -z-10"></div>

//                     <div className="flex flex-col lg:flex-row gap-10 items-center">
//                         <div className="lg:w-1/2">
//                             <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-200 mb-4">
//                                 <Cpu className="h-4 w-4 mr-2" />
//                                 System Architecture
//                             </div>
//                             <h3 className="text-2xl lg:text-3xl font-bold mb-4">
//                                 Powerful Tech Stack Designed for Performance
//                             </h3>
//                             <p className="text-blue-100 text-lg mb-6">
//                                 Our platform combines state-of-the-art components for maximum efficiency and reliability:
//                             </p>

//                             <ul className="space-y-3">
//                                 <li className="flex items-start">
//                                     <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 mr-3 mt-0.5">1</span>
//                                     <span><span className="font-medium">RAG Pipeline</span> for grounding strategies in historical data</span>
//                                 </li>
//                                 <li className="flex items-start">
//                                     <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 mr-3 mt-0.5">2</span>
//                                     <span><span className="font-medium">Multi-Agent Framework</span> (Autogen) for collaborative decision-making</span>
//                                 </li>
//                                 <li className="flex items-start">
//                                     <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 mr-3 mt-0.5">3</span>
//                                     <span><span className="font-medium">Reinforcement Learning</span> for parameter optimization</span>
//                                 </li>
//                                 <li className="flex items-start">
//                                     <span className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-200 mr-3 mt-0.5">4</span>
//                                     <span><span className="font-medium">WebSocket-based</span> real-time communication system</span>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Architecture Diagram - Stylized Visualization */}
//                         <div className="lg:w-1/2 relative">
//                             <div className="relative bg-black/20 rounded-xl p-6 border border-blue-500/30">
//                                 <div className="grid grid-cols-3 gap-4">
//                                     {/* Component Boxes */}
//                                     {[
//                                         { label: "LLM Core", color: "bg-purple-500" },
//                                         { label: "RAG System", color: "bg-blue-500" },
//                                         { label: "Autogen", color: "bg-green-500" },
//                                         { label: "RL Engine", color: "bg-amber-500" },
//                                         { label: "WebSockets", color: "bg-red-500" },
//                                         { label: "OKX API", color: "bg-indigo-500" },
//                                     ].map((box, index) => (
//                                         <motion.div
//                                             key={index}
//                                             className={`${box.color} p-3 rounded-lg text-center text-white text-sm shadow-lg`}
//                                             initial={{ opacity: 0, scale: 0.8 }}
//                                             animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//                                             transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
//                                         >
//                                             {box.label}
//                                         </motion.div>
//                                     ))}
//                                 </div>

//                                 {/* Connection Lines */}
//                                 <svg
//                                     className="absolute top-0 left-0 w-full h-full"
//                                     viewBox="0 0 400 200"
//                                     fill="none"
//                                 >
//                                     <motion.path
//                                         d="M70,50 L200,100 L330,50"
//                                         stroke="rgba(59, 130, 246, 0.5)"
//                                         strokeWidth="2"
//                                         initial={{ pathLength: 0 }}
//                                         animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
//                                         transition={{ delay: 1.2, duration: 1 }}
//                                     />
//                                     <motion.path
//                                         d="M70,150 L200,100 L330,150"
//                                         stroke="rgba(59, 130, 246, 0.5)"
//                                         strokeWidth="2"
//                                         initial={{ pathLength: 0 }}
//                                         animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
//                                         transition={{ delay: 1.4, duration: 1 }}
//                                     />
//                                     <motion.path
//                                         d="M70,50 L70,150"
//                                         stroke="rgba(59, 130, 246, 0.5)"
//                                         strokeWidth="2"
//                                         initial={{ pathLength: 0 }}
//                                         animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
//                                         transition={{ delay: 1.6, duration: 0.7 }}
//                                     />
//                                     <motion.path
//                                         d="M330,50 L330,150"
//                                         stroke="rgba(59, 130, 246, 0.5)"
//                                         strokeWidth="2"
//                                         initial={{ pathLength: 0 }}
//                                         animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
//                                         transition={{ delay: 1.6, duration: 0.7 }}
//                                     />
//                                 </svg>

//                                 {/* Data Flow Particles */}
//                                 {[1, 2, 3, 4].map((_, i) => (
//                                     <motion.div
//                                         key={i}
//                                         className="absolute h-2 w-2 rounded-full bg-blue-400"
//                                         initial={{ top: "50%", left: "60%", opacity: 0 }}
//                                         animate={isInView ? {
//                                             top: ["50%", "25%", "25%", "75%", "75%", "50%"],
//                                             left: ["60%", "60%", "20%", "20%", "80%", "60%"],
//                                             opacity: [0, 1, 1, 1, 1, 0],
//                                         } : {}}
//                                         transition={{
//                                             duration: 5,
//                                             delay: i * 1.5,
//                                             repeat: Infinity,
//                                             repeatDelay: 2,
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default FeaturesSection;

"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    BarChart2,
    RefreshCw,
    Zap,
    ShieldCheck,
    Network,
    Bitcoin,
    ArrowRight,
    LineChart,
    Cpu
} from 'lucide-react';

// Define TypeScript interfaces
interface Feature {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    benefits: string[];
    color: string;
    gradient: string;
    accentColor: string;
}

const FeaturesTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('ai-strategy');
    const [userInteracted, setUserInteracted] = useState<boolean>(false);
    const [animationProgress, setAnimationProgress] = useState<number>(0);
    const autoRotateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationRef = useRef<number>(0);
    const autoRotateDelayMs = 5000; // 5 seconds

    const features: Feature[] = [
        {
            id: 'ai-strategy',
            title: 'AI Strategy Generation',
            icon: <Brain size={24} />,
            description: 'Create customized trading strategies powered by Large Language Models and Retrieval-Augmented Generation.',
            benefits: [
                'Leverage GPT-4 and Llama-3 for intelligent strategy creation',
                'Generate strategies based on your specific goals and risk profile',
                'Seamless integration with historical market data',
                'Natural language interface for strategy development'
            ],
            color: '#3B82F6', // blue-500
            gradient: 'from-blue-500/20 to-blue-700/10',
            accentColor: 'border-blue-500/30'
        },
        {
            id: 'rl-optimization',
            title: 'Reinforcement Learning',
            icon: <RefreshCw size={24} />,
            description: 'Continuously refine strategies through adaptive reinforcement learning for optimal performance.',
            benefits: [
                'Dynamic parameter optimization in real-time',
                'Machine learning models that adapt to changing market conditions',
                'Backtest-driven strategy refinement',
                'Automated performance improvements without manual intervention'
            ],
            color: '#F97316', // orange-500
            gradient: 'from-orange-500/20 to-amber-700/10',
            accentColor: 'border-orange-500/30'
        },
        {
            id: 'multi-agent',
            title: 'Multi-Agent Collaboration',
            icon: <Network size={24} />,
            description: 'Specialized AI agents working together for data analysis, optimization and execution decision-making.',
            benefits: [
                'Team of specialized AI agents collaborating on your strategy',
                'Data analysis agents for market insight extraction',
                'Execution agents for optimal trade timing',
                'Risk management agents for portfolio protection'
            ],
            color: '#10B981', // emerald-500
            gradient: 'from-emerald-500/20 to-emerald-700/10',
            accentColor: 'border-emerald-500/30'
        },
        {
            id: 'real-time',
            title: 'Real-Time Execution',
            icon: <Zap size={24} />,
            description: 'Execute strategies with minimal latency via WebSockets and the OKX Swap API for lightning-fast trades.',
            benefits: [
                'Low-latency WebSocket communication for instant data',
                'Direct OKX Swap API integration for execution',
                'Real-time performance monitoring dashboard',
                'Microsecond trade execution capabilities'
            ],
            color: '#8B5CF6', // purple-500
            gradient: 'from-purple-500/20 to-purple-700/10',
            accentColor: 'border-purple-500/30'
        },
        {
            id: 'risk-sentiment',
            title: 'Risk & Sentiment Analysis',
            icon: <ShieldCheck size={24} />,
            description: 'Protect your investments with advanced risk management and real-time market sentiment analysis.',
            benefits: [
                'NLP-powered social media and news feed analysis',
                'Real-time risk assessment across all positions',
                'Automated stop-loss and take-profit optimizations',
                'Early warning system for market volatility'
            ],
            color: '#EC4899', // pink-500
            gradient: 'from-pink-500/20 to-pink-700/10',
            accentColor: 'border-pink-500/30'
        },
        {
            id: 'technical-analysis',
            title: 'Advanced Technical Analysis',
            icon: <BarChart2 size={24} />,
            description: 'Next-generation technical analysis with machine learning pattern recognition on any timeframe.',
            benefits: [
                'Pattern recognition powered by machine learning',
                'Custom indicator development and testing',
                'Multi-timeframe analysis for comprehensive insight',
                'Automated support/resistance identification'
            ],
            color: '#6366F1', // indigo-500
            gradient: 'from-indigo-500/20 to-indigo-700/10',
            accentColor: 'border-indigo-500/30'
        }
    ];

    // Start animation loop
    useEffect(() => {
        const animate = () => {
            setAnimationProgress((prev) => {
                if (prev >= 100) return 0;
                // Adjust speed for smoother animation
                return prev + 100 / ((autoRotateDelayMs / 1000) * 60);
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [autoRotateDelayMs]);

    // Setup auto-rotation
    useEffect(() => {
        // Simple interval that runs continuously
        const autoRotateInterval = setInterval(() => {
            // Skip auto-rotation if user just interacted
            if (userInteracted) {
                return;
            }

            // Find next tab and rotate to it
            const currentIndex = features.findIndex(f => f.id === activeTab);
            const nextIndex = (currentIndex + 1) % features.length;
            setActiveTab(features[nextIndex].id);
            setAnimationProgress(0);
        }, autoRotateDelayMs);

        // Clean up on unmount
        return () => clearInterval(autoRotateInterval);
    }, [activeTab, features, autoRotateDelayMs, userInteracted]);


    const handleTabChange = (tabId: string) => {
        setUserInteracted(true);
        setActiveTab(tabId);
        setAnimationProgress(0);

        // Reset userInteracted after delay to resume auto-rotation
        setTimeout(() => {
            setUserInteracted(false);
        }, autoRotateDelayMs * 2);
    };

    const activeFeature = features.find(f => f.id === activeTab) || features[0];

    // Background Elements Component
    const BackgroundElements = ({ animationProgress }: { animationProgress: number }) => (
        <>
            {/* Abstract background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div
                    className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-blue-500/10"
                ></div>
                <div
                    className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-purple-500/10"
                ></div>
                <div className="absolute -top-20 right-[20%] w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0.5px, transparent 0.5px)",
                        backgroundSize: "20px 20px"
                    }}
                ></div>

                {/* Dynamic beam elements */}
                <motion.div
                    className="absolute h-0.5 w-full top-1/3 bg-gradient-to-r from-transparent via-blue-300/10 dark:via-blue-500/10 to-transparent"
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                ></motion.div>
                <motion.div
                    className="absolute h-0.5 w-full bottom-1/3 bg-gradient-to-r from-transparent via-purple-300/10 dark:via-purple-500/10 to-transparent"
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                ></motion.div>
            </div>
        </>
    );

    return (
        <section id="features" className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 from-gray-50 to-white border-y dark:border-gray-800/50 border-gray-200/70">
            <BackgroundElements animationProgress={animationProgress} />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-white group">
                        Cutting-Edge <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Features</span>
                        <span className="inline-block w-12 h-1 ml-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform translate-y-1"></span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                        Combine the power of LLMs, Reinforcement Learning, and real-time data
                        to create sophisticated trading strategies.
                    </p>
                </div>

                {/* Features Tabs */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                    {features.map((feature) => (
                        <motion.button
                            key={feature.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTabChange(feature.id)}
                            className={`flex items-center px-3 py-2 rounded-lg border transition-all ${activeTab === feature.id
                                ? `bg-gradient-to-r ${feature.gradient} ${feature.accentColor} shadow-md`
                                : 'dark:bg-gray-800/40 dark:border-gray-700/50 dark:hover:bg-gray-800 dark:hover:border-gray-600 bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300'
                                }`}
                        >
                            <span
                                className={`${activeTab === feature.id ? `text-[${feature.color}]` : 'dark:text-gray-400 text-gray-500'}`}
                                style={{ color: activeTab === feature.id ? feature.color : '' }}
                            >
                                {feature.icon}
                            </span>
                            <span className={`ml-2 font-medium text-sm ${activeTab === feature.id ? 'dark:text-white text-gray-800' : 'dark:text-gray-300 text-gray-600'
                                }`}>
                                {feature.title}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Feature Content with AnimatePresence */}
                <div className="relative min-h-[320px] md:min-h-[280px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10, position: 'absolute', width: '100%' }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4"
                        >
                            {/* Feature Illustration Card */}
                            <div className="md:col-span-4 flex justify-center">
                                <div
                                    style={{
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 20px, rgba(0, 0, 0, 0.05) 0px 1px 5px'
                                    }}
                                    className="relative w-full h-56 md:h-full rounded-xl overflow-hidden backdrop-blur-sm">
                                    {/* Card border glow effect */}
                                    <div
                                        className="absolute inset-px rounded-xl z-0 bg-gradient-to-br dark:from-gray-700/40 dark:via-gray-700/10 dark:to-gray-700/40 from-gray-300/50 via-white/20 to-gray-300/50 opacity-70"
                                        style={{
                                            boxShadow: `0 0 30px 0px rgba(59, 130, 246, 0.08)`,
                                            border: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}
                                    ></div>

                                    {/* Card main background */}
                                    <div className="absolute inset-0 bg-gradient-to-br dark:from-gray-800/80 dark:to-gray-900/80 from-white/80 to-gray-100/80 backdrop-blur-sm"></div>

                                    {/* Icon animation */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Radiating circles */}
                                        <div className="absolute w-40 h-40">
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}10 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite',
                                                    transform: `scale(${1 + Math.sin(animationProgress / 100 * Math.PI) * 0.1})`
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-4 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}15 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite 0.5s',
                                                    transform: `scale(${1 + Math.cos(animationProgress / 100 * Math.PI) * 0.15})`
                                                }}
                                            ></div>
                                            <div
                                                className="absolute inset-8 rounded-full"
                                                style={{
                                                    background: `radial-gradient(circle, ${activeFeature.color}20 0%, transparent 70%)`,
                                                    animation: 'pulse 4s infinite 1s',
                                                    transform: `scale(${1 + Math.sin(animationProgress / 100 * Math.PI + 1) * 0.2})`
                                                }}
                                            ></div>
                                        </div>

                                        {/* Floating icon */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                opacity: 1,
                                                y: [0, -3, 0, 3, 0],
                                                rotate: [0, -2, 0, 2, 0],
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                repeatType: "mirror"
                                            }}
                                            className="relative z-10"
                                        >
                                            <div
                                                className="h-16 w-16 flex items-center justify-center rounded-full"
                                                style={{
                                                    background: `linear-gradient(135deg, ${activeFeature.color}30, ${activeFeature.color}10)`,
                                                    boxShadow: `0 0 20px 0px ${activeFeature.color}20`,
                                                    border: `1px solid ${activeFeature.color}30`
                                                }}
                                            >
                                                <span className="text-3xl" style={{ color: activeFeature.color }}>
                                                    {activeFeature.icon}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Orbiting Crypto/Tech Icon */}
                                        <motion.div
                                            className="absolute h-8 w-8 z-10"
                                            animate={{
                                                rotate: 360,
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{
                                                transformOrigin: "40px 40px"
                                            }}
                                        >
                                            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500/20">
                                                <Cpu size={16} className="text-blue-500" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Light beam effects */}
                                    <div
                                        className="absolute h-40 w-1 bg-gradient-to-b from-transparent dark:via-blue-500/10 via-blue-500/5 to-transparent blur-sm"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${animationProgress * 3.6}deg)`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute h-40 w-1 bg-gradient-to-b from-transparent dark:via-purple-500/10 via-purple-500/5 to-transparent blur-sm"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(-50%, -50%) rotate(${(animationProgress * 3.6) + 90}deg)`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Feature Details */}
                            <div className="md:col-span-8">
                                <div
                                    className="h-full rounded-xl p-5 bg-gradient-to-br dark:from-gray-800/60 dark:to-gray-900/60 from-white/60 to-gray-50/60 backdrop-blur-sm border dark:border-gray-700/30 border-gray-200/60"
                                    style={{
                                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 20px, rgba(0, 0, 0, 0.05) 0px 1px 5px'
                                    }}
                                >
                                    <h3
                                        className="text-lg font-bold mb-2.5 flex items-center"
                                        style={{ color: activeFeature.color }}
                                    >
                                        {activeFeature.icon}
                                        <span className="ml-2 dark:text-white text-gray-800">{activeFeature.title}</span>
                                    </h3>

                                    <p className="dark:text-gray-300 text-gray-600 text-sm mb-4 leading-relaxed">
                                        {activeFeature.description}
                                    </p>

                                    <div className="space-y-2">
                                        {activeFeature.benefits.map((benefit, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + (index * 0.05) }}
                                                className="flex items-start"
                                            >
                                                <div className="flex-shrink-0 mt-1">
                                                    <div
                                                        className="w-3 h-3 rounded-full flex items-center justify-center"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${activeFeature.color}, ${activeFeature.color}80)`,
                                                            boxShadow: `0 0 5px 0px ${activeFeature.color}40`
                                                        }}
                                                    >
                                                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="ml-2.5 dark:text-gray-300 text-gray-600 text-sm">{benefit}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="mt-5 pt-4 border-t dark:border-gray-700/30 border-gray-200/60">
                                        <a
                                            href="#dashboard"
                                            className="inline-flex items-center text-xs font-medium hover:opacity-80 transition-opacity"
                                            style={{ color: activeFeature.color }}
                                        >
                                            Learn more about {activeFeature.title.toLowerCase()}
                                            <ArrowRight className="w-3 h-3 ml-1.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress indicator */}
                <div className="mt-6 flex justify-center">
                    <div className="flex space-x-1.5">
                        {features.map((feature, index) => (
                            <button
                                key={index}
                                onClick={() => handleTabChange(feature.id)}
                                className="focus:outline-none"
                                aria-label={`Switch to ${feature.title}`}
                            >
                                <div className="h-1 rounded-full overflow-hidden transition-all duration-300" style={{ width: activeTab === feature.id ? '28px' : '12px' }}>
                                    <div
                                        className={activeTab === feature.id ? 'h-full' : 'h-full dark:bg-gray-600 bg-gray-300'}
                                        style={{
                                            background: activeTab === feature.id ? `linear-gradient(90deg, ${feature.color}, ${feature.color}80)` : '',
                                        }}
                                    >
                                        {activeTab === feature.id && (
                                            <motion.div
                                                className="h-full bg-white/0"
                                                style={{
                                                    width: `${100 - animationProgress}%`,
                                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.4))'
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <motion.a
                        href="#dashboard"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20 transition-all text-sm"
                    >
                        <LineChart className="mr-2 h-4 w-4" />
                        Start Building Your Strategy
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default FeaturesTabs;