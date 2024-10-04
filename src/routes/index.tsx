import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Favorites } from "../pages/Favorites";
import { Chart } from "../pages/Chart";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/chart/:id" element={<Chart />} />
        </Routes>
    );
}
