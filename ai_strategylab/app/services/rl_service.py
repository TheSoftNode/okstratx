# import logging
# import numpy as np
# import gymnasium as gym
# from gymnasium import spaces
# from typing import List, Dict, Any, Optional, Tuple
# from stable_baselines3 import PPO
# from stable_baselines3.common.callbacks import BaseCallback
# from stable_baselines3.common.vec_env import DummyVecEnv
# from app.models.strategy import Strategy, BacktestResult
# from app.core.config import get_settings
# from app.core.okx_client import okx_client

# logger = logging.getLogger(__name__)
# settings = get_settings()


# class TradingEnvironment(gym.Env):
#     """Custom trading environment for RL optimization."""
    
#     def __init__(self, strategy: Strategy, historical_data: List[Dict[str, Any]]):
#         """Initialize the trading environment.
        
#         Args:
#             strategy: The trading strategy to optimize
#             historical_data: Historical market data for backtesting
#         """
#         super().__init__()
        
#         self.strategy = strategy
#         self.historical_data = historical_data
#         self.current_step = 0
#         self.total_steps = len(historical_data)
        
#         # Define action and observation spaces
#         # Actions: Continuous parameters for strategy optimization
#         # For example, if optimizing RSI parameters:
#         self.action_space = spaces.Box(
#             low=np.array([5, 20, 80]),   # min values for [period, oversold, overbought]
#             high=np.array([30, 40, 95]), # max values for [period, oversold, overbought]
#             dtype=np.float32
#         )
        
#         # Observations: Market data features
#         # For example: [price, volume, rsi, etc.]
#         self.observation_space = spaces.Box(
#             low=-np.inf,
#             high=np.inf,
#             shape=(10,),  # Number of features in observation
#             dtype=np.float32
#         )
        
#         # Trading state
#         self.portfolio_value = 10000.0  # Initial portfolio value
#         self.position = 0.0  # Current position size
#         self.cash = self.portfolio_value  # Available cash
        
#         # Performance tracking
#         self.returns = []
#         self.trades = []
    
#     def reset(self, seed=None, options=None):
#         """Reset the environment to initial state."""
#         super().reset(seed=seed)
        
#         self.current_step = 0
#         self.portfolio_value = 10000.0
#         self.position = 0.0
#         self.cash = self.portfolio_value
#         self.returns = []
#         self.trades = []
        
#         return self._get_observation(), {}
    
#     def step(self, action):
#         """Take a step in the environment.
        
#         Args:
#             action: Strategy parameters to optimize
#         """
#         # Update strategy parameters based on action
#         self._update_strategy_parameters(action)
        
#         # Get current market data
#         current_data = self.historical_data[self.current_step]
        
#         # Execute strategy with updated parameters
#         signal = self._execute_strategy(current_data)
        
#         # Apply trading signal
#         reward = self._apply_trading_signal(signal, current_data)
        
#         # Move to next step
#         self.current_step += 1
#         done = self.current_step >= self.total_steps - 1
        
#         # Get next observation
#         observation = self._get_observation()
        
#         # Calculate info dict
#         info = {
#             "portfolio_value": self.portfolio_value,
#             "position": self.position,
#             "cash": self.cash,
#             "step": self.current_step,
#         }
        
#         return observation, reward, done, False, info
    
#     def _get_observation(self):
#         """Get current market observation."""
#         if self.current_step >= self.total_steps:
#             return np.zeros(self.observation_space.shape)
        
#         # Extract features from current market data
#         data = self.historical_data[self.current_step]
        
#         # Example features: price, volume, technical indicators, etc.
#         # In a real implementation, calculate these from the data
#         features = np.array([
#             data.get("close", 0),
#             data.get("volume", 0),
#             # Add more features as needed
#             0, 0, 0, 0, 0, 0, 0, 0  # Placeholder for other features
#         ], dtype=np.float32)[:self.observation_space.shape[0]]
        
#         return features
    
