import { TbStar } from "react-icons/tb";
import { Link } from "react-router-dom";

export function IsEmptyFavorite() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-zinc-800 dark:text-zinc-300">
      <div className="text-7xl">
        <TbStar/>
      </div>
      <div className="text-center flex flex-col gap-6">
        <h1 className="text-5xl font-semibold">Os favoritos está vazio!</h1>
        <h3 className="max-w-xl text-lg">
          Volte para <Link to="/" className="text-blue-600 dark:text-purple-600">página inicial</Link> e escolha a criptomoeda que
          queria ter mais atenção!
        </h3>
      </div>
    </div>
  );
}
