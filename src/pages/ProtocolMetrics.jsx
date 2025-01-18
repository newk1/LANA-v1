import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios"; // For API calls
import "../styles/ProtocolMetrics.css";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ProtocolMetrics = () => {
    const [solanaPrice, setSolanaPrice] = useState(null);
    const [marketCap, setMarketCap] = useState(null);
    const [treasuryPool, setTreasuryPool] = useState(50_000_000); // Mock initial value
    const [rewardsPool, setRewardsPool] = useState(12_000_000); // Mock initial value
    const [chartData, setChartData] = useState({
        labels: [], // Time labels
        datasets: [
            {
                label: "Price (USD)",
                data: [], // Price data
                borderColor: "#34ebba",
                backgroundColor: "rgba(52, 235, 186, 0.1)",
                fill: true,
                tension: 0.4,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "#8FAADC" },
            },
            y: {
                grid: { color: "rgba(255, 255, 255, 0.1)" },
                ticks: { color: "#8FAADC" },
            },
        },
        plugins: {
            legend: {
                labels: { color: "#8FAADC" },
            },
        },
    };

    const fetchSolanaData = async () => {
        try {
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/solana?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true"
            );
            const { market_data } = response.data;

            setSolanaPrice(market_data.current_price.usd.toFixed(2));
            setMarketCap((market_data.market_cap.usd / 1e9).toFixed(2) + "B");

            const prices = market_data.sparkline_7d.price;
            const labels = prices.map((_, index) => `Day ${index + 1}`);
            setChartData({
                labels,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: prices,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching Solana data:", error);
        }
    };

    useEffect(() => {
        fetchSolanaData();
        const interval = setInterval(fetchSolanaData, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mt-4">
            {/* Metrics Section */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card futuristic-card text-center shadow-blue">
                        <div className="card-body">
                            <h5 className="card-title">Solana Price</h5>
                            <p className="card-text display-6">
                                {solanaPrice !== null ? `$${solanaPrice}` : "Loading..."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card futuristic-card text-center shadow-blue">
                        <div className="card-body">
                            <h5 className="card-title">Market Cap</h5>
                            <p className="card-text display-6">
                                {marketCap !== null ? marketCap : "Loading..."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card futuristic-card text-center shadow-blue">
                        <div className="card-body">
                            <h5 className="card-title">Treasury Pool</h5>
                            <p className="card-text display-6">
                                ${treasuryPool.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card futuristic-card text-center shadow-blue">
                        <div className="card-body">
                            <h5 className="card-title">Rewards Pool</h5>
                            <p className="card-text display-6">
                                ${rewardsPool.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="card futuristic-card bg-dark text-white shadow-blue">
                <div className="card-body">
                    <h5 className="card-title">Solana Price Chart (Last 7 Days)</h5>
                    <div className="chart-container" style={{ height: "300px" }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProtocolMetrics;
