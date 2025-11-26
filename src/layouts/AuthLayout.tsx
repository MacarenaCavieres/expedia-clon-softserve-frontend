import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function AuthLayout() {
    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-5 to blue-100">
                <hr className="opacity-20" />
                <main className="flex flex-1 items-center justify-center px-5">
                    <Outlet />
                </main>
                <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            </div>
        </>
    );
}
export default AuthLayout;
