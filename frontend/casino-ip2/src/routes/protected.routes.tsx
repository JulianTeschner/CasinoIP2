import { Route, Routes } from "react-router-dom";
import NotFound from "../views/error/NotFoundView";
import OverviewRoutes from "../views/overview/Overview.routes";
import { RouteName } from "./routesnames";
import Slotmachine from "../views/slotmachine/SlotmachineView";

export default function ProtectedRoutes() {
    return (
        <Routes>
            <Route path={`${RouteName.OVERVIEW}/*`} element={<OverviewRoutes />} />
            <Route path={`${RouteName.BLACKJACK}/*`} element={< BlackjackRoutes />}/>
            <Route path={`${RouteName.SLOTMACHINE}/*`} element={< Slotmachine />} />
            <Route path={`${RouteName.SPORTBET}/*`} element={< SportbetRoutes />} />
            <Route path={`${RouteName.ABOUTUS}/*`} element={<AboutUsRoutes />}/>
            <Route path="/err" element={<NotFound />} />
            <Route path="/register" element={< Register/>}/>
            <Route path="/slotmachine" element={< Slotmachine/>}/>
        </Routes>
    );
}