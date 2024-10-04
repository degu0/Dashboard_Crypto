import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "../Theme";
import { MdOutlineWbSunny } from "react-icons/md";

export function ButtonDarkMode() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <button
        type="button"
        onClick={toggleDarkMode}
        className="fixed w-16 h-16 bottom-4 right-4 bg-container-dark dark:bg-white rounded-full text-zinc-200 dark:text-zinc-900 font-semibold z-10"
      >
        <div className="flex justify-center items-center w-full">
          {darkMode ? (
            <>
              <MdOutlineWbSunny className="w-20 h-7 text-yellow-400" />
            </>
          ) : (
            <>
              <FaRegMoon className="w-20 h-6 text-blue-400" />
            </>
          )}
        </div>
      </button>
    </>
  );
}