#     def _update_strategy_parameters(self, action):
#         """Update strategy parameters based on RL action."""
#         # Example: Update RSI parameters
#         for i, indicator in enumerate(self.strategy.indicators):
#             if indicator.name == "RSI":
#                 indicator.parameters["period"] = int(action[0])
#                 indicator.parameters["oversold"] = float(action[1])
#                 indicator.parameters["overbought"] = float(action[2])
    
#     def _execute_strategy(self, data):
#         """Execute strategy with current parameters and market data."""
#         # Example: Simple RSI strategy
#         # In a real implementation, this would evaluate all rules and conditions
#         signal = 0  # 0: hold, 1: buy, -1: sell
        
#         for indicator in self.strategy.indicators:
#             if indicator.name == "RSI":
#                 # Simulate RSI calculation
#                 # In a real implementation, calculate this from the data
#                 rsi_value = data.get("rsi", 50)  # Placeholder
                
#                 if rsi_value < indicator.parameters["oversold"]:
#                     signal = 1  # Buy signal
#                 elif rsi_value > indicator.parameters["overbought"]:
#                     signal = -1  # Sell signal
        
#         return signal
    
#     def _apply_trading_signal(self, signal, data):
#         """Apply trading signal and calculate reward."""
#         price = data.get("close", 0)
#         prev_portfolio_value = self.portfolio_value
        
#         # Execute trades based on signal
#         if signal == 1 and self.position == 0:  # Buy
#             # Use 90% of cash to buy
#             amount = self.cash * 0.9
#             self.position = amount / price
#             self.cash -= amount
            
#             self.trades.append({
#                 "type": "buy",
#                 "price": price,
#                 "amount": amount,
#                 "step": self.current_step
#             })
            
#         elif signal == -1 and self.position > 0:  # Sell
#             # Sell entire position
#             amount = self.position * price
#             self.cash += amount
#             self.position = 0
            
#             self.trades.append({
#                 "type": "sell",
#                 "price": price,
#                 "amount": amount,
#                 "step": self.current_step
#             })
        
#         # Update portfolio value
#         self.portfolio_value = self.cash + (self.position * price)
        
#         # Calculate return
#         step_return = (self.portfolio_value - prev_portfolio_value) / prev_portfolio_value
#         self.returns.append(step_return)
        
#         # Reward is the step return
#         # Could also use Sharpe ratio or other metrics
#         reward = step_return
        
#         return reward
    
#     def calculate_performance_metrics(self):
#         """Calculate performance metrics for the strategy."""
#         returns = np.array(self.returns)
        
#         # Calculate metrics
#         total_return = (self.portfolio_value / 10000.0) - 1.0
#         sharpe_ratio = np.mean(returns) / (np.std(returns) + 1e-6) * np.sqrt(252)  # Annualized
#         max_drawdown = 0.0
#         win_rate = 0.0
        
#         # Calculate drawdown
#         if len(returns) > 0:
#             cumulative_returns = np.cumprod(1 + returns)
#             peak = np.maximum.accumulate(cumulative_returns)
#             drawdown = (peak - cumulative_returns) / peak
#             max_drawdown = np.max(drawdown)
        
#         # Calculate win rate
#         if len(self.trades) > 0:
#             profitable_trades = sum(1 for trade in self.trades if trade["type"] == "sell" and trade["amount"] > 0)
#             total_trades = sum(1 for trade in self.trades if trade["type"] == "sell")
#             win_rate = profitable_trades / max(1, total_trades)
        
#         return {
#             "total_return": float(total_return),
#             "sharpe_ratio": float(sharpe_ratio),
#             "max_drawdown": float(max_drawdown),
#             "win_rate": float(win_rate),
#             "num_trades": len(self.trades)
#         }


# class RLService:
#     """Service for Reinforcement Learning optimization."""
    
#     def __init__(self):
#         """Initialize the RL service."""
#         self.models = {}  # Store trained models by strategy ID
    
#     async def optimize_strategy(self, strategy: Strategy, historical_data: List[Dict[str, Any]]) -> Strategy:
#         """Optimize a strategy using RL.
        
