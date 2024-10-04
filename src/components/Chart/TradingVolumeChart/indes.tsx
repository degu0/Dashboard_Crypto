import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { CryptoDataVolumeChart } from "../../../services/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

Chart.register(...registerables);

interface TradingVolumeChartProps {
  chartVolumeData: CryptoDataVolumeChart[];
}

const TradingVolumeChart: React.FC<TradingVolumeChartProps> = ({
  chartVolumeData,
}) => {
  const [cryptoData, setCryptoData] = useState<CryptoDataVolumeChart[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setCryptoData(chartVolumeData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [chartVolumeData]);

  const chartData = {
    labels: cryptoData.map((item) =>
      new Date(item.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `Volume de ${id}`,
        data: cryptoData.map((item) => item.volume),
        backgroundColor: "rgba(126, 34, 206, 0.502)",
        borderColor: "rgb(168, 85, 247)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.231)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default TradingVolumeChart;
