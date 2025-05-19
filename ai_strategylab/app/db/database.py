from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import asynccontextmanager

DATABASE_URL = "sqlite+aiosqlite:///./app.db"

# Create engine and session
engine = create_async_engine(DATABASE_URL, echo=True, future=True)
async_session = sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)

# Declare base model
Base = declarative_base()

# Dependency for FastAPI routes
@asynccontextmanager
async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

