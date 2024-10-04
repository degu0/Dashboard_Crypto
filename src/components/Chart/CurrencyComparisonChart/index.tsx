import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CryptoDataPriceChart } from "../../../services/types";
import { getCryptoGraphsDataById } from "../../../services/coinGeckoService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CurrencyComparisonChartProps {
  chartPriceData: CryptoDataPriceChart[];
}

const CurrencyComparisonChart: React.FC<CurrencyComparisonChartProps> = ({
  chartPriceData,
}) => {
  const [cryptoDataGeneric, setCryptoDataGeneric] = useState<
    CryptoDataPriceChart[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchGenericCryptoData = async () => {
      try {
        const idGeneric = id === "bitcoin" ? "ethereum" : "bitcoin";
        const response = await getCryptoGraphsDataById(idGeneric);
        const mappedPriceDataGeneric = response.prices
          ? response.prices.map(([timestamp, price]) => ({
              timestamp,
              prices: price,
            }))
          : [];

        setCryptoDataGeneric(mappedPriceDataGeneric);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenericCryptoData();
  }, [id]);

  const chartData: ChartData<"line", (number | null)[], string> = {
    labels: chartPriceData.map((item) =>
      new Date(item.timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `Preço do ${id}`,
        data: chartPriceData.map((item) => item.prices),
        fill: false,
        
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(89, 28, 135, 0.539)",
        borderWidth: 2,
        tension: 0.1,
        yAxisID: "y",
      },
      {
        label: id === "bitcoin" ? "Preço do Ethereum" : "Preço do Bitcoin",
        data: cryptoDataGeneric.map((item) => item.prices),
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };


  return <Line data={chartData} options={options} />;
};

export default CurrencyComparisonChart;
