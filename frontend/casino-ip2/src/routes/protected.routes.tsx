import { Route, Routes } from "react-router-dom";
import NotFound from "../views/error/NotFoundView";
import OverviewRoutes from "../views/overview/Overview.routes";
import { RouteName } from "./routesnames";
import BlackjackRoutes from "../views/blackjack/Blackjack.routes";
import SportbetRoutes from "../views/sportbet/Sportbet.routes";
import AboutUsRoutes from "../views/aboutus/AboutUs.routes";
import SlotmachineRoutes from "../views/slotmachine/Slotmachine.routes";

export default function ProtectedRoutes() {
    return (
        <Routes>
            <Route path={`${RouteName.OVERVIEW}/*`} element={<OverviewRoutes />} />
            <Route path={`${RouteName.BLACKJACK}/*`} element={< BlackjackRoutes />}/>
            <Route path={`${RouteName.SLOTMACHINE}/*`} element={< SlotmachineRoutes />} />
            <Route path={`${RouteName.SPORTBET}/*`} element={< SportbetRoutes />} />
            <Route path={`${RouteName.ABOUTUS}/*`} element={<AboutUsRoutes />}/>
            <Route path="/err" element={<NotFound />} />
        </Routes>
    );
}