#         Args:
#             strategy: The strategy to optimize
#             historical_data: Historical market data for training
            
#         Returns:
#             Optimized strategy
#         """
#         try:
#             logger.info(f"Optimizing strategy {strategy.id} using RL")
            
#             # Create environment
#             def make_env():
#                 return TradingEnvironment(strategy, historical_data)
            
#             env = DummyVecEnv([make_env])
            
#             # Initialize PPO agent
#             model = PPO(
#                 "MlpPolicy",
#                 env,
#                 learning_rate=0.0003,
#                 n_steps=2048,
#                 batch_size=64,
#                 n_epochs=10,
#                 gamma=0.99,
#                 gae_lambda=0.95,
#                 clip_range=0.2,
#                 verbose=1
#             )
            
#             # Train model
#             logger.info("Training RL model...")
#             model.learn(total_timesteps=10000)  # Adjust based on needs
            
#             # Store model for future use
#             if strategy.id:
#                 self.models[strategy.id] = model
            
#             # Get optimized parameters
#             # Run a single episode with the trained policy
#             obs = env.reset()
#             done = False
#             while not done:
#                 action, _ = model.predict(obs)
#                 obs, _, done, _, _ = env.step(action)
            
#             # Extract optimized strategy from environment
#             optimized_strategy = env.envs[0].strategy
            
#             logger.info(f"Strategy optimization complete")
#             return optimized_strategy
            
#         except Exception as e:
#             logger.error(f"Error optimizing strategy: {str(e)}")
#             raise
    
#     async def backtest_strategy(self, strategy: Strategy, historical_data: List[Dict[str, Any]]) -> BacktestResult:
#         """Backtest a strategy against historical data.
        
#         Args:
#             strategy: The strategy to backtest
#             historical_data: Historical market data
            
#         Returns:
#             Backtest results
#         """
#         try:
#             logger.info(f"Backtesting strategy {strategy.id}")
            
#             # Create environment
#             env = TradingEnvironment(strategy, historical_data)
            
#             # Run backtest
#             obs = env.reset()[0]
#             done = False
#             while not done:
#                 # Use default parameters (no optimization)
#                 action = env.action_space.sample()  # Just for testing
#                 obs, reward, done, _, info = env.step(action)
            
#             # Calculate performance metrics
#             metrics = env.calculate_performance_metrics()
            
#             # Create backtest result
#             result = BacktestResult(
#                 strategy_id=strategy.id or "unknown",
#                 start_date=historical_data[0].get("timestamp", ""),
#                 end_date=historical_data[-1].get("timestamp", ""),
#                 total_return=metrics["total_return"],
#                 sharpe_ratio=metrics["sharpe_ratio"],
#                 max_drawdown=metrics["max_drawdown"],
#                 win_rate=metrics["win_rate"],
#                 num_trades=metrics["num_trades"],
#                 trades=env.trades
#             )
            
#             logger.info(f"Backtest complete with return: {metrics['total_return']:.2%}")
#             return result
            
#         except Exception as e:
#             logger.error(f"Error backtesting strategy: {str(e)}")
#             raise


# # Create a singleton instance
# rl_service = RLService()

import logging
import numpy as np
import gymnasium as gym
from gymnasium import spaces
from typing import List, Dict, Any, Optional, Tuple
from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import BaseCallback
from stable_baselines3.common.vec_env import DummyVecEnv
from app.models.strategy import Strategy, BacktestResult
from app.core.config import get_settings
from app.core.okx_client import okx_client

logger = logging.getLogger(__name__)
settings = get_settings()


