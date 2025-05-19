// // "use client";

// // import { useEffect, useRef } from "react";
// // import Link from "next/link";
// // import { motion, useAnimation, useInView } from "framer-motion";
// // import { ArrowRight, ChevronRight, TrendingUp, BarChart, RefreshCw } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useWebSocket } from "@/hooks/useWebSocket";

// // // Define type for real-time price data
// // interface PriceData {
// //     symbol: string;
// //     price: number;
// //     change: number;
// // }

// // const HeroSection = () => {
// //     const ref = useRef<HTMLDivElement>(null);
// //     const isInView = useInView(ref, { once: true, amount: 0.3 });
// //     const controls = useAnimation();

// //     // Demo WebSocket connection for the hero section
// //     const { data: priceData, isConnected } = useWebSocket<PriceData[]>("ws://localhost:8000/ws/market_data");

// //     useEffect(() => {
// //         if (isInView) {
// //             controls.start("visible");
// //         }
// //     }, [controls, isInView]);

// //     // Animation variants
// //     const containerVariants = {
// //         hidden: { opacity: 0 },
// //         visible: {
// //             opacity: 1,
// //             transition: {
// //                 staggerChildren: 0.2,
// //                 delayChildren: 0.1,
// //             },
// //         },
// //     };

// //     const itemVariants = {
// //         hidden: { opacity: 0, y: 20 },
// //         visible: {
// //             opacity: 1,
// //             y: 0,
// //             transition: { type: "spring", stiffness: 100, damping: 15 },
// //         },
// //     };

// //     // Particles for the background effect
// //     const particles = Array.from({ length: 40 }, (_, i) => i);

// //     return (
// //         <section
// //             ref={ref}
// //             className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900"
// //         >
// //             {/* Background particles */}
// //             {particles.map((i) => (
// //                 <motion.div
// //                     key={i}
// //                     className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
// //                     style={{
// //                         width: Math.random() * 60 + 10,
// //                         height: Math.random() * 60 + 10,
// //                         top: `${Math.random() * 100}%`,
// //                         left: `${Math.random() * 100}%`,
// //                     }}
// //                     animate={{
// //                         y: [0, Math.random() * 30 - 15],
// //                         x: [0, Math.random() * 30 - 15],
// //                         opacity: [0.1, 0.3, 0.1],
// //                     }}
// //                     transition={{
// //                         duration: 10 + Math.random() * 10,
// //                         repeat: Infinity,
// //                         repeatType: "reverse",
// //                     }}
// //                 />
// //             ))}

// //             {/* Background circuit-like lines */}
// //             <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
// //                 <svg
// //                     width="100%"
// //                     height="100%"
// //                     className="absolute top-0 left-0 text-blue-500 dark:text-blue-400 opacity-30"
// //                 >
// //                     <pattern
// //                         id="hero-pattern"
// //                         x="0"
// //                         y="0"
// //                         width="100"
// //                         height="100"
// //                         patternUnits="userSpaceOnUse"
// //                         patternTransform="rotate(11)"
// //                     >
// //                         <line
// //                             x1="0"
// //                             y1="0"
// //                             x2="100"
// //                             y2="100"
// //                             stroke="currentColor"
// //                             strokeWidth="0.8"
// //                         />
// //                     </pattern>
// //                     <rect width="100%" height="100%" fill="url(#hero-pattern)" />
// //                 </svg>
// //             </div>

// //             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
// //                 <motion.div
// //                     variants={containerVariants}
// //                     initial="hidden"
// //                     animate={controls}
// //                     className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //                 >
// //                     {/* Hero Text Content */}
// //                     <div className="text-center lg:text-left">
// //                         <motion.div variants={itemVariants}>
// //                             <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
// //                                 <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
// //                                 AI-Powered Trading
// //                             </span>
// //                         </motion.div>

// //                         <motion.h1
// //                             variants={itemVariants}
// //                             className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
// //                         >
// //                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
// //                                 AI Strategy Lab
// //                             </span>
// //                             <br />
// //                             <span className="text-gray-900 dark:text-white">
// //                                 for Crypto Trading
// //                             </span>
// //                         </motion.h1>

// //                         <motion.p
// //                             variants={itemVariants}
// //                             className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
// //                         >
// //                             Generate, optimize, and execute trading strategies using the power of
// //                             Large Language Models, Reinforcement Learning, and real-time data.
// //                         </motion.p>

