"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "../Shared/Logo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.6,
            },
        },
    };

    const linkGroups = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "#features" },
                { name: "Use Cases", href: "#use-cases" },
                { name: "Pricing", href: "#" },
                { name: "Roadmap", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Documentation", href: "/docs" },
                { name: "API Reference", href: "/docs/api" },
                { name: "Tutorials", href: "/docs/tutorials" },
                { name: "Blog", href: "/blog" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Careers", href: "#" },
                { name: "Privacy Policy", href: "#" },
            ],
        },
    ];

    const socialLinks = [
        { name: "GitHub", icon: Github, href: "https://github.com" },
        { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
        { name: "Discord", icon: FaDiscord, href: "https://discord.com" },
    ];

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            value: "hello@okstratx.com",
            href: "mailto:hello@okstratx.com"
        },
        {
            icon: Phone,
            title: "Call Us",
            value: "+1 (888) 123-4567",
            href: "tel:+18881234567"
        },
        {
            icon: MapPin,
            title: "Location",
            value: "San Francisco, CA",
            href: "#"
        },
    ];

    return (
        <footer className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Top Wave - More compact */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative w-full h-10 md:h-16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white dark:fill-gray-950"
                    />
                </svg>
            </div>

            {/* Content - More compact */}
            <motion.div
                variants={footerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pt-12 pb-8 md:pt-16 md:pb-10 border-t border-gray-200 dark:border-gray-800"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Footer Content - More compact grid with smaller gaps */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10">
                        {/* Logo & Main Content - Reduced space-y */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="flex items-start justify-between">
                                {/* <Logo /> */}
                                <Logo size="medium" />

                                {/* Social links moved to top on mobile for better visibility */}
                                <div className="flex lg:hidden space-x-4">
                                    {socialLinks.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                aria-label={social.name}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 max-w-md text-sm">
                                Cutting-edge AI-driven platform for generating, optimizing, and
                                executing crypto trading strategies using LLMs and Reinforcement Learning.
                            </p>

                            {/* Contact Info - Horizontal on mobile for space saving */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                {contactInfo.map((contact, index) => {
                                    const Icon = contact.icon;
                                    return (
                                        <div key={index} className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-xs font-medium text-gray-900 dark:text-white">
                                                    {contact.title}
                                                </h3>
                                                <a
                                                    href={contact.href}
                                                    className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    {contact.value}
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Links Columns - More compact spacing */}
                        <div className="lg:col-span-4 grid grid-cols-3 gap-4">
                            {linkGroups.map((group) => (
                                <div key={group.title}>
                                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
                                        {group.title}
                                    </h3>
                                    <ul className="space-y-1.5">
                                        {group.links.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center group"
                                                >
                                                    {link.name}
                                                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-y-0.5 translate-x-0.5" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Newsletter Column - More compact padding */}
                        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                                            <rect width="100%" height="100%" fill="none" />
                                            <circle cx="20" cy="20" r="1" fill="currentColor" className="text-gray-900 dark:text-gray-300" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#footer-pattern)" />
                                </svg>
                            </div>

                            <div className="relative">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                    Stay Updated
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                                    Subscribe to our newsletter for updates on new features and releases.
                                </p>
                                <form className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 h-9 text-sm"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-9 text-sm"
                                    >
                                        Subscribe
                                    </Button>
                                </form>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    By subscribing, you agree to our Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Compact divider with social links (desktop) */}
                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-4 pb-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left mb-3 md:mb-0">
                            © {currentYear} OKStratx. All rights reserved.
                        </p>

                        {/* Social links on desktop */}
                        <div className="hidden lg:flex space-x-5">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.name}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Wave - More compact */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
                <svg
                    className="relative w-full h-6 md:h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="fill-gray-900/5 dark:fill-gray-700/10"
                    />
                </svg>
            </div>
        </footer>
    );
};

export default Footer;