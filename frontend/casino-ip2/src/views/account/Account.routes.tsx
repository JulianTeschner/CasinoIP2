import { Route, Routes } from "react-router-dom";
import Account from "./AccountView";

export default function AccountRoutes() {
    return (
        <Routes>
            <Route index element={<Account />} />
        </Routes>
    );
}