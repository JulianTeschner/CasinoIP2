import { Route, Routes } from "react-router-dom";
import AboutUs from "./AboutUsView";

export default function AboutUsRoutes() {
    return (
        <Routes>
            <Route index element={<AboutUs />} />
        </Routes>
    );
}