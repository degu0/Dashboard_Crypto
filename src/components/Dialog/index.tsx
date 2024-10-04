import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { DialogFavoriteType } from "../../services/types";

interface DialogHistoryFavorite {
  dialogData: DialogFavoriteType[];
}

export default function DialogHistoryFavorite() {
  const [open, setOpen] = useState(false);
  const [dataFavorite, setDataFavorite] = useState<DialogFavoriteType[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteHistory");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setDataFavorite(parsedFavorites);
    }
  }, []);

  return (
    <>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 dark:bg-purple-600 text-sm lg:text-base text-zinc-50 rounded-md"
        onClick={() => setOpen(true)}
      >
        Histórico de Favoritos
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-zinc-50 dark:bg-container-dark px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h2"
                    className="text-lg font-semibold leading-6 text-zinc-800 dark:text-zinc-100"
                  >
                    Histórico de Favoritos
                  </DialogTitle>
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    <table className="w-full text-center border-collapse text-zinc-800 dark:text-zinc-300">
                      <thead>
                        <tr className="border-b border-zinc-300 dark:border-zinc-600">
                          <th className="p-2">Nome</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataFavorite.map((data) => (
                          <tr
                            key={data.dateFavorite}
                            className="border-b border-zinc-300 dark:border-zinc-600"
                          >
                            <td className="p-2">{data.nameFavorite}</td>
                            <td className="p-2">{data.statusFavorite}</td>
                            <td className="p-2">
                              {new Date(data.dateFavorite).toLocaleDateString(
                                "pt-BR"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 dark:bg-container-dark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 dark:bg-purple-600 px-3 py-2 text-sm font-semibold text-zinc-50 shadow-sm hover:bg-blue-500 hover:dark:bg-purple-500 sm:ml-3 sm:w-auto"
                >
                  Fechar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
