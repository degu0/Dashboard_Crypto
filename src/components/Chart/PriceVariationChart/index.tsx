import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { CryptoDataPriceChart } from "../../../services/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface PriceVariationChartProps {
  chartPriceData: CryptoDataPriceChart[];
}

const PriceVariationChart: React.FC<PriceVariationChartProps> = ({
  chartPriceData,
}) => {
  const [cryptoData, setCryptoData] = useState<CryptoDataPriceChart[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setCryptoData(chartPriceData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [chartPriceData]);

  const chartData = {
    labels: cryptoData.map((item) =>
      new Date(item.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `Preço do ${id}`,
        data: cryptoData.map((item) => item.prices),
        fill: false,
        borderColor: "rgb(147, 51, 234)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgb(161, 161, 170)",
        },
      },
      tooltip: {
        titleColor: "rgb(161, 161, 170)",
        bodyColor: "rgb(161, 161, 170)",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
        },
      },
    },
    elements: {
      point: {
        backgroundColor: "rgb(147, 51, 234)",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 rounded-lg w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceVariationChart;
