"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { WatchedPair } from "../helpers/util";

interface PriceCardProps {
    pair: WatchedPair;
    isSelected: boolean;
    onClick: () => void;
}

/**
 * Price Card Component - Displays a trading pair with price and change information
 */
const PriceCard: React.FC<PriceCardProps> = ({ pair, isSelected, onClick }) => {
    return (
        <Card
            key={pair.symbol}
            className={`cursor-pointer bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors ${isSelected ? "border-blue-500" : ""}`}
            onClick={onClick}
        >
            <CardContent className="p-4">
                <div className="font-medium mb-1 text-white">{pair.symbol}</div>
                <div className="text-2xl font-bold text-white">${pair.price.toLocaleString()}</div>
                <div className={`text-sm mt-1 flex items-center ${pair.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {pair.change24h >= 0
                        ? <ArrowUpRight className="mr-1 h-3 w-3" />
                        : <ArrowDownRight className="mr-1 h-3 w-3" />}
                    {Math.abs(pair.change24h)}%
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceCard;