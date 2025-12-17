import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
    LucideMenu,
    LucideX,
    LucideUser,
    LucideLogOut,
    LucidePlane,
    LucideUserCircle,
    LucideHouse,
} from "lucide-react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { auth, clearAuth } = useAuth();
    const navigate = useNavigate();

    // Efecto para cambiar el estilo al hacer scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await clearAuth();
        setIsMenuOpen(false);
        navigate("/");
    };

    const isLogged = !!auth.accessToken;
    const userName = auth.user ? auth.user.name : "Guest";

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-semibold transition-all duration-200 flex items-center gap-1 px-3 py-2 rounded-lg ${
            isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
        }`;

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                {/* --- LOGO --- */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Logo" className="w-32 md:w-40" />
                </Link>

                {/* --- DESKTOP NAV --- */}
                <nav className="hidden md:flex items-center gap-2">
                    <NavLink to="/" className={navLinkClass}>
                        <LucideHouse size={16} />
                        Home
                    </NavLink>

                    {isLogged ? (
                        <div className="flex items-center gap-4">
                            <NavLink to="/my-trips" className={navLinkClass}>
                                <LucidePlane size={16} /> My Trips
                            </NavLink>
                            <NavLink to="/auth/user-profile" className={navLinkClass}>
                                <LucideUser size={16} /> Profile
                            </NavLink>

                            {/* User Chip */}
                            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold uppercase text-slate-400">
                                        Welcome
                                    </span>
                                    <span className="text-sm font-bold text-slate-800">{userName}</span>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <LucideUserCircle size={20} />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Logout"
                                >
                                    <LucideLogOut size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="h-6 w-[1px] bg-slate-200 mx-2" />
                            <Link
                                to="/auth/login"
                                className="ml-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                            >
                                Sign In
                            </Link>
                        </>
                    )}
                </nav>

                {/* --- MOBILE BUTTON --- */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                    {isMenuOpen ? <LucideX size={28} /> : <LucideMenu size={28} />}
                </button>
            </div>

            {/* --- MOBILE MENU --- */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-6 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col gap-4">
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/my-trips" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
                            My Trips
                        </NavLink>

                        <hr className="border-slate-100" />

                        {isLogged ? (
                            <>
                                <NavLink
                                    to="/auth/user-profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={navLinkClass}
                                >
                                    Profile
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-600 font-bold px-3 py-2 cursor-pointer"
                                >
                                    <LucideLogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/auth/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
