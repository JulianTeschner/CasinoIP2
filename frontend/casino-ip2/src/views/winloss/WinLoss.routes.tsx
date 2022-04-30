import { Route, Routes } from "react-router-dom";
import WinLoss from "./WinLoss";

export default function WinLossRoutes() {
    return (
        <Routes>
            <Route index element={<WinLoss />} />
        </Routes>
    );
}