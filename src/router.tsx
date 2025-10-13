import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomeView from "@/views/HomeView";
import TripsView from "@/views/bookings/TripsView";
import CreateBooking from "./views/bookings/CreateBooking";
import HotelDetailView from "./views/bookings/HotelDetailView";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />} index />
                    <Route path="/my-trips" element={<TripsView />} />
                    <Route path="/create-booking" element={<CreateBooking />} />
                    <Route path="/:hotelId" element={<HotelDetailView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
