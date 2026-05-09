let chart = null;
let activeCoin = "bitcoin";
let cryptoData = [];

// Clock
function updateClock() {
  const now = new Date();
  const utc = now.toUTCString().split(" ")[4] + " UTC";
  document.getElementById("clock").textContent = utc;
}
setInterval(updateClock, 1000);
updateClock();

// Format helpers
function fmt(n, decimals = 2) {
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtPrice(price) {
  if (price < 1) return "$" + price.toFixed(4);
  if (price < 100) return "$" + price.toFixed(2);
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Load global stats
async function loadStats() {
  const res = await fetch("/api/stats");
  const data = await res.json();
  document.getElementById("stat-mcap").textContent = data.total_market_cap;
  document.getElementById("stat-vol").textContent = data.total_volume;
  document.getElementById("stat-dom").textContent = data.btc_dominance;
  document.getElementById("stat-coins").textContent = data.active_coins;
  document.getElementById("footer-update").textContent = "Last updated: " + data.last_updated;
}

// Load coin cards
async function loadCoins() {
  const res = await fetch("/api/crypto");
  cryptoData = await res.json();
  const grid = document.getElementById("coins-grid");
  grid.innerHTML = "";

  cryptoData.forEach((coin, i) => {
    const card = document.createElement("div");
    card.className = "coin-card" + (coin.id === activeCoin ? " active" : "");
    card.style.setProperty("--coin-color", coin.color);
    card.style.animationDelay = (i * 0.08) + "s";
    const isPos = coin.change_24h >= 0;
    card.innerHTML = `
      <div class="coin-card-top">
        <div class="coin-icon" style="color:${coin.color}">${coin.icon}</div>
        <span class="coin-symbol">${coin.symbol}</span>
      </div>
      <div class="coin-name">${coin.name}</div>
      <div class="coin-price">${fmtPrice(coin.price)}</div>
      <div class="coin-change ${isPos ? "positive" : "negative"}">
        ${isPos ? "▲" : "▼"} ${Math.abs(coin.change_24h)}%
      </div>
      <div class="coin-meta">
        <span>MCap ${fmt(coin.market_cap)}</span>
        <span>Vol ${fmt(coin.volume_24h)}</span>
      </div>
    `;
    card.addEventListener("click", () => selectCoin(coin.id));
    grid.appendChild(card);
  });
}

// Select a coin and load its chart
async function selectCoin(coinId) {
  activeCoin = coinId;
  document.querySelectorAll(".coin-card").forEach(c => c.classList.remove("active"));
  const cards = document.querySelectorAll(".coin-card");
  const coin = cryptoData.find(c => c.id === coinId);
  if (coin) {
    const idx = cryptoData.indexOf(coin);
    if (cards[idx]) cards[idx].classList.add("active");
    const isPos = coin.change_24h >= 0;
    document.getElementById("chart-coin-name").textContent = coin.name;
    document.getElementById("chart-price").textContent = fmtPrice(coin.price);
    const changeEl = document.getElementById("chart-change");
    changeEl.textContent = (isPos ? "▲ +" : "▼ ") + coin.change_24h + "% (24h)";
    changeEl.className = "chart-change " + (isPos ? "positive" : "negative");
  }
  await loadChart(coinId);
}

// Load and render chart
async function loadChart(coinId) {
  const res = await fetch(`/api/crypto/${coinId}/history`);
  const history = await res.json();
  const labels = history.map(h => h.date.slice(5));
  const prices = history.map(h => h.price);
  const coin = cryptoData.find(c => c.id === coinId);
  const color = coin ? coin.color : "#f7931a";

  if (chart) chart.destroy();

  const ctx = document.getElementById("priceChart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, color + "33");
  gradient.addColorStop(1, color + "00");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        data: prices,
        borderColor: color,
        borderWidth: 2,
        fill: true,
        backgroundColor: gradient,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#18181f",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          titleColor: "#6b6b80",
          bodyColor: "#f0f0f5",
          bodyFont: { family: "'Space Mono', monospace", size: 12 },
          titleFont: { family: "'Space Mono', monospace", size: 10 },
          callbacks: {
            label: ctx => " " + fmtPrice(ctx.parsed.y)
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#6b6b80",
            font: { family: "'Space Mono', monospace", size: 10 },
            maxTicksLimit: 8
          },
          border: { display: false }
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: {
            color: "#6b6b80",
            font: { family: "'Space Mono', monospace", size: 10 },
            callback: v => fmtPrice(v)
          },
          border: { display: false }
        }
      }
    }
  });
}

// Init
async function init() {
  await Promise.all([loadStats(), loadCoins()]);
  await selectCoin("bitcoin");
}

// Refresh every 30 seconds
setInterval(async () => {
  await loadStats();
  await loadCoins();
  await loadChart(activeCoin);
}, 30000);

init();

init();