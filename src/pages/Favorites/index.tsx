import { useEffect, useState } from "react";
import type { CryptData } from "../../services/types";
import { getCryptoDataById } from "../../services/coinGeckoService";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { Erro } from "../../components/Erro";
import DialogHistoryFavorite from "../../components/Dialog";

export function Favorites() {
  const [cryptoData, setCryptoData] = useState<CryptData[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storeIds = localStorage.getItem("cryptoIds");
    if (storeIds) {
      setIds(JSON.parse(storeIds));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const allData = await Promise.all(
          ids.map((id) => getCryptoDataById(id))
        );
        const flattenedData = allData.flat();
        setCryptoData(flattenedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (ids.length > 0) {
      fetchCoins();
    } else {
      setLoading(false);
    }
  }, [ids]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Erro />;
  }

  return (
    <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-16 mx-auto mt-10 mb-20">
      <div className="flex justify-around items-center">
        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Favoritos</h1>
        <DialogHistoryFavorite />
      </div>
      <Table>{cryptoData}</Table>
    </div>
  );
}
