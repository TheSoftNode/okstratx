"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../Shared/ThemeToggle";
import LinkedLogo from "../Shared/Logo";
import ConnectWalletButton from "../Wallet/ConnectWalletButton";
import WalletConnectButton from "../Wallet/WalletConnectButton";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "Architecture", href: "#architecture" },
        { name: "Use Cases", href: "#use-cases" },
        { name: "Testimonials", href: "#testimonials" },
    ];

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        {/* <LinkedLogo /> */}
                        <LinkedLogo size="medium" />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-1 py-2 text-sm font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <Button
                                asChild
                                variant="outline"
                                className="border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                            >
                                <Link href="/dashboard">Demo</Link>
                            </Button>
                            <WalletConnectButton />

                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 ml-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-2 pt-2">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                                >
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        Try Demo
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                >
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        Launch App
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;