// //                         <motion.div
// //                             variants={itemVariants}
// //                             className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
// //                         >
// //                             <Button
// //                                 size="lg"
// //                                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20"
// //                                 asChild
// //                             >
// //                                 <Link href="/dashboard">
// //                                     Launch App <ArrowRight className="ml-2 h-5 w-5" />
// //                                 </Link>
// //                             </Button>

// //                             <Button
// //                                 size="lg"
// //                                 variant="outline"
// //                                 className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
// //                                 asChild
// //                             >
// //                                 <Link href="#features">
// //                                     Explore Features <ChevronRight className="ml-2 h-5 w-5" />
// //                                 </Link>
// //                             </Button>
// //                         </motion.div>
// //                     </div>

// //                     {/* Hero Visualization */}
// //                     <motion.div
// //                         variants={itemVariants}
// //                         className="relative z-10 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700"
// //                     >
// //                         <div className="px-6 pt-6">
// //                             <div className="flex items-center justify-between mb-4">
// //                                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
// //                                     Live Trading Dashboard
// //                                 </h3>
// //                                 <div className="flex items-center">
// //                                     <span className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
// //                                     <span className="text-xs text-gray-500 dark:text-gray-400">
// //                                         {isConnected ? 'Connected' : 'Connecting...'}
// //                                     </span>
// //                                 </div>
// //                             </div>

// //                             {/* Demo Chart */}
// //                             <div className="relative h-64 overflow-hidden">
// //                                 {/* Animated Chart Lines */}
// //                                 <svg
// //                                     viewBox="0 0 100 20"
// //                                     className="w-full h-full stroke-blue-500 dark:stroke-blue-400 fill-none stroke-2"
// //                                     preserveAspectRatio="none"
// //                                 >
// //                                     <motion.path
// //                                         d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10"
// //                                         initial={{ pathLength: 0, opacity: 0 }}
// //                                         animate={{
// //                                             pathLength: 1,
// //                                             opacity: 1,
// //                                             d: [
// //                                                 "M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10",
// //                                                 "M0,10 Q10,15 20,10 T40,15 T60,5 T80,15 T100,10",
// //                                                 "M0,10 Q10,5 20,10 T40,5 T60,15 T80,5 T100,10",
// //                                             ]
// //                                         }}
// //                                         transition={{
// //                                             duration: 8,
// //                                             repeat: Infinity,
// //                                             repeatType: "mirror",
// //                                         }}
// //                                     />

// //                                     <motion.path
// //                                         d="M0,10 Q10,15 20,10 T40,15 T60,5 T80,15 T100,10"
// //                                         initial={{ pathLength: 0, opacity: 0 }}
// //                                         animate={{
// //                                             pathLength: 1,
// //                                             opacity: 0.5,
// //                                             d: [
// //                                                 "M0,10 Q10,15 20,10 T40,15 T60,5 T80,15 T100,10",
// //                                                 "M0,15 Q10,10 20,15 T40,5 T60,10 T80,5 T100,15",
// //                                                 "M0,5 Q10,10 20,5 T40,15 T60,5 T80,15 T100,5",
// //                                             ]
// //                                         }}
// //                                         transition={{
// //                                             duration: 10,
// //                                             repeat: Infinity,
// //                                             repeatType: "mirror",
// //                                         }}
// //                                         className="opacity-30"
// //                                     />

// //                                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //                                         <stop offset="0%" stopColor="#3B82F6" />
// //                                         <stop offset="100%" stopColor="#8B5CF6" />
// //                                     </linearGradient>
// //                                 </svg>

// //                                 {/* Simulated Signal Markers */}
// //                                 <motion.div
// //                                     className="absolute top-1/3 left-1/4 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-lg"
// //                                     initial={{ scale: 0 }}
// //                                     animate={{ scale: [0, 1.2, 1] }}
// //                                     transition={{ delay: 2, duration: 1 }}
// //                                 >
// //                                     <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-md whitespace-nowrap">
// //                                         Buy Signal
// //                                     </span>
// //                                 </motion.div>

// //                                 <motion.div
// //                                     className="absolute top-2/3 right-1/3 h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 shadow-lg"
// //                                     initial={{ scale: 0 }}
// //                                     animate={{ scale: [0, 1.2, 1] }}
// //                                     transition={{ delay: 4, duration: 1 }}
// //                                 >
// //                                     <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1 rounded-md whitespace-nowrap">
// //                                         Sell Signal
// //                                     </span>
// //                                 </motion.div>
// //                             </div>

