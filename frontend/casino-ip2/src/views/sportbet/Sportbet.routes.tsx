/* istanbul ignore file */
import { Route, Routes } from "react-router-dom";
import Sportbet from "./Sportbet";

export default function BlackjackRoutes() {
    return (
        <Routes>
            <Route index element={<Sportbet />} />
        </Routes>
    );
}