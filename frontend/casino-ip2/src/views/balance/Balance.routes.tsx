/* istanbul ignore this file */
import { Route, Routes } from "react-router-dom";
import Balance from "./Balance";

export default function BalanceRoutes() {
    return (
        <Routes>
            <Route index element={<Balance />} />
        </Routes>
    );
}