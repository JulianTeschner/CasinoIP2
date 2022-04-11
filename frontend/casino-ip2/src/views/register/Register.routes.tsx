import { Route, Routes } from "react-router-dom";
import RegisterView from "./RegisterView";

export default function RegisterRoutes() {
    return (
        <Routes>
            <Route index element={<RegisterView />} />
        </Routes>
    );
}