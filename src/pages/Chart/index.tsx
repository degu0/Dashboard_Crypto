import { useEffect, useState } from "react";
import { getCryptoGraphsDataById } from "../../services/coinGeckoService";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import PriceVariationChart from "../../components/Chart/PriceVariationChart";
import TradingVolumeChart from "../../components/Chart/TradingVolumeChart/indes";
import CurrencyComparisonChart from "../../components/Chart/CurrencyComparisonChart";
import { IsEmptyChart } from "../../components/IsEmpty/Chart";

interface CryptoDataPriceChart {
  timestamp: number;
  prices: number;
}

interface CryptoDataVolumeChart {
  timestamp: number;
  volume: number;
}

export function Chart() {
  const [priceCryptoData, setPriceCryptoData] = useState<
    CryptoDataPriceChart[]
  >([]);
  const [volumeCryptoData, setVolumeCryptoData] = useState<
    CryptoDataVolumeChart[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        if (!id) {
          setError("Invalid ID");
          setLoading(false);
          return;
        }

        const response = await getCryptoGraphsDataById(id);

        const mappedPriceData = response.prices
          ? response.prices.map(([timestamp, price]) => ({
              timestamp,
              prices: price,
            }))
          : [];

        const mappedVolumeData = response.total_volumes
          ? response.total_volumes.map(([timestamp, volume]) => ({
              timestamp,
              volume,
            }))
          : [];

        setPriceCryptoData(mappedPriceData);
        setVolumeCryptoData(mappedVolumeData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchCoins();
    }, 1000);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (priceCryptoData === null && volumeCryptoData === null) {
    return <IsEmptyChart />;
  }

  return (
    <div>
      <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl m-auto flex flex-col gap-5">
        <h1 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-300">
          Gráficos do {id}
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 items-center justify-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-white dark:bg-container-dark opacity-90border-none rounded-xl" />
            <div className="relative z-10 p-4">
              <h1 className="py-4 px-5 text-zinc-800 dark:text-zinc-300 font-semibold text-lg">
                Comparação com outra moeda
              </h1>
              <CurrencyComparisonChart chartPriceData={priceCryptoData} />
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-white dark:bg-container-dark opacity-90border-none rounded-xl" />
            <div className="relative z-10 p-4">
              <h1 className="py-4 px-5 text-zinc-800 dark:text-zinc-300 font-semibold text-lg">
                Volume de negociação
              </h1>
              <TradingVolumeChart chartVolumeData={volumeCryptoData} />
            </div>
          </div>
        </div>
        <div className="relative my-10">
          <div className="absolute inset-0 bg-white dark:bg-container-dark opacity-90border-none rounded-xl" />
          <div className="relative z-10 p-4">
            <h1 className="py-4 px-5 text-zinc-800 dark:text-zinc-300 font-semibold text-lg">
              Preço nos últimos 7 dias
            </h1>
            <PriceVariationChart chartPriceData={priceCryptoData} />
          </div>
        </div>
      </div>
    </div>
  );
}
