
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    testimonial: string;
    rating: number;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Quantitative Trader",
        company: "Quant Capital",
        avatar: "/api/placeholder/32/32",
        testimonial: "OKX AI Strategy Lab completely transformed our approach to crypto trading. The reinforcement learning optimization found patterns our team had missed for months.",
        rating: 5,
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "Portfolio Manager",
        company: "Digital Assets Fund",
        avatar: "/api/placeholder/32/32",
        testimonial: "The real-time WebSocket implementation gives us the edge we need. Trading signals come through with incredibly low latency, which is critical in volatile markets.",
        rating: 5,
    },
    {
        id: 3,
        name: "Jamal Washington",
        role: "CTO",
        company: "AlgoTrade Solutions",
        avatar: "/api/placeholder/32/32",
        testimonial: "The multi-agent collaboration between different AI systems produces more balanced strategies than any single algorithm could generate. It's truly next-level.",
        rating: 5,
    },
    {
        id: 4,
        name: "Emily Tanaka",
        role: "Crypto Analyst",
        company: "BlockVenture",
        avatar: "/api/placeholder/32/32",
        testimonial: "The sentiment analysis feature helped us avoid several market dumps by detecting negative trends on social media before they affected prices. Invaluable tool.",
        rating: 4,
    },
    {
        id: 5,
        name: "David Kumar",
        role: "Individual Trader",
        company: "Independent",
        avatar: "/api/placeholder/32/32",
        testimonial: "As someone with limited coding experience, I appreciate how the AI generates strategies without requiring me to write complex algorithms. It's democratizing algo trading.",
        rating: 5,
    },
];

const TestimonialsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            id="testimonials"
            ref={ref}
            className="py-12 md:py-16 relative"
        >
            {/* Modern background with gradient mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10">
                    <div className="absolute -top-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500 blur-3xl"></div>
                    <div className="absolute top-[50%] -left-[10%] w-[25%] h-[25%] rounded-full bg-purple-500 blur-3xl"></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0.5px, transparent 0.5px)",
                    backgroundSize: "24px 24px"
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header - More compact */}
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <div className="inline-flex items-center rounded-full px-3 py-1 mb-3 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        <Quote className="mr-1.5 h-3.5 w-3.5" />
                        Client Success Stories
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        What Traders Are Saying
                    </h2>
                    <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">
                        See how AI Strategy Lab is helping traders achieve their goals
                    </p>
                </div>

                {/* Testimonials Carousel - Enhanced design */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6"
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {TESTIMONIALS.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                    <div className="p-1 h-full">
                                        <Card className="border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col group relative">
                                            {/* Subtle gradient top border */}
                                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-60"></div>

                                            <CardContent className="p-5 flex-grow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center">
                                                        <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700 shadow-sm">
                                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200">
                                                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="ml-2.5">
                                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {testimonial.role}, {testimonial.company}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3.5 w-3.5 ${i < testimonial.rating
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-gray-300 dark:text-gray-600"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    {/* Modern quote styling */}
                                                    <Quote className="absolute top-0 left-0 h-6 w-6 text-blue-100 dark:text-blue-900 -translate-x-1 -translate-y-1 opacity-70" />
                                                    <div className="pl-2 relative z-10">
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                            "{testimonial.testimonial}"
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Subtle corner accent */}
                                                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 0v100H0C0 44.8 44.8 0 100 0z" fill="url(#testimonial-gradient)" />
                                                        <defs>
                                                            <linearGradient id="testimonial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" stopColor="#3B82F6" />
                                                                <stop offset="100%" stopColor="#8B5CF6" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Modern carousel controls */}
                        <div className="flex justify-center mt-5 gap-2">
                            <CarouselPrevious className="static translate-y-0 mx-1 h-8 w-8 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/50" />
                            <CarouselNext className="static translate-y-0 mx-1 h-8 w-8 border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-950/50" />
                        </div>
                    </Carousel>
                </motion.div>

                {/* Stats and Recognition - Card-based layout with subtle effects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 md:mt-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                        {[
                            { label: "Traders", value: "7,500+" },
                            { label: "Strategies Generated", value: "25,000+" },
                            { label: "Avg. Win Rate", value: "68%" },
                            { label: "Success Stories", value: "1,200+" },
                        ].map((stat, i) => (
                            <Card
                                key={i}
                                className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/10 border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-shadow duration-300"
                            >
                                <CardContent className="p-4 text-center">
                                    <motion.p
                                        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Added CTA button */}
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                    >
                        Read More Success Stories
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