class TradingEnvironment(gym.Env):
    """Custom trading environment for RL optimization."""
    
    def __init__(self, strategy: Strategy, historical_data: List[Dict[str, Any]]):
        """Initialize the trading environment.
        
        Args:
            strategy: The trading strategy to optimize
            historical_data: Historical market data for backtesting
        """
        super().__init__()
        
        self.strategy = strategy
        
        # Handle empty or too small historical data
        if not historical_data or len(historical_data) < 2:
            logger.warning("Empty or insufficient historical data provided. Using dummy data.")
            # Create minimal dummy data to avoid index errors
            self.historical_data = [
                {"close": 100.0, "volume": 1000, "rsi": 50, "timestamp": "2025-01-01T00:00:00Z"},
                {"close": 101.0, "volume": 1100, "rsi": 55, "timestamp": "2025-01-02T00:00:00Z"}
            ]
        else:
            self.historical_data = historical_data
            
        self.current_step = 0
        self.total_steps = len(self.historical_data)
        
        # Define action and observation spaces
        # Actions: Continuous parameters for strategy optimization
        # For example, if optimizing RSI parameters:
        self.action_space = spaces.Box(
            low=np.array([5, 20, 80]),   # min values for [period, oversold, overbought]
            high=np.array([30, 40, 95]), # max values for [period, oversold, overbought]
            dtype=np.float32
        )
        
        # Observations: Market data features
        # For example: [price, volume, rsi, etc.]
        self.observation_space = spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(10,),  # Number of features in observation
            dtype=np.float32
        )
        
        # Trading state
        self.portfolio_value = 10000.0  # Initial portfolio value
        self.position = 0.0  # Current position size
        self.cash = self.portfolio_value  # Available cash
        
        # Performance tracking
        self.returns = []
        self.trades = []
    
    def reset(self, seed=None, options=None):
        """Reset the environment to initial state."""
        super().reset(seed=seed)
        
        self.current_step = 0
        self.portfolio_value = 10000.0
        self.position = 0.0
        self.cash = self.portfolio_value
        self.returns = []
        self.trades = []
        
        return self._get_observation(), {}
    
    def step(self, action):
        """Take a step in the environment.
        
        Args:
            action: Strategy parameters to optimize
        """
        # Update strategy parameters based on action
        self._update_strategy_parameters(action)
        
        # Get current market data
        current_data = self.historical_data[self.current_step]
        
        # Execute strategy with updated parameters
        signal = self._execute_strategy(current_data)
        
        # Apply trading signal
        reward = self._apply_trading_signal(signal, current_data)
        
        # Move to next step
        self.current_step += 1
        done = self.current_step >= self.total_steps - 1
        
        # Get next observation
        observation = self._get_observation()
        
        # Calculate info dict
        info = {
            "portfolio_value": self.portfolio_value,
            "position": self.position,
            "cash": self.cash,
            "step": self.current_step,
        }
        
        return observation, reward, done, False, info
    
    def _get_observation(self):
        """Get current market observation."""
        if self.current_step >= self.total_steps:
            return np.zeros(self.observation_space.shape)
        
        # Extract features from current market data
        data = self.historical_data[self.current_step]
        
        # Example features: price, volume, technical indicators, etc.
        # In a real implementation, calculate these from the data
        # Create a default array of zeros and then fill in available data
        features = np.zeros(self.observation_space.shape[0], dtype=np.float32)
        
        # Fill in available data, with safe fallbacks
        features[0] = data.get("close", 0.0)
        features[1] = data.get("volume", 0.0)
        # Additional features could be filled here
        
        return features
    
    def _update_strategy_parameters(self, action):
        """Update strategy parameters based on RL action."""
        # Safely update strategy parameters
        try:
            # Make sure we have at least one indicator
            if not self.strategy.indicators:
                # Add default RSI indicator if none exists
                self.strategy.indicators = [{
                    "name": "RSI",
                    "parameters": {"period": 14, "oversold": 30, "overbought": 70}
                }]
            
            # Example: Update RSI parameters for the first indicator
            indicator = self.strategy.indicators[0]
            if hasattr(indicator, "parameters"):
                indicator.parameters["period"] = int(action[0])
                indicator.parameters["oversold"] = float(action[1])
                indicator.parameters["overbought"] = float(action[2])
            elif isinstance(indicator, dict):
                indicator["parameters"]["period"] = int(action[0])
                indicator["parameters"]["oversold"] = float(action[1])
                indicator["parameters"]["overbought"] = float(action[2])
        except Exception as e:
            logger.error(f"Error updating strategy parameters: {str(e)}")
            # Continue with default parameters if update fails
            pass
    
    def _execute_strategy(self, data):
        """Execute strategy with current parameters and market data."""
        # Example: Simple RSI strategy
        # In a real implementation, this would evaluate all rules and conditions
        signal = 0  # 0: hold, 1: buy, -1: sell
        
        try:
            # Default RSI value
            rsi_value = data.get("rsi", 50)  # Placeholder
            
            # Process indicators
            for indicator in self.strategy.indicators:
                # Handle both object and dict access patterns
                if hasattr(indicator, "name"):
                    name = indicator.name
                    parameters = indicator.parameters
                elif isinstance(indicator, dict):
                    name = indicator.get("name", "")
                    parameters = indicator.get("parameters", {})
                else:
                    continue
                    
                if name == "RSI" and parameters:
                    if rsi_value < parameters.get("oversold", 30):
                        signal = 1  # Buy signal
                    elif rsi_value > parameters.get("overbought", 70):
                        signal = -1  # Sell signal
        except Exception as e:
            logger.error(f"Error executing strategy: {str(e)}")
            # Default to hold if execution fails
            pass
        
        return signal
    
    def _apply_trading_signal(self, signal, data):
        """Apply trading signal and calculate reward."""
        price = data.get("close", 0)
        if price <= 0:
            return 0.0  # No reward if price is invalid
            
        prev_portfolio_value = self.portfolio_value
        
        # Execute trades based on signal
        if signal == 1 and self.position == 0:  # Buy
            # Use 90% of cash to buy
            amount = self.cash * 0.9
            self.position = amount / price
            self.cash -= amount
            
            self.trades.append({
                "type": "buy",
                "price": price,
                "amount": amount,
                "step": self.current_step
            })
            
        elif signal == -1 and self.position > 0:  # Sell
            # Sell entire position
            amount = self.position * price
            self.cash += amount
            self.position = 0
            
            self.trades.append({
                "type": "sell",
                "price": price,
                "amount": amount,
                "step": self.current_step
            })
        
        # Update portfolio value
        self.portfolio_value = self.cash + (self.position * price)
        
        # Calculate return
        step_return = (self.portfolio_value - prev_portfolio_value) / prev_portfolio_value
        self.returns.append(step_return)
        
        # Reward is the step return
        # Could also use Sharpe ratio or other metrics
        reward = step_return
        
        return reward
    
    def calculate_performance_metrics(self):
        """Calculate performance metrics for the strategy."""
        returns = np.array(self.returns)
        
        # Calculate metrics with safety checks
        total_return = (self.portfolio_value / 10000.0) - 1.0
        
        # Safe calculation of Sharpe ratio
        if len(returns) > 0 and np.std(returns) > 0:
            sharpe_ratio = np.mean(returns) / (np.std(returns) + 1e-6) * np.sqrt(252)  # Annualized
        else:
            sharpe_ratio = 0.0
        
        max_drawdown = 0.0
        win_rate = 0.0
        
        # Calculate drawdown with safety checks
        if len(returns) > 0:
            try:
                cumulative_returns = np.cumprod(1 + returns)
                peak = np.maximum.accumulate(cumulative_returns)
                drawdown = (peak - cumulative_returns) / peak
                max_drawdown = np.max(drawdown)
            except Exception as e:
                logger.error(f"Error calculating drawdown: {str(e)}")
        
        # Calculate win rate with safety checks
        if len(self.trades) > 0:
            try:
                profitable_trades = sum(1 for trade in self.trades if trade["type"] == "sell" and trade["amount"] > 0)
                total_trades = sum(1 for trade in self.trades if trade["type"] == "sell")
                win_rate = profitable_trades / max(1, total_trades)
            except Exception as e:
                logger.error(f"Error calculating win rate: {str(e)}")
        
        return {
            "total_return": float(total_return),
            "sharpe_ratio": float(sharpe_ratio),
            "max_drawdown": float(max_drawdown),
            "win_rate": float(win_rate),
            "num_trades": len(self.trades)
        }


