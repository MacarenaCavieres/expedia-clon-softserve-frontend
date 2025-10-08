import { useState } from "react";
import { NavLink } from "react-router-dom";
import UserIcon from "./UserIcon";

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
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    )}
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
                    <div className="flex justify-center gap-1">
                        <UserIcon />

                        <p className="font-bold">John Smith</p>
                    </div>
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

                    <div className="flex items-center gap-1 py-2 mt-2 border-t w-full justify-center">
                        <UserIcon />
                        <p className="font-bold">John Smith</p>
                    </div>
                </div>
            )}
        </header>
    );
}
export default Header;