// //                             {/* Price Tickers */}
// //                             <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
// //                                 {[
// //                                     { symbol: "BTC/USDT", price: 63487, change: 2.3 },
// //                                     { symbol: "ETH/USDT", price: 5372, change: -1.2 },
// //                                     { symbol: "SOL/USDT", price: 148, change: 4.5 },
// //                                 ].map((coin, index) => (
// //                                     <motion.div
// //                                         key={coin.symbol}
// //                                         className="text-center"
// //                                         initial={{ opacity: 0, y: 10 }}
// //                                         animate={{ opacity: 1, y: 0 }}
// //                                         transition={{ delay: 0.2 * index + 0.5 }}
// //                                     >
// //                                         <div className="text-xs text-gray-500 dark:text-gray-400">{coin.symbol}</div>
// //                                         <div className="font-medium">
// //                                             ${coin.price.toLocaleString()}
// //                                         </div>
// //                                         <div className={`text-xs ${coin.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
// //                                             {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change)}%
// //                                         </div>
// //                                     </motion.div>
// //                                 ))}
// //                             </div>
// //                         </div>

// //                         {/* Quick Action Buttons */}
// //                         <div className="bg-gray-50 dark:bg-gray-900 py-3 px-6 flex items-center justify-between">
// //                             <div className="text-xs text-gray-500 dark:text-gray-400">
// //                                 AI Strategy Lab Demo
// //                             </div>
// //                             <div className="flex space-x-2">
// //                                 <Button size="sm" variant="outline" className="h-8">
// //                                     <RefreshCw className="h-3.5 w-3.5 mr-1" />
// //                                     Refresh
// //                                 </Button>
// //                                 <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white">
// //                                     Try Demo
// //                                 </Button>
// //                             </div>
// //                         </div>
// //                     </motion.div>
// //                 </motion.div>

// //                 {/* Stats Section */}
// //                 <motion.div
// //                     initial={{ opacity: 0, y: 30 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: 1.2, duration: 0.8 }}
// //                     className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
// //                 >
// //                     {[
// //                         { label: "Trading Strategies", value: "100+", icon: TrendingUp },
// //                         { label: "Success Rate", value: "86%", icon: BarChart },
// //                         { label: "Avg. Return", value: "19.7%", icon: RefreshCw },
// //                         { label: "Decision Time", value: "<200ms", icon: RefreshCw },
// //                     ].map((stat, index) => (
// //                         <div
// //                             key={stat.label}
// //                             className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
// //                         >
// //                             <div className="absolute -top-3 -left-3 rounded-lg p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
// //                                 <stat.icon className="h-5 w-5" />
// //                             </div>
// //                             <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
// //                                 {stat.value}
// //                             </div>
// //                             <div className="text-sm text-gray-500 dark:text-gray-400">
// //                                 {stat.label}
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </motion.div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default HeroSection;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { motion, useAnimation, useInView } from "framer-motion";
// import {
//     ArrowRight,
//     ChevronRight,
//     TrendingUp,
//     BarChart,
//     RefreshCw,
//     Sparkles,
//     Zap,
//     LineChart
// } from "lucide-react";
// import { useWebSocket } from "@/hooks/useWebSocket";
// import { useTheme } from "next-themes";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

// // Define type for real-time price data
// interface PriceData {
//     symbol: string;
//     price: number;
//     change: number;
// }

// // Sample market data for when WebSocket is not connected
// const SAMPLE_MARKET_DATA = [
//     { symbol: "BTC/USDT", price: 63487, change: 2.3 },
//     { symbol: "ETH/USDT", price: 5372, change: -1.2 },
//     { symbol: "SOL/USDT", price: 148, change: 4.5 },
// ];

// const HeroSection = () => {
//     const ref = useRef<HTMLDivElement>(null);
//     const isInView = useInView(ref, { once: true, amount: 0.3 });
//     const controls = useAnimation();
//     const { theme } = useTheme();

//     // For chart animation
//     const [chartPath1, setChartPath1] = useState("M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10");
//     const [chartPath2, setChartPath2] = useState("M0,10 Q10,15 20,10 T40,15 T60,5 T80,15 T100,10");

//     // Demo WebSocket connection for the hero section
//     const {
//         data: priceData,
//         isConnected,
//         isConnecting,
//         error,
//         reconnect
//     } = useWebSocket<PriceData[]>("ws://localhost:8000/ws/market_data");

//     // Market data to display (from WebSocket or fallback)
//     const [marketData, setMarketData] = useState(SAMPLE_MARKET_DATA);

//     // Animate chart paths to simulate trading activity
//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Create random wavy path for price chart
//             const generateRandomPath = () => {
//                 const points = Array.from({ length: 5 }, () => 5 + Math.random() * 10);
//                 return `M0,${points[0]} Q20,${points[1]} 40,${points[2]} T60,${points[3]} T100,${points[4]}`;
//             };

