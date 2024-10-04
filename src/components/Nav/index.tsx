import { NavLink, useLocation } from "react-router-dom";


export function Nav() {
  const location = useLocation();
  
  return (
    <div className="text-black dark:text-zinc-200 flex items-center h-16">
      <ul className="p-0 w-full flex items-center justify-around gap-16">
        <li className="ml-4 font-bold text-xl">CoinDash</li>
        <div className="flex space-x-20">
          <li>
            <div className="relative inline-block">
              <NavLink
                to="/"
                title="Home"
                className={({ isActive }) =>
                  `w-full flex justify-start items-center relative group ${
                    isActive ? "text-blue-600 dark:text-purple-600" : "text-zinc-800 dark:text-zinc-300"
                  }`
                }
              >
                Home
              </NavLink>
              <span
                className={`absolute left-0 right-0 h-1 bg-blue-600 dark:bg-purple-600 mt-1 rounded transition-all duration-300 transform ${
                  location.pathname === "/" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          </li>
          <li>
            <div className="relative inline-block">
              <NavLink
                to="/favorites"
                title="Favorites"
                className={({ isActive }) =>
                  `w-full flex justify-start items-center relative group ${
                    isActive ? "text-blue-600 dark:text-purple-600" : "text-zinc-800 dark:text-zinc-300"
                  }`
                }
              >
                Favorites
              </NavLink>
              <span
                className={`absolute left-0 right-0 h-1 bg-blue-600 dark:bg-purple-600 mt-1 rounded transition-all duration-300 transform ${
                  location.pathname === "/favorites" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}