class RLService:
    """Service for Reinforcement Learning optimization."""
    
    def __init__(self):
        """Initialize the RL service."""
        self.models = {}  # Store trained models by strategy ID
    
    async def optimize_strategy(self, strategy: Strategy, historical_data: List[Dict[str, Any]]) -> Strategy:
        """Optimize a strategy using RL.
        
        Args:
            strategy: The trading strategy to optimize
            historical_data: Historical market data for training
            
        Returns:
            Optimized strategy
        """
        try:
            logger.info(f"Optimizing strategy {strategy.id} using RL")
            
            # Log historical data info
            logger.info(f"Historical data received: {len(historical_data)} records")
            
            # Create environment
            def make_env():
                return TradingEnvironment(strategy, historical_data)
            
            env = DummyVecEnv([make_env])
            
            # Initialize PPO agent
            model = PPO(
                "MlpPolicy",
                env,
                learning_rate=0.0003,
                n_steps=2048,
                batch_size=64,
                n_epochs=10,
                gamma=0.99,
                gae_lambda=0.95,
                clip_range=0.2,
                verbose=1
            )
            
            # Train model
            logger.info("Training RL model...")
            model.learn(total_timesteps=10000)  # Adjust based on needs
            
            # Store model for future use
            if strategy.id:
                self.models[strategy.id] = model
            
            # Get optimized parameters
            # Run a single episode with the trained policy
            obs = env.reset()
            done = False
            while not done:
                action, _ = model.predict(obs)
                obs, _, done, _, _ = env.step(action)
            
            # Extract optimized strategy from environment
            optimized_strategy = env.envs[0].strategy
            
            logger.info(f"Strategy optimization complete")
            return optimized_strategy
            
        except Exception as e:
            logger.error(f"Error optimizing strategy: {str(e)}")
            # Return original strategy if optimization fails
            return strategy
    
    async def backtest_strategy(self, strategy: Strategy, historical_data: List[Dict[str, Any]]) -> BacktestResult:
        """Backtest a strategy against historical data.
        
        Args:
            strategy: The strategy to backtest
            historical_data: Historical market data
            
        Returns:
            Backtest results
        """
        try:
            logger.info(f"Backtesting strategy {strategy.id}")
            
            # Log historical data info
            logger.info(f"Historical data for backtest: {len(historical_data)} records")
            
            # Create environment
            env = TradingEnvironment(strategy, historical_data)
            
            # Run backtest
            obs = env.reset()[0]
            done = False
            while not done:
                # Use default parameters (no optimization)
                action = env.action_space.sample()  # Just for testing
                obs, reward, done, _, info = env.step(action)
            
            # Calculate performance metrics
            metrics = env.calculate_performance_metrics()
            
            # Create backtest result
            start_date = historical_data[0].get("timestamp", "") if historical_data else ""
            end_date = historical_data[-1].get("timestamp", "") if historical_data else ""
            
            result = BacktestResult(
                strategy_id=strategy.id or "unknown",
                start_date=start_date,
                end_date=end_date,
                total_return=metrics["total_return"],
                sharpe_ratio=metrics["sharpe_ratio"],
                max_drawdown=metrics["max_drawdown"],
                win_rate=metrics["win_rate"],
                trades=metrics["num_trades"],
                detailed_metrics={"trades": env.trades}
            )
            
            logger.info(f"Backtest complete with return: {metrics['total_return']:.2%}")
            return result
            
        except Exception as e:
            logger.error(f"Error backtesting strategy: {str(e)}")
            # Return a default result if backtesting fails
            return BacktestResult(
                strategy_id=strategy.id or "unknown",
                start_date="",
                end_date="",
                total_return=0.0,
                sharpe_ratio=0.0,
                max_drawdown=0.0,
                win_rate=0.0,
                trades=0,
                detailed_metrics={}
            )


# Create a singleton instance
rl_service = RLService()
