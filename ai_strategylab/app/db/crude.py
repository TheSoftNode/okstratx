from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import StrategyModel


async def get_strategy(db: AsyncSession, strategy_id: str):
    """Alias for get_strategy_by_id (backward compatible)"""
    return await get_strategy_by_id(db, strategy_id)


async def get_strategy_by_id(db: AsyncSession, strategy_id: str):
    """Retrieve a single strategy by ID"""
    result = await db.execute(
        select(StrategyModel).where(StrategyModel.id == strategy_id)
    )
    return result.scalar_one_or_none()


async def get_strategies(db: AsyncSession):
    """Retrieve all strategies"""
    result = await db.execute(select(StrategyModel))
    return result.scalars().all()


async def create_strategy(db: AsyncSession, strategy: StrategyModel):
    """Create a new strategy in the database"""
    db.add(strategy)
    await db.commit()
    await db.refresh(strategy)
    return strategy

