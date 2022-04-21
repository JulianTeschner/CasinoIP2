/* istanbul ignore file */
import { Route, Routes } from "react-router-dom";
import Blackjack from "./Blackjack";

export default function BlackjackRoutes() {
    return (
        <Routes>
            <Route index element={<Blackjack />} />
        </Routes>
    );
}