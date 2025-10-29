import { useState } from "react";
import { NavLink } from "react-router-dom";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
                    <NavLink
                        to="/auth/login"
                        className={({ isActive }) =>
                            isActive ? "text-blue-800 font-bold" : "hover:text-blue-800 font-bold"
                        }
                    >
                        Login
                    </NavLink>
                    {/* <div className="flex justify-center gap-1 items-center">
                        <UserCircleIcon className="h-6 w-6" />
                        <p className="font-bold">John Smith</p> 
                    </div> */}
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

                    {/* <div className="flex items-center gap-1 py-2 mt-2 border-t w-full justify-center">
                        <UserCircleIcon className="h-6 w-6" />
                        <p className="font-bold">John Smith</p> 
                    </div> */}
                </div>
            )}
        </header>
    );
}
export default Header;
