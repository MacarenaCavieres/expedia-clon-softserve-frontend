import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomeView from "@/views/HomeView";
import TripsView from "@/views/bookings/TripsView";
import CreateBooking from "@/views/bookings/CreateBooking";
import HotelDetailView from "@/views/bookings/HotelDetailView";
import EditBooking from "@/views/bookings/EditBooking";
import AuthLayout from "@/layouts/AuthLayout";
import RegisterView from "@/views/auth/RegisterView";
import LoginView from "@/views/auth/LoginView";
import ProfileView from "@/views/auth/ProfileView";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />} index />
                    <Route path="/my-trips" element={<TripsView />} />
                    <Route path="/create-booking" element={<CreateBooking />} />
                    <Route path="/edit-booking/:bookingId" element={<EditBooking />} />
                    <Route path="/:hotelId" element={<HotelDetailView />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/user-profile" element={<ProfileView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
