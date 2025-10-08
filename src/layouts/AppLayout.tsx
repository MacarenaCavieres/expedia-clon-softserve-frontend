import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AppLayout() {
    return (
        <>
            <Header />
            <hr className="opacity-20" />
            <main className="max-w-7xl mx-auto px-10 mt-10">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default AppLayout;
