import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <>
            <Header />
            <hr className="opacity-20" />
            <main className="md:max-w-7xl mx-auto px-5 md:px-10 mt-10 min-h-screen">
                <Outlet />
            </main>
        </>
    );
}
export default AuthLayout;
