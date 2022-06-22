import { Route, Routes } from "react-router-dom";
import SlotmachineView from "./SlotmachineView";

export default function SlotmachineRoutes() {
    return (
        <Routes>
            <Route index element={<SlotmachineView />} />
        </Routes>
    );
}