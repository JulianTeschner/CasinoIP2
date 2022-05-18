/* istanbul ignore this file */
import { Route, Routes } from "react-router-dom";
import Logout from "./Logout";

export default function LogoutRoutes() {
    return (
        <Routes>
            <Route index element={<Logout />} />
        </Routes>
    );
}