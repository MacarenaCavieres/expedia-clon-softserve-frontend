import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomeView from "@/views/HomeView";
import TripsView from "@/views/bookings/TripsView";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />} index />
                    <Route path="/my-trips" element={<TripsView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
