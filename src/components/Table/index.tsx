import {
  TbCaretDownFilled,
  TbCaretUpDownFilled,
  TbCaretUpFilled,
  TbStar,
  TbStarFilled,
} from "react-icons/tb";
import type { CryptData, DialogFavoriteType } from "../../services/types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IsEmptyFavorite } from "../IsEmpty/Favorite";


export const Table: React.FC<{ children: CryptData[] }> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const [isDescending, setIsDescending] = useState<boolean | null>(null);
  const [dataFavorite, setDataFavorite] = useState<DialogFavoriteType[]>([]);
  const location = useLocation();

  useEffect(() => {
    const storedIds = localStorage.getItem("cryptoIds");
    const storedFavorites = localStorage.getItem("favoriteHistory");

    if (storedIds) {
      setIds(JSON.parse(storedIds));
    }

    if (storedFavorites) {
      setDataFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  const handleChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    newId: string
  ) => {
    const updatedIds = e.target.checked
      ? [...ids, newId]
      : ids.filter((id) => id !== newId);

    const newStatus = e.target.checked ? "Favoritado" : "Desfavoritado";
    const dateUpdateId = new Date().getTime();
    const newFavorite: DialogFavoriteType = {
      nameFavorite: newId,
      statusFavorite: newStatus,
      dateFavorite: dateUpdateId,
    };

    setIds(updatedIds);
    setDataFavorite((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, newFavorite];
      localStorage.setItem("favoriteHistory", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });

    localStorage.setItem("cryptoIds", JSON.stringify(updatedIds));
  };

  const handleSortClick = () => {
    if (isDescending === null) {
      setIsDescending(true);
    } else if (isDescending) {
      setIsDescending(false);
    } else {
      setIsDescending(null);
    }
  };

  const filteredItems =
    location.pathname === "/"
      ? children
      : children.filter((data) => ids.includes(data.id));

  if (location.pathname !== "/" && ids.length === 0) {
    return <IsEmptyFavorite />;
  }

  const sortedItems =
    isDescending != null
      ? [...filteredItems].sort((a, b) =>
          isDescending
            ? b.price_change_percentage_24h - a.price_change_percentage_24h
            : a.price_change_percentage_24h - b.price_change_percentage_24h
        )
      : filteredItems;

  return (
    <>
      <table className="w-full border-collapse text-zinc-800 dark:text-zinc-300 text-xs md:text-base">
        <thead>
          <tr className="border-b border-dashed border-zinc-400 dark:border-zinc-600">
            <th className="text-center">Nome</th>
            <th className="text-center">Valor em Dollar</th>
            <th className="text-center">
              Porcentagem em 24 horas
              <button type="button" onClick={handleSortClick} className="mx-2">
                {isDescending === null ? (
                  <TbCaretDownFilled />
                ) : isDescending ? (
                  <TbCaretUpFilled />
                ) : (
                  <TbCaretUpDownFilled />
                )}
              </button>
            </th>
            <th className="text-center">Ação</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.slice(0, visibleCount).map((coin) => (
            <tr
              key={coin.id}
              className="border-b border-zinc-300 dark:border-zinc-600"
            >
              <td className="flex flex-col md:flex-row md:py-4 md:justify-center items-center text-left">
                <Link
                  to={`/chart/${coin.id}`}
                  title="Chart"
                  className="font-bold flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 py-2"
                >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="rounded-full w-7"
                />
                  {coin.name}
                </Link>
              </td>
              <td className="text-center font-medium">
                ${Number(coin.current_price).toFixed(2)}
              </td>
              <td
                className={`text-center font-medium ${
                  coin.price_change_percentage_24h < 0
                    ? "text-red-600 dark:text-red-500"
                    : "text-green-600 dark:text-green-500"
                }`}
              >
                {Number(coin.price_change_percentage_24h * 100).toFixed(2)}%
              </td>
              <td className="max-w-min md:px-10">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    id={`favorite-${coin.id}`}
                    checked={ids.includes(coin.id)}
                    onChange={(e) => handleChecked(e, coin.id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`favorite-${coin.id}`}
                    className="w-6 h-6 border-2 border-gray-300 border-none flex items-center justify-center cursor-pointer"
                  >
                    {ids.includes(coin.id) ? (
                      <TbStarFilled className="text-blue-600 dark:text-purple-600" />
                    ) : (
                      <TbStar className="text-zinc-800 dark:text-zinc-300" />
                    )}
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