//             setChartPath1(generateRandomPath());
//             setChartPath2(generateRandomPath());
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     // Update market data when WebSocket data arrives
//     useEffect(() => {
//         if (priceData && priceData.length > 0) {
//             setMarketData(
//                 priceData.map(item => ({
//                     symbol: item.symbol,
//                     price: item.price,
//                     change: item.change
//                 }))
//             );
//         }
//     }, [priceData]);

//     // Start animations when in view
//     useEffect(() => {
//         if (isInView) {
//             controls.start("visible");
//         }
//     }, [controls, isInView]);

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 delayChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: "spring", stiffness: 100, damping: 15 },
//         },
//     };

//     // Particles for the background effect
//     const particles = Array.from({ length: 40 }, (_, i) => i);

//     return (
//         <section
//             ref={ref}
//             className="relative overflow-hidden min-h-screen pt-32 md:pt-40 pb-24 md:pb-32 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-950"
//         >
//             {/* Background particles */}
//             {particles.map((i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10"
//                     style={{
//                         width: Math.random() * 60 + 10,
//                         height: Math.random() * 60 + 10,
//                         top: `${Math.random() * 100}%`,
//                         left: `${Math.random() * 100}%`,
//                     }}
//                     animate={{
//                         y: [0, Math.random() * 30 - 15],
//                         x: [0, Math.random() * 30 - 15],
//                         opacity: [0.1, 0.3, 0.1],
//                         scale: [1, 1.1, 0.9, 1],
//                     }}
//                     transition={{
//                         duration: 10 + Math.random() * 10,
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                     }}
//                 />
//             ))}

//             {/* Background circuit-like lines */}
//             <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
//                 <svg
//                     width="100%"
//                     height="100%"
//                     className="absolute top-0 left-0 text-blue-500 dark:text-blue-400 opacity-30"
//                 >
//                     <pattern
//                         id="hero-pattern"
//                         x="0"
//                         y="0"
//                         width="100"
//                         height="100"
//                         patternUnits="userSpaceOnUse"
//                         patternTransform="rotate(11)"
//                     >
//                         <line
//                             x1="0"
//                             y1="0"
//                             x2="100"
//                             y2="100"
//                             stroke="currentColor"
//                             strokeWidth="0.8"
//                         />
//                     </pattern>
//                     <rect width="100%" height="100%" fill="url(#hero-pattern)" />
//                 </svg>
//             </div>
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate={controls}
//                     className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//                 >
//                     {/* Hero Text Content */}
//                     <div className="text-center lg:text-left">
//                         <motion.div variants={itemVariants}>
//                             <Badge
//                                 variant="outline"
//                                 className="px-3 py-1 text-sm font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 mb-4 backdrop-blur-sm"
//                             >
//                                 <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
//                                 AI-Powered Trading
//                             </Badge>
//                         </motion.div>

//                         <motion.h1
//                             variants={itemVariants}
//                             className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
//                         >
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500">
//                                 OKStratx
//                             </span>
//                             <br />
//                             <div className="relative inline-block">
//                                 <span className="text-gray-900 dark:text-white">
//                                     for Crypto Trading
//                                 </span>
//                                 <motion.div
//                                     className="absolute -top-1 -right-6 text-yellow-400"
//                                     animate={{
//                                         rotate: [0, 15, -5, 0],
//                                         scale: [1, 1.2, 0.9, 1],
//                                     }}
//                                     transition={{
//                                         duration: 2,
//                                         repeat: Infinity,
//                                         repeatType: "reverse",
//                                         repeatDelay: 5,
//                                     }}
//                                 >
//                                     <Sparkles className="h-5 w-5" />
//                                 </motion.div>
//                             </div>
//                         </motion.h1>

//                         <motion.p
//                             variants={itemVariants}
//                             className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
//                         >
//                             Generate, optimize, and execute trading strategies using the power of
//                             Large Language Models, Reinforcement Learning, and real-time data.
//                         </motion.p>

//                         <motion.div
//                             variants={itemVariants}
//                             className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//                         >
//                             <Button
//                                 size="lg"
//                                 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20"
//                                 asChild
//                             >
//                                 <Link href="/dashboard">
//                                     Launch App <ArrowRight className="ml-2 h-5 w-5" />
//                                 </Link>
//                             </Button>

