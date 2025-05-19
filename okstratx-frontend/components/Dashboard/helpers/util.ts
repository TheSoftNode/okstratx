
// Time intervals for kline data
export interface TimeInterval {
    value: string;
    label: string;
}

export const TIME_INTERVALS: TimeInterval[] = [
    { value: "1m", label: "1 Minute" },
    { value: "5m", label: "5 Minutes" },
    { value: "15m", label: "15 Minutes" },
    { value: "30m", label: "30 Minutes" },
    { value: "1h", label: "1 Hour" },
    { value: "4h", label: "4 Hours" },
    { value: "1d", label: "1 Day" },
    { value: "1w", label: "1 Week" },
];


// Define Market Data Types
export interface MarketDataItem {
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
}

export interface WatchedPair {
    symbol: string;
    price: number;
    change24h: number;
}

// Market data sample - In production, this would come from an API
export const MARKET_DATA: MarketDataItem[] = [
    { symbol: "BTC/USDT", price: 64532.20, change24h: 2.5, volume24h: 12500000000, marketCap: 1280000000000 },
    { symbol: "ETH/USDT", price: 5372.45, change24h: -1.2, volume24h: 8200000000, marketCap: 650000000000 },
    { symbol: "SOL/USDT", price: 148.75, change24h: 4.8, volume24h: 3800000000, marketCap: 65000000000 },
    { symbol: "XRP/USDT", price: 1.27, change24h: 0.8, volume24h: 2100000000, marketCap: 57000000000 },
    { symbol: "DOGE/USDT", price: 0.18, change24h: -3.1, volume24h: 1750000000, marketCap: 24000000000 },
    { symbol: "AVAX/USDT", price: 42.36, change24h: 5.3, volume24h: 1450000000, marketCap: 16000000000 },
    { symbol: "MATIC/USDT", price: 1.48, change24h: 1.7, volume24h: 1350000000, marketCap: 15000000000 },
    { symbol: "LINK/USDT", price: 18.92, change24h: 3.2, volume24h: 950000000, marketCap: 11000000000 },
    { symbol: "UNI/USDT", price: 10.87, change24h: -0.5, volume24h: 850000000, marketCap: 8200000000 },
    { symbol: "AAVE/USDT", price: 162.35, change24h: 2.8, volume24h: 750000000, marketCap: 7100000000 },
];

export const WATCHED_PAIRS: WatchedPair[] = [
    { symbol: "BTC/USDT", price: 64532.20, change24h: 2.5 },
    { symbol: "ETH/USDT", price: 5372.45, change24h: -1.2 },
    { symbol: "SOL/USDT", price: 148.75, change24h: 4.8 },
    { symbol: "XRP/USDT", price: 1.27, change24h: 0.8 },
];