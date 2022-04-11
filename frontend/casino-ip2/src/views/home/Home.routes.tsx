import { Route, Routes } from "react-router-dom";
import Home from "./Home";

export default function HomeRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    );
}