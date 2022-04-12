import { Route, Routes } from "react-router-dom";
import Overview from "./Overview";

export default function OverviewRoutes() {
    return (
        <Routes>
            <Route index element={<Overview />} />
        </Routes>
    );
}