import { Route, Routes } from "react-router-dom";
import Mail from "./MailView";

export default function MailRoutes() {
    return (
        <Routes>
            <Route index element={<Mail />} />
        </Routes>
    );
}