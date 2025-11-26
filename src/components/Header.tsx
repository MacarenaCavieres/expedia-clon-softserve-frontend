import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { XMarkIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const { auth, clearAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await clearAuth();
        navigate("/");
    };

    const isLogged = !!auth.accessToken;
    const userName = auth.user ? `${auth.user.name}` : undefined;

    return (
        <header className="pt-10 pb-5 max-w-7xl mx-auto px-10">
            <div className="flex justify-between items-center">
                <img src="/logo.svg" alt="Expedia logo" className="w-40 md:w-56" />

                <button
                    onClick={toggleMenu}
                    className="md:hidden cursor-pointer"
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>

                <nav className="hidden md:flex gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/my-trips"
                        className={({ isActive }) =>
                            isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                        }
                    >
                        My trips
                    </NavLink>
                    {isLogged ? (
                        <div className="flex items-center gap-3">
                            <NavLink
                                to="/auth/user-profile"
                                className={({ isActive }) =>
                                    isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                                }
                            >
                                Profile
                            </NavLink>
                            <div className="flex gap-1">
                                <UserCircleIcon className="h-6 w-6" />
                                <p className="font-bold">Welcome, {userName ?? "Guest"}</p>
                            </div>
                            <button onClick={handleLogout} className=" text-blue-800 bold underline hover:text-red-800 cursor-pointer ">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/auth/login"
                            className={({ isActive }) =>
                                isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                            }
                        >
                            Login
                        </NavLink>
                    )}
                </nav>
            </div>

            {isMenuOpen && (
                <div className="md:hidden flex flex-col items-center mt-4 border-t pt-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                        }
                        onClick={toggleMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/my-trips"
                        className={({ isActive }) =>
                            isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                        }
                        onClick={toggleMenu}
                    >
                        My trips
                    </NavLink>

                    {isLogged ? (
                        <div className="flex flex-col items-center gap-3 mt-3">
                            <div className="flex gap-1">
                                <UserCircleIcon className="h-6 w-6" />
                                <p className="font-bold">Welcome, {userName ?? "Guest"}</p>
                            </div>
                            <button
                                onClick={() => {
                                    clearAuth();
                                    navigate("/");
                                }}
                                className="text-sm text-red-600 underline"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink
                            to="/auth/login"
                            onClick={toggleMenu}
                            className="mt-3 text-blue-600 underline"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            )}
        </header>
    );
}
export default Header;
