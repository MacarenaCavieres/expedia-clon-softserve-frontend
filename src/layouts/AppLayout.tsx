import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
    return (
        <>
            <Header />
            <hr className="opacity-20" />
            <main className="md:max-w-7xl mx-auto px-5 md:px-10 mt-10 min-h-screen">
                <Outlet />
            </main>
            <Footer />

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}
export default AppLayout;