//                             <Button
//                                 size="lg"
//                                 variant="outline"
//                                 className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm"
//                                 asChild
//                             >
//                                 <Link href="#features">
//                                     Explore Features <ChevronRight className="ml-2 h-5 w-5" />
//                                 </Link>
//                             </Button>
//                         </motion.div>

//                         {/* Badges for technology highlights */}
//                         <motion.div
//                             variants={itemVariants}
//                             className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8"
//                         >
//                             {[
//                                 { label: "Real-time Data", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200" },
//                                 { label: "GPT-4 Powered", color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200" },
//                                 { label: "Reinforcement Learning", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200" },
//                                 { label: "WebSocket API", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200" },
//                             ].map((badge, index) => (
//                                 <motion.div
//                                     key={badge.label}
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.8 + index * 0.1 }}
//                                 >
//                                     <Badge variant="outline" className={`py-1 ${badge.color}`}>
//                                         {badge.label}
//                                     </Badge>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </div>
//                     {/* Hero Visualization */}
//                     <motion.div
//                         variants={itemVariants}
//                         className="relative z-10"
//                     >
//                         {/* Glow effect for card */}
//                         <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 dark:opacity-30 animate-pulse"></div>

//                         <Card className="overflow-hidden border-gray-200/80 dark:border-gray-700/80 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5">
//                             <CardHeader className="p-4 bg-transparent border-b border-gray-200 dark:border-gray-700">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center space-x-2">
//                                         <CardTitle className="text-lg font-medium">Live Trading Dashboard</CardTitle>
//                                         <Badge variant="outline" className="border-none bg-blue-100/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
//                                             <span className="text-xs">BETA</span>
//                                         </Badge>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <span className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
//                                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                                             {isConnected ? 'Connected' : 'Connecting...'}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <CardDescription className="text-gray-500 dark:text-gray-400 italic">
//                                     Real-time market data and AI-generated signals
//                                 </CardDescription>
//                             </CardHeader>

//                             <CardContent className="p-0">
//                                 {/* Chart Container */}
//                                 <div className="relative h-64 p-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50 overflow-hidden">
//                                     {/* Chart axes */}
//                                     <div className="absolute inset-0 p-4 pointer-events-none">
//                                         <div className="h-full w-full flex">
//                                             {/* Y axis */}
//                                             <div className="border-r border-gray-200 dark:border-gray-700 h-full w-12 text-xs text-gray-500 dark:text-gray-400 flex flex-col justify-between items-end pr-2">
//                                                 <div>60K</div>
//                                                 <div>55K</div>
//                                                 <div>50K</div>
//                                             </div>

//                                             {/* Chart area */}
//                                             <div className="flex-1 relative">
//                                                 {/* X axis */}
//                                                 <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
//                                                     <div>30m</div>
//                                                     <div>15m</div>
//                                                     <div>Now</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Animated Chart Lines */}
//                                     <svg
//                                         viewBox="0 0 100 20"
//                                         className="w-full h-full stroke-blue-500 dark:stroke-blue-400 fill-none"
//                                         preserveAspectRatio="none"
//                                     >
//                                         <defs>
//                                             <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                                                 <stop offset="0%" stopColor={theme === 'dark' ? '#3b82f6' : '#60a5fa'} stopOpacity="0.2" />
//                                                 <stop offset="100%" stopColor={theme === 'dark' ? '#3b82f6' : '#60a5fa'} stopOpacity="0.01" />
//                                             </linearGradient>
//                                         </defs>

//                                         {/* Background grid */}
//                                         <g className="stroke-gray-200 dark:stroke-gray-700 stroke-[0.5]">
//                                             <line x1="0" y1="5" x2="100" y2="5" />
//                                             <line x1="0" y1="10" x2="100" y2="10" />
//                                             <line x1="0" y1="15" x2="100" y2="15" />
//                                             <line x1="20" y1="0" x2="20" y2="20" />
//                                             <line x1="40" y1="0" x2="40" y2="20" />
//                                             <line x1="60" y1="0" x2="60" y2="20" />
//                                             <line x1="80" y1="0" x2="80" y2="20" />
//                                         </g>

//                                         {/* Area fill under the line */}
//                                         <motion.path
//                                             d={`${chartPath1} L100,20 L0,20 Z`}
//                                             fill="url(#areaGradient)"
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             transition={{ duration: 1 }}
//                                         />

//                                         {/* Main line (foreground) */}
//                                         <motion.path
//                                             d={chartPath1}
//                                             strokeWidth="2"
//                                             initial={{ pathLength: 0, opacity: 0 }}
//                                             animate={{
//                                                 pathLength: 1,
//                                                 opacity: 1,
//                                                 d: chartPath1
//                                             }}
//                                             transition={{
//                                                 duration: 2,
//                                                 ease: "easeInOut",
//                                             }}
//                                         />

