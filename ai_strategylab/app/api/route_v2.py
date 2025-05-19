from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks, Query, Path
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Dict, Any
import uuid
import logging
from app.models.strategy import Strategy, StrategyRequest, BacktestResult, StrategyPerformance
from app.db.database import async_session, get_db
from app.core.okx_client import okx_client
from app.core.config import get_settings
from app.services.execution_service import execution_service
from app.db.crud import get_strategy, get_strategies, get_strategy_by_id, create_strategy
from app.services.rl_service import rl_service
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter()

settings = get_settings()


@router.get("/strategies", response_model=List[Strategy])
async def get_strategies_route(db: AsyncSession = Depends(async_session)):
    try:
        db_strategies = await get_strategies(db)
        return [Strategy(**s.__dict__) for s in db_strategies]
    except Exception as e:
        logger.error(f"Error fetching strategies: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch strategies: {str(e)}")


@router.get("/strategies/{strategy_id}", response_model=Strategy)
async def get_strategy_route(strategy_id: str, db: AsyncSession = Depends(async_session)):
    try:
        db_strategy = await get_strategy(db, strategy_id)
        if not db_strategy:
            raise HTTPException(status_code=404, detail=f"Strategy with ID {strategy_id} not found")
        return Strategy(**db_strategy.__dict__)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching strategy {strategy_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch strategy: {str(e)}")


@router.post("/strategies", response_model=Strategy)
async def create_strategy(strategy_request: StrategyRequest, background_tasks: BackgroundTasks):
    """Generate and optimize a new trading strategy."""
    try:
        # Step 1: Create strategy ID
        strategy_id = f"strategy-{uuid.uuid4()}"
        
        # Step 2: Create initial draft strategy
        base_strategy = Strategy(
            id=strategy_id,
            name=f"{strategy_request.type.capitalize()} Strategy for {', '.join(strategy_request.trading_pairs)}",
            description=strategy_request.description or f"AI-generated {strategy_request.type} strategy",
            type=strategy_request.type,
            trading_pairs=strategy_request.trading_pairs,
            risk_tolerance=strategy_request.risk_tolerance,
            indicators=[{
                "name": "RSI",
                "parameters": {"period": 14, "overbought": 70, "oversold": 30}
            }],
            rules=[],
            parameters={"stop_loss": 5.0, "take_profit": 10.0},
            metadata={"created_at": "2025-05-16T10:00:00Z", "created_by": "AI Strategy Lab"}
        )

        # Step 3: Fetch historical data (mocking with dummy or use real OKX API)
        historical_data = await okx_client.get_kline_data(
            strategy_request.trading_pairs[0], bar="1h", limit=500
        )

        # Step 4: Optimize using RL (run in background)
        async def run_rl_optimization():
            optimized = await rl_service.optimize_strategy(base_strategy, historical_data["data"])
            logger.info(f"RL optimization completed for {strategy_id}")
            # Optionally: save optimized strategy to database here

        background_tasks.add_task(run_rl_optimization)

        # Step 5: Return draft strategy immediately
        return base_strategy

    except Exception as e:
        logger.error(f"Error creating strategy: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create strategy: {str(e)}")


@router.post("/strategies/{strategy_id}/backtest", response_model=BacktestResult)
async def backtest_strategy(
    strategy_id: str = Path(..., description="The ID of the strategy to backtest"),
    start_date: str = Query(..., description="Start date for backtesting (YYYY-MM-DD)"),
    end_date: str = Query(..., description="End date for backtesting (YYYY-MM-DD)")
):
    """Backtest a strategy against historical data."""
    try:
        # 1. Fetch the strategy from DB
        strategy = await get_strategy_by_id(strategy_id)
        if not strategy:
            raise HTTPException(status_code=404, detail="Strategy not found")

        # 2. Fetch historical data from OKX
        trading_pair = strategy.trading_pairs[0]
        historical_data = await okx_client.get_kline_data(
            trading_pair, bar="1h", limit=1000  # optionally filter by date range
        )
        if not historical_data or "data" not in historical_data:
            raise HTTPException(status_code=500, detail="Failed to fetch historical data")

        # 3. Backtest using RLService
        result = await rl_service.backtest_strategy(strategy, historical_data["data"])

        # 4. Inject date info
        result.start_date = start_date
        result.end_date = end_date

        return result

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error backtesting strategy {strategy_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to backtest strategy: {str(e)}")


@router.post("/strategies/{strategy_id}/deploy", response_model=Dict[str, Any])
async def deploy_strategy(
    strategy_id: str = Path(..., description="The ID of the strategy to deploy"),
    db: AsyncSession = Depends(get_db)
):
    """Deploy a strategy for live trading."""
    try:
        # Step 1: Fetch strategy from DB
        strategy_record = await get_strategy_by_id(db, strategy_id)
        if not strategy_record:
            raise HTTPException(status_code=404, detail=f"Strategy with ID {strategy_id} not found")

        # Step 2: Convert DB model to Pydantic Strategy (if needed)
        # Assuming `strategy_record` is a SQLAlchemy model, and your Strategy is a Pydantic model
        strategy = Strategy.from_orm(strategy_record)

        # Step 3: Deploy using in-memory execution service
        result = await execution_service.deploy_strategy(strategy)

        # Step 4: Respond
        return {
            "status": result.get("status", "unknown"),
            "message": f"Strategy {strategy_id} deployed successfully",
            "deployment_id": f"deployment-{uuid.uuid4()}",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deploying strategy {strategy_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to deploy strategy: {str(e)}")
    

@router.get("/strategies/{strategy_id}/performance", response_model=StrategyPerformance)
async def get_strategy_performance(strategy_id: str = Path(..., description="The ID of the strategy to check")):
    """Get real-time performance metrics for a deployed strategy."""
    try:
        # Step 1: Use execution service to fetch performance
        performance = await execution_service.get_strategy_performance(strategy_id)
        return performance

    except ValueError as ve:
        # Raised if strategy is not deployed
        logger.warning(f"Strategy performance error: {ve}")
        raise HTTPException(status_code=404, detail=str(ve))

    except Exception as e:
        logger.error(f"Error fetching performance for strategy {strategy_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch strategy performance: {str(e)}")

@router.get("/market/data/{trading_pair}", response_model=Dict[str, Any])
async def get_market_data(trading_pair: str = Path(..., description="Trading pair (e.g., BTC-USDT)")):
    """Fetch current market data from OKX for a specific trading pair."""
    try:
        market_data = await okx_client.get_market_data(trading_pair)

        if not market_data or "close" not in market_data:
            raise HTTPException(status_code=404, detail=f"No market data found for {trading_pair}")

        return market_data

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching market data for {trading_pair}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch market data for {trading_pair}")

@router.get("/market/klines/{trading_pair}", response_model=Dict[str, Any])
async def get_kline_data(
    trading_pair: str = Path(..., description="Trading pair (e.g., BTC-USDT)"),
    bar: str = Query("1m", description="Candlestick interval (e.g., 1m, 5m, 1h)"),
    limit: int = Query(100, description="Number of candlesticks to return")
):
    """Fetch candlestick (kline) data for a trading pair from OKX."""
    try:
        kline_data = await okx_client.get_kline_data(trading_pair, bar, limit)

        if not kline_data or "data" not in kline_data or not kline_data["data"]:
            raise HTTPException(status_code=404, detail=f"No kline data found for {trading_pair}")

        return kline_data

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching kline data for {trading_pair}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch kline data for {trading_pair}")


