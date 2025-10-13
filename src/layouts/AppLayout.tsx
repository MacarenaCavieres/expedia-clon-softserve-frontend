import { Outlet } from "react-router-dom";
import Header from "@/components/bookings/Header";
import Footer from "@/components/Footer";

function AppLayout() {
    return (
        <>
            <Header />
            <hr className="opacity-20" />
            <main className="md:max-w-7xl mx-auto px-5 md:px-10 mt-10 min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default AppLayout;
