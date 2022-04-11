import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../views/error/NotFoundView";
import OverviewRoutes from "../views/overview/Overview.routes";
import { RouteName } from "./routesnames";

export default function ProtectedRoutes() {
    return (
        <Routes>
            <Route path={`${RouteName.OVERVIEW}/*`} element={<OverviewRoutes />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}