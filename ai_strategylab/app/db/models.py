from sqlalchemy import Column, String, JSON
from app.db.database import Base

class StrategyModel(Base):
    __tablename__ = "strategies"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)
    trading_pairs = Column(JSON)
    risk_tolerance = Column(String)
    indicators = Column(JSON)
    rules = Column(JSON)
    parameters = Column(JSON)
    meta_info = Column(JSON)
