"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
    size?: "small" | "medium" | "large";
    showText?: boolean;
    className?: string;
}

const Logo = ({ size = "medium", showText = true, className = "" }: LogoProps) => {
    // Size mappings
    const sizeMap = {
        small: {
            container: "h-8 w-8",
            logo: "w-8 h-8",
            text: "text-lg",
            spacing: "ml-1.5",
        },
        medium: {
            container: "h-10 w-10",
            logo: "w-10 h-10",
            text: "text-xl",
            spacing: "ml-2",
        },
        large: {
            container: "h-12 w-12",
            logo: "w-12 h-12",
            text: "text-2xl",
            spacing: "ml-3",
        },
    };

    // Animation variants
    const logoVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } },
    };

    // SVG animation variants
    const svgVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.1,
            }
        }
    };

    const pathVariants = {
        initial: { pathLength: 0, fill: "rgba(59, 130, 246, 0)" },
        animate: {
            pathLength: 1,
            fill: "url(#logo-gradient)",
            transition: {
                duration: 1,
                ease: "easeInOut",
                fill: { delay: 0.5, duration: 0.5 }
            }
        }
    };

    const hexagonVariants = {
        initial: { opacity: 0, rotate: -30 },
        animate: {
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className={`flex items-center ${className}`}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={logoVariants}
        >
            <div className={`relative ${sizeMap[size].container}`}>
                <motion.svg
                    viewBox="0 0 80 80"
                    className={`${sizeMap[size].logo}`}
                    variants={svgVariants}
                >
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" /> {/* Blue-500 */}
                            <stop offset="100%" stopColor="#8B5CF6" /> {/* Purple-500 */}
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Hexagon Background */}
                    <motion.path
                        d="M40 5 L70 22.5 L70 57.5 L40 75 L10 57.5 L10 22.5 Z"
                        fill="none"
                        stroke="url(#logo-gradient)"
                        strokeWidth="2"
                        filter="url(#glow)"
                        variants={hexagonVariants}
                    />

                    {/* K shape */}
                    <motion.path
                        d="M30 20 L30 60 M30 40 L50 20 M30 40 L50 60"
                        stroke="url(#logo-gradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        variants={pathVariants}
                    />

                    {/* O shape */}
                    <motion.circle
                        cx="22"
                        cy="40"
                        r="10"
                        stroke="url(#logo-gradient)"
                        strokeWidth="4"
                        fill="none"
                        variants={pathVariants}
                    />

                    {/* S dot */}
                    <motion.circle
                        cx="60"
                        cy="40"
                        r="4"
                        fill="url(#logo-gradient)"
                        variants={pathVariants}
                    />

                    {/* Data flow dots */}
                    <motion.g variants={pathVariants}>
                        <circle cx="50" cy="30" r="2" fill="url(#logo-gradient)" />
                        <circle cx="57" cy="33" r="2" fill="url(#logo-gradient)" />
                        <circle cx="57" cy="47" r="2" fill="url(#logo-gradient)" />
                        <circle cx="50" cy="50" r="2" fill="url(#logo-gradient)" />
                    </motion.g>
                </motion.svg>
            </div>

            {showText && (
                <div className={`${sizeMap[size].spacing} flex items-end`}>
                    <motion.span
                        className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sizeMap[size].text}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        OK
                    </motion.span>
                    <motion.span
                        className={`font-semibold text-gray-900 dark:text-gray-100 ${sizeMap[size].text}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        Stratx
                    </motion.span>
                </div>
            )}
        </motion.div>
    );
};

// Default component to use as a linked logo
const LinkedLogo = ({ size, showText, className }: LogoProps) => {
    return (
        <Link href="/" className="flex items-center">
            <Logo size={size} showText={showText} className={className} />
        </Link>
    );
};

export { Logo, LinkedLogo };
export default LinkedLogo;
