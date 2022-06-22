/* istanbul ignore file */
import { Route, Routes } from "react-router-dom";
import Sportbet from "./Sportbet";

export default function SportbetRoutes() {
    return (
        <Routes>
            <Route index element={<Sportbet />} />
        </Routes>
    );
}