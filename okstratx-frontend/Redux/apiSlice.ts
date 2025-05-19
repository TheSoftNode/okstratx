import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export interface Rule {
    name: string;
    conditions: Array<{
        indicator: string;
        operator: string;
        value: number;
    }>;
    actions: Array<{
        type: string;
        asset: string;
        amount_type: string;
        amount: number;
    }>;
}

export interface Indicator {
    name: string;
    parameters: Record<string, any>;
}

export enum StrategyType {
    ARBITRAGE = "arbitrage",
    MOMENTUM = "momentum",
    MEAN_REVERSION = "mean_reversion",
    BREAKOUT = "breakout",
    MARKET_MAKING = "market_making",
    CUSTOM = "custom"
}

export enum RiskTolerance {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}

export interface Strategy {
    id: string;
    name: string;
    description: string;
    type: StrategyType;
    trading_pairs: string[];
    risk_tolerance: RiskTolerance;
    indicators: Indicator[];
    rules: Rule[];
    parameters: Record<string, any>;
    metadata: {
        created_at: string;
        created_by: string;
        [key: string]: any;
    };
    status?: "draft" | "backtesting" | "deployed" | "paused";
}

export interface StrategyRequest {
    description?: string;
    type: StrategyType;
    trading_pairs: string[];
    risk_tolerance: RiskTolerance;
    constraints?: Record<string, any>;
}
export interface BacktestResult {
    strategy_id: string;
    start_date: string;
    end_date: string;
    total_return: number;
    sharpe_ratio: number;
    max_drawdown: number;
    win_rate: number;
    trades: number;
    detailed_metrics: Record<string, any>;
}

export interface Trade {
    timestamp: string;
    action: string;
    asset: string;
    amount: number;
    price: number;
}

export interface Position {
    amount: number;
    entry_price: number;
    current_price: number;
    profit_loss: number;
}

export interface StrategyPerformance {
    strategy_id: string;
    start_time: string;
    current_time: string;
    total_return: number;
    current_positions: Record<string, Position>;
    recent_trades: Trade[];
    metrics: {
        sharpe_ratio: number;
        max_drawdown: number;
        win_rate: number;
        trades: number;
        [key: string]: any;
    };
}

export interface MarketData {
    [key: string]: any; // The exact structure will come from OKX API
}

export interface KlineData {
    [key: string]: any; // The exact structure will come from OKX API
}

// Define the API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Strategy", "MarketData"],
    endpoints: (builder) => ({
        // Strategies endpoints
        getStrategies: builder.query<Strategy[], void>({
            query: () => ({ url: "/api/strategies", method: "GET" }),
            providesTags: ["Strategy"],
        }),

        getStrategyById: builder.query<Strategy, string>({
            query: (id) => ({ url: `/api/strategies/${id}`, method: "GET" }),
            providesTags: (result, error, id) => [{ type: "Strategy", id }],
        }),

        createStrategy: builder.mutation<Strategy, StrategyRequest>({
            query: (strategyRequest) => ({
                url: "/api/strategies",
                method: "POST",
                data: strategyRequest,
            }),
            invalidatesTags: ["Strategy"],
        }),

        backtestStrategy: builder.mutation<BacktestResult, { strategy_id: string; start_date: string; end_date: string }>({
            query: ({ strategy_id, start_date, end_date }) => ({
                url: `/api/strategies/${strategy_id}/backtest`,
                method: "POST",
                params: { start_date, end_date },
            }),
            invalidatesTags: (result, error, { strategy_id }) => [{ type: "Strategy", id: strategy_id }],
        }),

        deployStrategy: builder.mutation<any, string>({
            query: (strategy_id) => ({
                url: `/api/strategies/${strategy_id}/deploy`,
                method: "POST",
            }),
            invalidatesTags: (result, error, strategy_id) => [{ type: "Strategy", id: strategy_id }],
        }),

        getStrategyPerformance: builder.query<StrategyPerformance, string>({
            query: (strategy_id) => ({
                url: `/api/strategies/${strategy_id}/performance`,
                method: "GET",
            }),
            providesTags: (result, error, strategy_id) => [{ type: "Strategy", id: strategy_id }],
        }),

        // Market data endpoints
        getMarketData: builder.query<MarketData, string>({
            query: (trading_pair) => ({
                url: `/api/market/data/${trading_pair}`,
                method: "GET",
            }),
            providesTags: ["MarketData"],
        }),

        getKlineData: builder.query<KlineData, { trading_pair: string; bar?: string; limit?: number }>({
            query: ({ trading_pair, bar = "1m", limit = 100 }) => {
                // Ensure trading pair uses dash instead of slash
                const formattedPair = trading_pair.replace('/', '-');
                return {
                    url: `/api/market/klines/${formattedPair}`,
                    method: "GET",
                    params: { bar, limit },
                };
            },
            providesTags: ["MarketData"],
        }),
    }),
});

// Export the auto-generated hooks
export const {
    useGetStrategiesQuery,
    useGetStrategyByIdQuery,
    useCreateStrategyMutation,
    useBacktestStrategyMutation,
    useDeployStrategyMutation,
    useGetStrategyPerformanceQuery,
    useGetMarketDataQuery,
    useGetKlineDataQuery,
} = apiSlice;