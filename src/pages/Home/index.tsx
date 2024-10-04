import { useEffect, useState } from "react";
import { getAllCryptosData } from "../../services/coinGeckoService";
import type { CryptData } from "../../services/types";
import { Loader } from "../../components/Loader";
import { IoSearch } from "react-icons/io5";
import { Table } from "../../components/Table";

export function Home() {
  const [cryptoData, setCryptoData] = useState<CryptData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await getAllCryptosData();
        setCryptoData(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchCoins();
    }, 1000);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = cryptoData.filter((data) =>
    data.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-10 mx-auto mt-10 mb-20">
      <div className="relative text-zinc-800">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="bg-zinc-200 dark:bg-container-dark placeholder-zinc-800 dark:placeholder-zinc-200 
          dark:text-zinc-200 border-none rounded py-2 pl-10 pr-4 w-full outline-none"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearch />
        </div>
      </div>

      {error && <p>Error: {error}</p>}
      
      <Table>{filteredItems}</Table>
    </div>
  );
}
