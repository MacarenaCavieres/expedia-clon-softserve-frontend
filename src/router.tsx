import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomeView from "@/views/HomeView";
import TripsView from "@/views/bookings/TripsView";
import ProtectedRoute from "@/components/ProtectedRoute";
import CreateBooking from "@/views/bookings/CreateBooking";
import HotelDetailView from "@/views/bookings/HotelDetailView";
import EditBooking from "@/views/bookings/EditBooking";
import AuthLayout from "@/layouts/AuthLayout";
import RegisterView from "@/views/auth/RegisterView";
import LoginView from "@/views/auth/LoginView";
import ProfileView from "@/views/auth/ProfileView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import ResetPasswordView from "./views/auth/ResetPasswordView";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />} index />
                    <Route
                        path="/my-trips"
                        element={
                            <ProtectedRoute>
                                <TripsView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-booking"
                        element={
                            <ProtectedRoute>
                                <CreateBooking />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/edit-booking/:bookingId" element={<EditBooking />} />
                    <Route path="/:hotelId" element={<HotelDetailView />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/reset-password" element={<ResetPasswordView />} />
                    <Route path="/auth/user-profile" element={<ProfileView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
