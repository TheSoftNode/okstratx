"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Clock, TrendingUp, TrendingDown, Zap } from "lucide-react";

// Market news data type
export interface NewsItem {
    id: number;
    title: string;
    date: string;
    source: string;
    sentiment: "positive" | "negative" | "neutral";
}

// Sample market news data
const MARKET_NEWS: NewsItem[] = [
    {
        id: 1,
        title: "Bitcoin Surges Past $65,000 Amid Increasing Institutional Adoption",
        date: "2 hours ago",
        source: "Crypto News Daily",
        sentiment: "positive"
    },
    {
        id: 2,
        title: "Ethereum Layer 2 Solutions See Record Growth in Transaction Volume",
        date: "4 hours ago",
        source: "BlockChain Observer",
        sentiment: "positive"
    },
    {
        id: 3,
        title: "Regulatory Concerns Grow as EU Proposes New Crypto Framework",
        date: "6 hours ago",
        source: "Financial Times",
        sentiment: "negative"
    },
    {
        id: 4,
        title: "Solana Network Experiences Brief Outage, Quickly Resolves",
        date: "8 hours ago",
        source: "Decrypt",
        sentiment: "neutral"
    },
    {
        id: 5,
        title: "Major Exchange Announces Support for New Layer 1 Blockchain",
        date: "10 hours ago",
        source: "CoinDesk",
        sentiment: "positive"
    }
];

const MarketNews: React.FC = () => {
    return (
        <Card className="bg-slate-800 border-slate-700 text-white">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
                        Market News
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs text-blue-400 hover:bg-slate-700" asChild>
                        <a href="/dashboard/news">
                            View All
                            <ChevronRight className="h-3 w-3" />
                        </a>
                    </Button>
                </div>
                <CardDescription className="text-slate-400">Latest news and market updates</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {MARKET_NEWS.map((news) => (
                        <NewsItem key={news.id} news={news} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

interface NewsItemProps {
    news: NewsItem;
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    // Helper function to get sentiment badge styling and icon
    const getSentimentInfo = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return {
                    classes: "bg-green-900/30 text-green-300 border-green-700",
                    icon: <TrendingUp className="h-3 w-3" />
                };
            case "negative":
                return {
                    classes: "bg-red-900/30 text-red-300 border-red-700",
                    icon: <TrendingDown className="h-3 w-3" />
                };
            default:
                return {
                    classes: "bg-blue-900/30 text-blue-300 border-blue-700",
                    icon: <Zap className="h-3 w-3" />
                };
        }
    };

    const sentimentInfo = getSentimentInfo(news.sentiment);

    return (
        <div className="flex items-start gap-4 pb-4 border-b border-indigo-100 dark:border-indigo-900/30 shadow-lg last:border-0 last:pb-0">
            <Badge
                variant="outline"
                className={`mt-1 ${sentimentInfo.classes}`}
            >
                {sentimentInfo.icon}
            </Badge>
            <div className="space-y-1">
                <h3 className="font-medium text-sm text-white">{news.title}</h3>
                <div className="flex items-center text-xs text-slate-400">
                    <Clock className="mr-1.5 h-3 w-3" />
                    <span>{news.date}</span>
                    <span className="mx-1.5">•</span>
                    <span>{news.source}</span>
                </div>
            </div>
        </div>
    );
};

export default MarketNews;