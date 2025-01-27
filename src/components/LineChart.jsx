import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const { Title: AntTitle } = Typography;

const LineChart = ({ coinName }) => {
  const initialPrice = 100000; // Example starting price
  const initialMarketCap = 2014995375464; // Example market cap
  const initialVolume24h = 20140964937; // Example 24h volume

  const [coinPrice, setCoinPrice] = useState([initialPrice]); // Prices for the chart
  const [coinTimeStamp, setCoinTimeStamp] = useState([new Date().toLocaleTimeString()]); // Timestamps for the chart
  const [currentPrice, setCurrentPrice] = useState(initialPrice); // Latest price
  const [change, setChange] = useState(0); // Percentage change
  const [direction, setDirection] = useState(''); // Arrow direction ↑ or ↓
  const [marketCap, setMarketCap] = useState(initialMarketCap); // Market cap
  const [volume24h, setVolume24h] = useState(initialVolume24h); // 24h Volume

  useEffect(() => {
    const intervalId = setInterval(() => {
      const prevPrice = currentPrice;

      // Generate a random new price (simulate price movement)
      const newPrice = prevPrice + (Math.random() * 10 - 5); // Random fluctuation between -5 and +5
      const newTimestamp = new Date().toLocaleTimeString();

      // Calculate percentage change
      const percentageChange = ((newPrice - prevPrice) / prevPrice) * 100;

      // Determine direction based on change
      const newDirection = percentageChange > 0 ? '↑' : '↓';

      // Simulate changes to market cap and 24h volume
      const newMarketCap = marketCap + (marketCap * percentageChange) / 100;
      const newVolume24h = volume24h + (volume24h * percentageChange) / 100;

      // Update state
      setCoinPrice((prevPrices) => [...prevPrices, newPrice]);
      setCoinTimeStamp((prevTimes) => [...prevTimes, newTimestamp]);
      setCurrentPrice(newPrice);
      setChange(percentageChange.toFixed(2));
      setDirection(newDirection);
      setMarketCap(newMarketCap);
      setVolume24h(newVolume24h);
    }, 5000); // Update every 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [currentPrice, marketCap, volume24h]);

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: `${coinName} Price in USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: false,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <AntTitle level={2} className="chart-title">
          {coinName} Price Chart
        </AntTitle>
        <Col className="price-container">
          <AntTitle level={5} className="price-change">
            Change: {change}% {direction}
          </AntTitle>
          <AntTitle level={5} className="current-price">
            Current Price: ${currentPrice.toFixed(2)}
          </AntTitle>
        </Col>
      </Row>

      <Line data={data} options={options} />

      <Row className="stats-container">
        <Col>
          <AntTitle level={5} className="market-cap">
            Market Cap: ${marketCap.toFixed(2)}
          </AntTitle>
        </Col>
        <Col>
          <AntTitle level={5} className="volume-24h">
            24h Volume: ${volume24h.toFixed(2)}
          </AntTitle>
        </Col>
      </Row>
    </>
  );
};

export default LineChart;
