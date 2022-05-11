import { Route, Routes } from "react-router-dom";
import NotFound from "../views/error/NotFoundView";
import OverviewRoutes from "../views/overview/Overview.routes";
import { RouteName } from "./routesnames";
import Slotmachine from "../views/slotmachine/Slotmachine";
import BlackjackRoutes from "../views/blackjack/Blackjack.routes";
import AboutUsRoutes from "../views/aboutus/AboutUs.routes";

export default function ProtectedRoutes() {
    return (
        <Routes>
            <Route path={`${RouteName.OVERVIEW}/*`} element={<OverviewRoutes />} />
            <Route path={`${RouteName.BLACKJACK}/*`} element={< BlackjackRoutes />}/>
            <Route path={`${RouteName.SLOTMACHINE}/*`} element={< Slotmachine />} />
            <Route path={`${RouteName.ABOUTUS}/*`} element={<AboutUsRoutes />}/>
            <Route path="/err" element={<NotFound />} />
        </Routes>
    );
}