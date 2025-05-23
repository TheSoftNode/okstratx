# OKX AI Strategy Lab 🚀

![AI Strategy Lab](https://img.shields.io/badge/AI-Strategy%20Lab-blue)
![Python](https://img.shields.io/badge/Python-3.9%2B-brightgreen)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0%2B-ff69b4)
![LangChain](https://img.shields.io/badge/LangChain-0.3.0%2B-orange)
![WebSockets](https://img.shields.io/badge/WebSockets-15.0.0%2B-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Overview

The **OKX AI Strategy Lab** is a cutting-edge AI-driven platform for generating, optimizing, and executing crypto trading strategies. It combines the power of Large Language Models (LLMs), Reinforcement Learning (RL), and multi-agent systems to create adaptive trading strategies that can respond to market conditions in real-time.

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=OKX+AI+Strategy+Lab" alt="OKX AI Strategy Lab" width="800"/>
</div>

## ✨ Key Features

- **AI-Driven Strategy Generation**: Leverage LLMs and RAG to create customized trading strategies based on user goals
- **Reinforcement Learning Optimization**: Continuously refine strategies using RL for optimal performance
- **Multi-Agent Collaboration**: Utilize specialized agents for data analysis, strategy optimization, and execution
- **Real-Time Execution**: Execute strategies via OKX Swap API with real-time monitoring
- **Risk & Sentiment Analysis**: Incorporate market sentiment and risk assessment into strategy decisions

## 🏗️ Architecture

The AI Strategy Lab is built on a hybrid architecture combining:

1. **RAG (Retrieval-Augmented Generation)** for grounding strategies in historical data
2. **Multi-Agent Framework** (Autogen) for collaborative decision-making
3. **Reinforcement Learning** for parameter optimization
4. **LangChain Orchestration** for workflow management

<div align="center">
  <img src="https://via.placeholder.com/800x500?text=AI+Strategy+Lab+Architecture" alt="Architecture Diagram" width="800"/>
</div>

## 🧩 Core Modules

### 1. Strategy Generation Engine
Uses RAG and LLMs to generate trading strategies based on user goals and market data.

### 2. Adaptive Optimization Engine
Refines strategies using RL and Bayesian optimization, with multi-agent collaboration.

### 3. Real-Time Execution & Monitoring
Executes strategies via OKX Swap API and monitors performance in real-time.

### 4. Real-Time Communication
Implements a WebSocket-based real-time data streaming system as an alternative to Kafka. This provides:

- **Low-latency data streaming**: Real-time market data and trading signals with minimal overhead
- **Bidirectional communication**: Enables both server-to-client and client-to-server messaging
- **Connection management**: Robust handling of client connections, disconnections, and reconnections
- **Channel-based messaging**: Publish/subscribe pattern for targeted data distribution
- **Browser compatibility**: Direct connection from web clients without additional libraries
- **Simplified architecture**: Eliminates the complexity of Kafka setup and maintenance

### 5. Risk & Sentiment Analysis
Mitigates risks using external data and NLP-based sentiment analysis.

## 🛠️ Tech Stack

| Component | Tools/Frameworks |
|-----------|------------------|
| Core LLM | GPT-4, Llama-3, Mistral-7B |
| Multi-Agent System | Autogen |
| Workflow Orchestration | LangChain (StateGraph, Tools, RAG) |
| RL Framework | Stable Baselines3 |
| Data Pipeline | FastAPI WebSockets |
| APIs | OKX Market Data, Swap, and Simulation APIs |

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- OKX API credentials
- OpenAI API key (or other LLM provider)
- Modern web browser for WebSocket client

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-strategy-lab.git
   cd ai-strategy-lab
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

### Running the Application

1. Start the API server:
   ```bash
   python run.py
   ```

2. Access the API documentation:
   ```
   http://localhost:8000/docs
   ```

3. Test the WebSocket functionality:
   ```bash
   # Basic WebSocket example
   python examples/websocket_example.py
   
   # Open the WebSocket client in your browser
   open examples/websocket_client.html
   
   # Run the trading dashboard example
   python examples/trading_dashboard_example.py
   
   # Run the trading strategy example
   python examples/trading_strategy_websocket_example.py
   
   # Simple WebSocket server and client
   python examples/simple_websocket_server.py
   python examples/simple_websocket_client.py
   ```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/strategies` | GET | Get all available strategies |
| `/api/strategies/{strategy_id}` | GET | Get a specific strategy |
| `/api/strategies` | POST | Generate a new strategy |
| `/api/strategies/{strategy_id}/backtest` | POST | Backtest a strategy |
| `/api/strategies/{strategy_id}/deploy` | POST | Deploy a strategy for live trading |
| `/api/strategies/{strategy_id}/performance` | GET | Get performance metrics |
| `/api/market/data/{trading_pair}` | GET | Get market data |
| `/api/market/kline/{trading_pair}` | GET | Get candlestick data |
| `/ws/{channel}` | WebSocket | Real-time data streaming (market_data, strategy_signals, etc.) |

## 📡 WebSocket Examples

The project includes several examples demonstrating the WebSocket-based real-time data streaming implementation:

### 1. Trading Dashboard Example

A web-based dashboard that displays real-time cryptocurrency price data and trading signals:

- Real-time price charts for BTC, ETH, and SOL
- Live trading signals based on moving average crossovers
- Price change indicators and historical data visualization
- Automatic reconnection handling

```bash
python examples/trading_dashboard_example.py
```

### 2. Trading Strategy Example

Implements a simple moving average crossover strategy with WebSocket-based real-time data:

- Generates BUY/SELL signals based on short and long moving averages
- Broadcasts market data and trading signals to connected clients
- Simulates realistic price movements for testing

```bash
python examples/trading_strategy_websocket_example.py
```

### 3. Simple WebSocket Server/Client

Minimal implementation for testing WebSocket functionality:

- Basic server with client connection management
- Message broadcasting to all connected clients
- Simple client for receiving and displaying messages

```bash
python examples/simple_websocket_server.py
python examples/simple_websocket_client.py
```

### 4. Basic WebSocket Example

Demonstrates the core WebSocket functionality with the FastAPI integration:

- Connects to the FastAPI WebSocket endpoints
- Shows how to send and receive messages
- Includes a browser-based client (websocket_client.html)

```bash
python examples/websocket_example.py
```

## 🧪 Testing

Run the test suite with pytest:

```bash
pytest
```

For specific test modules:

```bash
pytest tests/test_rag_service.py
pytest tests/test_rl_service.py
pytest tests/test_execution_service.py
```

## 📈 Performance Metrics

The AI Strategy Lab evaluates strategies using the following metrics:

- **Total Return**: Overall profitability of the strategy
- **Sharpe Ratio**: Risk-adjusted return
- **Maximum Drawdown**: Largest peak-to-trough decline
- **Win Rate**: Percentage of profitable trades
- **API Latency**: Time from signal generation to execution

## 🔄 Implementation Roadmap

### Phase 1 (Completed)
- RAG pipeline with OKX historical data
- Multi-task LLM for strategy drafting
- OKX Market Data API integration
- WebSocket-based real-time communication system
  - Connection management and message broadcasting
  - Trading dashboard with real-time charts
  - Strategy signal generation and distribution
  - Browser and Python client implementations

### Phase 2 (In Progress)
- RL optimization with simulated environments
- Autogen agents for data analysis and execution
- Swap API integration with function calling

### Phase 3 (Planned)
- Stress-testing with Transaction Simulation API
- Sentiment analysis model deployment

## 🛡️ Risk Management

The AI Strategy Lab implements several risk management features:

- **Position Sizing**: Adaptive position sizing based on volatility
- **Stop Loss/Take Profit**: Automatic risk management parameters
- **Simulation Testing**: Pre-execution impact analysis
- **Sentiment Filtering**: Avoid trades during high FUD periods

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- OKX for providing the API infrastructure
- OpenAI for GPT models
- Hugging Face for open-source models
- The LangChain and Autogen communities

---

<div align="center">
  <p>Built with ❤️ by The Bulls Team</p>
</div>
