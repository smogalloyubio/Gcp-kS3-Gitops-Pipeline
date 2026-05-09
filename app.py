from flask import Flask, render_template, jsonify
import random
import time
from datetime import datetime, timedelta

app = Flask(__name__)

# Simulated crypto data (in production, replace with real API like CoinGecko)
def generate_price_history(base_price, days=30):
    prices = []
    price = base_price
    now = datetime.utcnow()
    for i in range(days):
        change = random.uniform(-0.05, 0.05)
        price = price * (1 + change)
        timestamp = now - timedelta(days=(days - i))
        prices.append({
            "date": timestamp.strftime("%Y-%m-%d"),
            "price": round(price, 2)
        })
    return prices

def get_mock_crypto_data():
    return [
        {
            "id": "bitcoin",
            "symbol": "BTC",
            "name": "Bitcoin",
            "price": round(random.uniform(60000, 72000), 2),
            "change_24h": round(random.uniform(-5, 5), 2),
            "market_cap": round(random.uniform(1.1e12, 1.4e12), 0),
            "volume_24h": round(random.uniform(25e9, 45e9), 0),
            "icon": "₿",
            "color": "#F7931A"
        },
        {
            "id": "ethereum",
            "symbol": "ETH",
            "name": "Ethereum",
            "price": round(random.uniform(3000, 4000), 2),
            "change_24h": round(random.uniform(-4, 6), 2),
            "market_cap": round(random.uniform(350e9, 480e9), 0),
            "volume_24h": round(random.uniform(12e9, 22e9), 0),
            "icon": "Ξ",
            "color": "#627EEA"
        },
        {
            "id": "solana",
            "symbol": "SOL",
            "name": "Solana",
            "price": round(random.uniform(140, 200), 2),
            "change_24h": round(random.uniform(-6, 7), 2),
            "market_cap": round(random.uniform(60e9, 85e9), 0),
            "volume_24h": round(random.uniform(3e9, 8e9), 0),
            "icon": "◎",
            "color": "#9945FF"
        },
        {
            "id": "bnb",
            "symbol": "BNB",
            "name": "BNB",
            "price": round(random.uniform(380, 520), 2),
            "change_24h": round(random.uniform(-3, 4), 2),
            "market_cap": round(random.uniform(55e9, 80e9), 0),
            "volume_24h": round(random.uniform(1.5e9, 4e9), 0),
            "icon": "⬡",
            "color": "#F3BA2F"
        },
        {
            "id": "cardano",
            "symbol": "ADA",
            "name": "Cardano",
            "price": round(random.uniform(0.35, 0.65), 4),
            "change_24h": round(random.uniform(-4, 5), 2),
            "market_cap": round(random.uniform(12e9, 22e9), 0),
            "volume_24h": round(random.uniform(300e6, 800e6), 0),
            "icon": "₳",
            "color": "#0D1E2D"
        },
    ]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/crypto")
def api_crypto():
    data = get_mock_crypto_data()
    return jsonify(data)

@app.route("/api/crypto/<coin_id>/history")
def api_history(coin_id):
    base_prices = {
        "bitcoin": 65000,
        "ethereum": 3500,
        "solana": 165,
        "bnb": 450,
        "cardano": 0.50
    }
    base = base_prices.get(coin_id, 100)
    history = generate_price_history(base, days=30)
    return jsonify(history)

@app.route("/api/stats")
def api_stats():
    return jsonify({
        "total_market_cap": "$2.31T",
        "total_volume": "$98.4B",
        "btc_dominance": "52.3%",
        "active_coins": "23,841",
        "last_updated": datetime.utcnow().strftime("%H:%M:%S UTC")
    })

@app.route("/health")
def health():
    return jsonify({"status": "healthy", "timestamp": time.time()}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)