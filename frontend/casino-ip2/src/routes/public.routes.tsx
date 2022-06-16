import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../views/error/NotFoundView";
import HomeRoutes from "../views/home/Home.routes";
import RegisterRoutes from "../views/register/Register.routes";
import SlotmachineRoutes from "../views/slotmachine/Slotmachine.routes";
import { RouteName } from "./routesnames";

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path={RouteName.INDEX}
                element={<Navigate to={RouteName.HOME} />} 
            />
            <Route path={`${RouteName.HOME}/*`} element={<HomeRoutes />} />
            <Route path={`${RouteName.REGISTER}/*`} element={<RegisterRoutes />} />
            <Route path={`${RouteName.SLOTMACHINE}/*`} element={<SlotmachineRoutes />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}