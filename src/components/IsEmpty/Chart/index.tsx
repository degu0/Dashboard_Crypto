import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

export function IsEmptyChart() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 text-zinc-800 dark:text-zinc-300">
      <div className="text-7xl">
        <FaChartBar />
      </div>
      <div className="text-center flex flex-col gap-6">
        <h1 className="text-5xl font-semibold">Dados não encontrado.</h1>
        <h3 className="max-w-xl text-lg">
          Por favor, volte para{" "}
          <Link to="/" className="text-blue-600 dark:text-purple-600">
            página inicial
          </Link>{" "}
          e escolha outra criptomoeda que queria ter mais informação!
        </h3>
      </div>
    </div>
  );
}