//                                         {/* Secondary line */}
//                                         <motion.path
//                                             d={chartPath2}
//                                             stroke="#a855f7"
//                                             strokeWidth="1.5"
//                                             opacity="0.3"
//                                             initial={{ pathLength: 0, opacity: 0 }}
//                                             animate={{
//                                                 pathLength: 1,
//                                                 opacity: 0.3,
//                                                 d: chartPath2
//                                             }}
//                                             transition={{
//                                                 duration: 2,
//                                                 ease: "easeInOut",
//                                             }}
//                                         />
//                                     </svg>

//                                     {/* Simulated Signal Markers */}
//                                     <motion.div
//                                         className="absolute top-1/3 left-1/4 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer"
//                                         initial={{ scale: 0 }}
//                                         animate={{
//                                             scale: [0, 1.2, 1],
//                                             boxShadow: [
//                                                 "0 0 0 rgba(16, 185, 129, 0)",
//                                                 "0 0 10px rgba(16, 185, 129, 0.5)",
//                                                 "0 0 5px rgba(16, 185, 129, 0.3)"
//                                             ]
//                                         }}
//                                         transition={{ delay: 2, duration: 1 }}
//                                     >
//                                         <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
//                                             Buy Signal
//                                         </span>
//                                     </motion.div>

//                                     <motion.div
//                                         className="absolute top-2/3 right-1/3 h-5 w-5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer"
//                                         initial={{ scale: 0 }}
//                                         animate={{
//                                             scale: [0, 1.2, 1],
//                                             boxShadow: [
//                                                 "0 0 0 rgba(239, 68, 68, 0)",
//                                                 "0 0 10px rgba(239, 68, 68, 0.5)",
//                                                 "0 0 5px rgba(239, 68, 68, 0.3)"
//                                             ]
//                                         }}
//                                         transition={{ delay: 4, duration: 1 }}
//                                     >
//                                         <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
//                                             Sell Signal
//                                         </span>
//                                     </motion.div>
//                                 </div>
//                                 {/* Price Tickers */}
//                                 <div className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
//                                     {marketData.map((coin, index) => (
//                                         <motion.div
//                                             key={coin.symbol}
//                                             className="flex flex-col items-center"
//                                             initial={{ opacity: 0, y: 10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: 0.2 * index + 0.5 }}
//                                         >
//                                             <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{coin.symbol}</div>
//                                             <div className="font-medium text-base md:text-lg">
//                                                 ${coin.price.toLocaleString()}
//                                             </div>
//                                             <div className={`text-xs flex items-center mt-1 ${coin.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                                                 {coin.change >= 0 ? (
//                                                     <TrendingUp className="h-3 w-3 mr-1" />
//                                                 ) : (
//                                                     <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
//                                                 )}
//                                                 {Math.abs(coin.change)}%
//                                             </div>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </CardContent>

//                             <CardFooter className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
//                                 <div className="flex items-center space-x-4">
//                                     <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800">
//                                         <Zap className="h-3 w-3 mr-1" />
//                                         4 Signals Today
//                                     </Badge>
//                                     <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800">
//                                         <LineChart className="h-3 w-3 mr-1" />
//                                         85% Accuracy
//                                     </Badge>
//                                 </div>
//                                 <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
//                                     Open Dashboard
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    ArrowRight,
    ChevronRight,
    TrendingUp,
    BarChart,
    RefreshCw,
    Sparkles,
    Zap,
    LineChart,
    Brain,
    Cpu,
    Bot
} from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useTheme } from "next-themes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

// Define type for real-time price data
interface PriceData {
    symbol: string;
    price: number;
    change: number;
}

