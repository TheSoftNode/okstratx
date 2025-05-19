"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, XCircle, MoreHorizontal, ArrowUpRight, ArrowDownRight, GraduationCap, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MarketDataItem } from "../helpers/util";

interface MarketViewProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredMarketData: MarketDataItem[];
    setSelectedPair: (pair: string) => void;
    setViewType: (view: string) => void;
}

// Sort options interface
interface SortOption {
    label: string;
    value: string;
}

const MarketView: React.FC<MarketViewProps> = ({
    searchQuery,
    setSearchQuery,
    filteredMarketData,
    setSelectedPair,
    setViewType
}) => {
    // Sort options
    const sortOptions: SortOption[] = [
        { label: "Market Cap (High to Low)", value: "market_cap_desc" },
        { label: "Market Cap (Low to High)", value: "market_cap_asc" },
        { label: "Price (High to Low)", value: "price_desc" },
        { label: "Price (Low to High)", value: "price_asc" },
        { label: "24h Change (High to Low)", value: "change_desc" },
        { label: "24h Change (Low to High)", value: "change_asc" }
    ];

    // Format number to display in K, M, B, T
    const formatNumber = (num: number): string => {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        return num.toString();
    };

    return (
        <>
            <Card className="bg-slate-800 dark:bg-slate-900/90 border-indigo-100 dark:border-indigo-900/30 shadow-lg text-white">
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <CardTitle>Market Overview</CardTitle>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="search"
                                    placeholder="Search by symbol..."
                                    className="pl-9 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-300"
                                        onClick={() => setSearchQuery("")}
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <Select defaultValue="market_cap_desc">
                                <SelectTrigger className="w-full md:w-[240px] bg-slate-700 border-slate-600 text-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                                    {sortOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-slate-700 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-900">
                                <TableRow className="border-slate-700 hover:bg-slate-900">
                                    <TableHead className="w-[220px] text-slate-300">Asset</TableHead>
                                    <TableHead className="text-right text-slate-300">Price</TableHead>
                                    <TableHead className="text-right text-slate-300">24h Change</TableHead>
                                    <TableHead className="text-right hidden md:table-cell text-slate-300">24h Volume</TableHead>
                                    <TableHead className="text-right hidden md:table-cell text-slate-300">Market Cap</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMarketData.map((asset) => (
                                    <TableRow key={asset.symbol} className="border-slate-700 hover:bg-slate-700 cursor-pointer">
                                        <TableCell
                                            className="font-medium text-white"
                                            onClick={() => {
                                                setSelectedPair(asset.symbol);
                                                setViewType("charts");
                                            }}
                                        >
                                            {asset.symbol}
                                        </TableCell>
                                        <TableCell className="text-right text-white">
                                            ${asset.price.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span
                                                className={`flex items-center justify-end ${asset.change24h >= 0
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                                    }`}
                                            >
                                                {asset.change24h >= 0
                                                    ? <ArrowUpRight className="mr-1 h-3 w-3" />
                                                    : <ArrowDownRight className="mr-1 h-3 w-3" />}
                                                {Math.abs(asset.change24h)}%
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right hidden md:table-cell text-white">
                                            ${formatNumber(asset.volume24h)}
                                        </TableCell>
                                        <TableCell className="text-right hidden md:table-cell text-white">
                                            ${formatNumber(asset.marketCap)}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-600 text-slate-300">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredMarketData.length === 0 && (
                                    <TableRow className="border-slate-700">
                                        <TableCell colSpan={6} className="h-24 text-center text-slate-400">
                                            No results found for "{searchQuery}"
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Market Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TrendingAssetsCard
                    title="Top Gainers"
                    description="Best performing assets in the last 24 hours"
                    marketData={filteredMarketData}
                    filter={(asset) => asset.change24h > 0}
                    sort={(a, b) => b.change24h - a.change24h}
                />

                <TrendingAssetsCard
                    title="Top Losers"
                    description="Worst performing assets in the last 24 hours"
                    marketData={filteredMarketData}
                    filter={(asset) => asset.change24h < 0}
                    sort={(a, b) => a.change24h - b.change24h}
                    isNegative
                />
            </div>

            {/* Learning Resources */}
            <EducationResources />
        </>
    );
};

// Extracted Trending Assets Card Component
interface TrendingAssetsCardProps {
    title: string;
    description: string;
    marketData: MarketDataItem[];
    filter: (asset: MarketDataItem) => boolean;
    sort: (a: MarketDataItem, b: MarketDataItem) => number;
    isNegative?: boolean;
}

const TrendingAssetsCard: React.FC<TrendingAssetsCardProps> = ({
    title,
    description,
    marketData,
    filter,
    sort,
    isNegative = false
}) => {
    return (
        <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-slate-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {marketData
                        .filter(filter)
                        .sort(sort)
                        .slice(0, 5)
                        .map((asset, index) => (
                            <div
                                key={asset.symbol}
                                className={`flex justify-between items-center py-3 ${index < 4 ? "border-b border-slate-700" : ""}`}
                            >
                                <div className="font-medium text-white">{asset.symbol}</div>
                                <div className="flex items-center gap-3">
                                    <div className="text-white">${asset.price.toLocaleString()}</div>
                                    <div className={`${isNegative ? "text-red-400" : "text-green-400"} flex items-center`}>
                                        {isNegative ?
                                            <ArrowDownRight className="mr-1 h-3 w-3" /> :
                                            <ArrowUpRight className="mr-1 h-3 w-3" />
                                        }
                                        {Math.abs(asset.change24h)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Education Resources Component
const EducationResources: React.FC = () => {
    return (
        <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-400" />
                    Market Education
                </CardTitle>
                <CardDescription className="text-slate-400">Learn about trading fundamentals</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ResourceCard
                        title="Technical Analysis"
                        description="Learn how to read charts and identify patterns to make informed trading decisions."
                        color="blue"
                    />

                    <ResourceCard
                        title="Risk Management"
                        description="Master strategies to protect your portfolio and minimize trading risks."
                        color="purple"
                    />

                    <ResourceCard
                        title="Trading Psychology"
                        description="Understand the mental aspects of trading and how to maintain discipline."
                        color="amber"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

// Resource Card Component
interface ResourceCardProps {
    title: string;
    description: string;
    color: 'blue' | 'purple' | 'amber';
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, color }) => {
    const colorClasses = {
        blue: {
            bg: "bg-blue-950/30",
            border: "border-blue-900/50",
            text: "text-blue-300",
            buttonBorder: "border-blue-800",
            buttonHover: "hover:bg-blue-900/50"
        },
        purple: {
            bg: "bg-purple-950/30",
            border: "border-purple-900/50",
            text: "text-purple-300",
            buttonBorder: "border-purple-800",
            buttonHover: "hover:bg-purple-900/50"
        },
        amber: {
            bg: "bg-amber-950/30",
            border: "border-amber-900/50",
            text: "text-amber-300",
            buttonBorder: "border-amber-800",
            buttonHover: "hover:bg-amber-900/50"
        }
    };

    const classes = colorClasses[color];

    return (
        <Card className={`${classes.bg} ${classes.border}`}>
            <CardContent className="p-4">
                <h3 className={`font-medium mb-2 ${classes.text}`}>{title}</h3>
                <p className="text-sm text-slate-400 mb-4">
                    {description}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className={`w-full ${classes.buttonBorder} ${classes.text} ${classes.buttonHover}`}
                >
                    View Guide
                    <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
            </CardContent>
        </Card>
    );
};

export default MarketView;