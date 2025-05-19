"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Check, ChevronRight } from "lucide-react";
import Link from "next/link";

const CallToActionSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Compact animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section
            ref={ref}
            className="py-12 md:py-16 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden"
        >
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[40%] -right-[10%] w-[80%] h-[80%] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                    {/* Left Column: Text Content - More compact spacing */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 shadow-sm">
                            <Sparkles className="mr-2 h-3.5 w-3.5" />
                            Launch Special Offer
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            Start Trading Smarter with
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 ml-2">
                                AI-Powered Strategies
                            </span>
                        </h2>

                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                            Join thousands of traders who are leveraging the power of artificial intelligence to gain an edge in crypto markets.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 pt-2">
                            {[
                                "AI-generated strategies tailored to your goals",
                                "Continuous optimization with reinforcement learning",
                                "Real-time signals with WebSocket technology",
                                "Advanced risk management and backtesting",
                                "No coding required to get started",
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start"
                                >
                                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 mr-2 mt-0.5 flex-shrink-0">
                                        <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <Button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-600/10 dark:shadow-blue-500/10"
                                asChild
                            >
                                <Link href="/dashboard">
                                    Launch App <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="border-gray-300 dark:border-gray-700"
                                asChild
                            >
                                <Link href="#features">
                                    Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Card with Glow Effect - More refined styling */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Refined glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/70 to-purple-600/70 rounded-xl blur-lg opacity-30 dark:opacity-40 animate-pulse"></div>

                        {/* Inner shine effect */}
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-200/10 to-purple-200/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg mix-blend-overlay"></div>

                        <Card className="w-full border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-xl relative rounded-xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            <CardContent className="p-5 md:p-6">
                                <div className="text-center mb-5">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                                        Fast Track Your Trading Success
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Get started in minutes with our guided setup
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        {
                                            step: "1",
                                            title: "Define Your Goals",
                                            description: "Specify your trading preferences, risk tolerance, and target assets.",
                                            bgColor: "bg-blue-50/70 dark:bg-blue-950/40",
                                            borderColor: "border-blue-100 dark:border-blue-900/50",
                                            textColor: "text-blue-700 dark:text-blue-300",
                                        },
                                        {
                                            step: "2",
                                            title: "Generate Your Strategy",
                                            description: "Our AI will create a custom strategy based on your requirements.",
                                            bgColor: "bg-purple-50/70 dark:bg-purple-950/40",
                                            borderColor: "border-purple-100 dark:border-purple-900/50",
                                            textColor: "text-purple-700 dark:text-purple-300",
                                        },
                                        {
                                            step: "3",
                                            title: "Backtest & Optimize",
                                            description: "Refine your strategy with historical data and RL optimization.",
                                            bgColor: "bg-amber-50/70 dark:bg-amber-950/40",
                                            borderColor: "border-amber-100 dark:border-amber-900/50",
                                            textColor: "text-amber-700 dark:text-amber-300",
                                        },
                                        {
                                            step: "4",
                                            title: "Deploy & Monitor",
                                            description: "Launch your strategy and monitor performance in real-time.",
                                            bgColor: "bg-green-50/70 dark:bg-green-950/40",
                                            borderColor: "border-green-100 dark:border-green-900/50",
                                            textColor: "text-green-700 dark:text-green-300",
                                        },
                                    ].map((step, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className={`flex items-start p-3 rounded-lg border ${step.borderColor} ${step.bgColor} hover:shadow-sm transition-shadow duration-300`}
                                        >
                                            <div className={`h-7 w-7 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mr-3 ${step.textColor} font-medium border ${step.borderColor} shadow-sm`}>
                                                {step.step}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    variants={itemVariants}
                                    className="mt-6 text-center"
                                >
                                    <Button
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow"
                                        asChild
                                    >
                                        <Link href="/dashboard" className="font-medium">
                                            Start Your Free Trial <ChevronRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        No credit card required. Cancel anytime.
                                    </p>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            </div>

            {/* Sophisticated geometric accents */}
            <div className="absolute bottom-0 right-0 w-40 h-40 md:w-60 md:h-60 opacity-20 dark:opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" className="text-blue-600 dark:text-blue-400" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" className="text-purple-600 dark:text-purple-400" />
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" className="text-blue-600 dark:text-blue-400" />
                    <path d="M10 50 H90" stroke="currentColor" strokeWidth="0.2" className="text-gray-800 dark:text-gray-200" />
                    <path d="M50 10 V90" stroke="currentColor" strokeWidth="0.2" className="text-gray-800 dark:text-gray-200" />
                </svg>
            </div>
        </section>
    );
};

export default CallToActionSection;