// Sample market data for when WebSocket is not connected
const SAMPLE_MARKET_DATA = [
    { symbol: "BTC/USDT", price: 63487, change: 2.3 },
    { symbol: "ETH/USDT", price: 5372, change: -1.2 },
    { symbol: "SOL/USDT", price: 148, change: 4.5 },
];

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const controls = useAnimation();
    const { theme } = useTheme();

    // For chart animation
    const [chartPath1, setChartPath1] = useState("M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10");
    const [chartPath2, setChartPath2] = useState("M0,10 Q10,15 20,10 T40,15 T60,5 T80,15 T100,10");

    // Demo WebSocket connection for the hero section
    const {
        data: priceData,
        isConnected,
        isConnecting,
        error,
        reconnect
    } = useWebSocket<PriceData[]>("ws://localhost:8000/ws/market_data");

    // Market data to display (from WebSocket or fallback)
    const [marketData, setMarketData] = useState(SAMPLE_MARKET_DATA);

    // Animate chart paths to simulate trading activity
    useEffect(() => {
        const interval = setInterval(() => {
            // Create random wavy path for price chart
            const generateRandomPath = () => {
                const points = Array.from({ length: 5 }, () => 5 + Math.random() * 10);
                return `M0,${points[0]} Q20,${points[1]} 40,${points[2]} T60,${points[3]} T100,${points[4]}`;
            };

            setChartPath1(generateRandomPath());
            setChartPath2(generateRandomPath());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Update market data when WebSocket data arrives
    useEffect(() => {
        if (priceData && priceData.length > 0) {
            setMarketData(
                priceData.map(item => ({
                    symbol: item.symbol,
                    price: item.price,
                    change: item.change
                }))
            );
        }
    }, [priceData]);

    // Start animations when in view
    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 },
        },
    };

    // Particles for the background effect
    const particles = Array.from({ length: 40 }, (_, i) => i);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden min-h-screen pt-32 md:pt-40 pb-24 md:pb-32 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/10 dark:to-gray-950"
        >
            {/* Background particles */}
            {particles.map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10"
                    style={{
                        width: Math.random() * 60 + 10,
                        height: Math.random() * 60 + 10,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, Math.random() * 30 - 15],
                        x: [0, Math.random() * 30 - 15],
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            ))}

            {/* Background circuit-like lines */}
            <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
                <svg
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 text-blue-500 dark:text-blue-400 opacity-30"
                >
                    <pattern
                        id="hero-pattern"
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(11)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="100"
                            y2="100"
                            stroke="currentColor"
                            strokeWidth="0.8"
                        />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                </svg>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Hero Text Content */}
                    <div className="text-center lg:text-left px-0 lg:pr-8 relative">
                        {/* Subtle background shape for visual interest */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl -z-10"></div>

                        <motion.div variants={itemVariants}>
                            <Badge
                                variant="outline"
                                className="px-3 py-1 text-xs tracking-widest uppercase font-semibold bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 mb-4 backdrop-blur-sm border-blue-200 dark:border-blue-800/50"
                            >
                                <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                AI-Driven Strategy Engine
                            </Badge>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1]"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 font-serif italic">
                                OKX AI Strategy Lab
                            </span>
                            <div className="relative inline-block mt-1">
                                <span className="text-gray-900 dark:text-white font-sans text-3xl md:text-4xl lg:text-5xl">
                                    Automate. <span className="text-indigo-600 dark:text-indigo-400">Adapt.</span> Execute.
                                </span>
                                <motion.div
                                    className="absolute -top-1 -right-6 text-yellow-400"
                                    animate={{
                                        rotate: [0, 15, -5, 0],
                                        scale: [1, 1.2, 0.9, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 5,
                                    }}
                                >
                                    <Sparkles className="h-5 w-5" />
                                </motion.div>
                            </div>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
                        >
                            Advanced AI that analyzes market trends and historical data to generate, optimize, and execute profitable trading strategies in real-time via the OKX Swap API.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 rounded-lg font-medium text-sm"
                                asChild
                            >
                                <Link href="/dashboard">
                                    Launch Platform <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm rounded-lg font-medium text-sm"
                                asChild
                            >
                                <Link href="#features">
                                    View Strategies <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                    {/* Hero Visualization */}
                    <motion.div
                        variants={itemVariants}
                        className="relative z-10"
                    >
                        {/* Glow effect for card */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 dark:opacity-30 animate-pulse"></div>

                        <Card className="overflow-hidden border-gray-200/80 dark:border-gray-700/80 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5">
                            <CardHeader className="p-4 bg-transparent border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CardTitle className="text-lg font-medium">AI Strategy Monitor</CardTitle>
                                        <Badge variant="outline" className="border-none bg-blue-100/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                            <span className="text-xs">LIVE</span>
                                        </Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {isConnected ? 'Connected' : 'Connecting...'}
                                        </span>
                                    </div>
                                </div>
                                <CardDescription className="text-gray-500 dark:text-gray-400 italic">
                                    Automated strategy signals with real-time execution
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0">
                                {/* Chart Container */}
                                <div className="relative h-64 p-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50 overflow-hidden">
                                    {/* Chart axes */}
                                    <div className="absolute inset-0 p-4 pointer-events-none">
                                        <div className="h-full w-full flex">
                                            {/* Y axis */}
                                            <div className="border-r border-gray-200 dark:border-gray-700 h-full w-12 text-xs text-gray-500 dark:text-gray-400 flex flex-col justify-between items-end pr-2">
                                                <div>60K</div>
                                                <div>55K</div>
                                                <div>50K</div>
                                            </div>

                                            {/* Chart area */}
                                            <div className="flex-1 relative">
                                                {/* X axis */}
                                                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                                                    <div>30m</div>
                                                    <div>15m</div>
                                                    <div>Now</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated Chart Lines */}
                                    <svg
                                        viewBox="0 0 100 20"
                                        className="w-full h-full stroke-blue-500 dark:stroke-blue-400 fill-none"
                                        preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor={theme === 'dark' ? '#3b82f6' : '#60a5fa'} stopOpacity="0.2" />
                                                <stop offset="100%" stopColor={theme === 'dark' ? '#3b82f6' : '#60a5fa'} stopOpacity="0.01" />
                                            </linearGradient>
                                        </defs>

                                        {/* Background grid */}
                                        <g className="stroke-gray-200 dark:stroke-gray-700 stroke-[0.5]">
                                            <line x1="0" y1="5" x2="100" y2="5" />
                                            <line x1="0" y1="10" x2="100" y2="10" />
                                            <line x1="0" y1="15" x2="100" y2="15" />
                                            <line x1="20" y1="0" x2="20" y2="20" />
                                            <line x1="40" y1="0" x2="40" y2="20" />
                                            <line x1="60" y1="0" x2="60" y2="20" />
                                            <line x1="80" y1="0" x2="80" y2="20" />
                                        </g>

                                        {/* Area fill under the line */}
                                        <motion.path
                                            d={`${chartPath1} L100,20 L0,20 Z`}
                                            fill="url(#areaGradient)"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                        />

                                        {/* Main line (foreground) */}
                                        <motion.path
                                            d={chartPath1}
                                            strokeWidth="2"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{
                                                pathLength: 1,
                                                opacity: 1,
                                                d: chartPath1
                                            }}
                                            transition={{
                                                duration: 2,
                                                ease: "easeInOut",
                                            }}
                                        />

                                        {/* Secondary line */}
                                        <motion.path
                                            d={chartPath2}
                                            stroke="#a855f7"
                                            strokeWidth="1.5"
                                            opacity="0.3"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{
                                                pathLength: 1,
                                                opacity: 0.3,
                                                d: chartPath2
                                            }}
                                            transition={{
                                                duration: 2,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </svg>

                                    {/* Simulated Signal Markers */}
                                    <motion.div
                                        className="absolute top-1/3 left-1/4 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer"
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: [0, 1.2, 1],
                                            boxShadow: [
                                                "0 0 0 rgba(16, 185, 129, 0)",
                                                "0 0 10px rgba(16, 185, 129, 0.5)",
                                                "0 0 5px rgba(16, 185, 129, 0.3)"
                                            ]
                                        }}
                                        transition={{ delay: 2, duration: 1 }}
                                    >
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-md whitespace-nowrap z-10 font-medium">
                                            AI Buy Signal
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        className="absolute top-2/3 right-1/3 h-5 w-5 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer"
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: [0, 1.2, 1],
                                            boxShadow: [
                                                "0 0 0 rgba(239, 68, 68, 0)",
                                                "0 0 10px rgba(239, 68, 68, 0.5)",
                                                "0 0 5px rgba(239, 68, 68, 0.3)"
                                            ]
                                        }}
                                        transition={{ delay: 4, duration: 1 }}
                                    >
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1 rounded-md whitespace-nowrap z-10 font-medium">
                                            AI Sell Signal
                                        </span>
                                    </motion.div>
                                </div>
                                {/* Price Tickers */}
                                <div className="grid grid-cols-3 gap-4 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    {marketData.map((coin, index) => (
                                        <motion.div
                                            key={coin.symbol}
                                            className="flex flex-col items-center"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 * index + 0.5 }}
                                        >
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{coin.symbol}</div>
                                            <div className="font-medium text-base md:text-lg">
                                                ${coin.price.toLocaleString()}
                                            </div>
                                            <div className={`text-xs flex items-center mt-1 ${coin.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {coin.change >= 0 ? (
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                                                )}
                                                {Math.abs(coin.change)}%
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-4">
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800">
                                        <Zap className="h-3 w-3 mr-1" />
                                        Auto-Execute
                                    </Badge>
                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800">
                                        <LineChart className="h-3 w-3 mr-1" />
                                        92% Win Rate
                                    </Badge>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                    Open Strategy Lab
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;