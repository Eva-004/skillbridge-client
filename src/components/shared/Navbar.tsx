'use client';

import Image from "next/image";
import NavLink from "./NavLink";
import Link from "next/link";
import { toast } from "react-toastify";
import ProfileDropdown from "./ProfileDropdown";
import { Moon, Sun } from "@gravity-ui/icons";
import ThemeToggle from "../ThemeToggle";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const links = (
        <>
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/explore">Explore Roadmaps</NavLink></li>
            <li><NavLink href="/about">About</NavLink></li>
            <li><NavLink href="/contact">Contact</NavLink></li>
        </>
    );

    const userSpecificRoute = (
        <>
            <li><NavLink href="/dashboard">Dashboard</NavLink></li>
        </>
    );

    const loginRegister = (
        <>
            <li>
                <Link
                    href="/login"
                    className="block rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-center py-2 hover:opacity-90 transition-all duration-300"
                >
                    Login
                </Link>
            </li>

            <li>
                <Link
                    href="/register"
                    className="block rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-center py-2 hover:opacity-90 transition-all duration-300"
                >
                    Register
                </Link>
            </li>
        </>
    );

    const icons = {
        darkMode: {
            off: Moon,
            on: Sun,
            selectedControlClass: "",
        },
    };

    const userData = authClient.useSession();
    const user = userData?.data?.user;

    const router = useRouter();

    const handleLogOut = async () => {
        await authClient.signOut();
        toast.success("Logout successfully!");
        router.push("/login");
    };

    return (
        <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
            <div className="navbar w-11/12 mx-auto">

               
                <div className="navbar-start">

                   
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden text-slate-700 dark:text-slate-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-2"
                        >
                            {links}

                            {user && userSpecificRoute}

                            {user && (
                                <li className="mt-2">
                                    <button
                                        onClick={handleLogOut}
                                        className="w-full rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white hover:opacity-90 transition-all duration-300"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}

                            {!user && loginRegister}

                            <li className="mt-2">
                                <ThemeToggle value={icons.darkMode} />
                            </li>
                        </ul>
                    </div>

                   
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/logo.png"
                            alt="SkillBridge AI"
                            width={40}
                            height={40}
                            className="object-cover"
                        />

                        <h2 className="text-xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            SkillBridge AI
                        </h2>
                    </Link>
                </div>

                
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-slate-700 dark:text-slate-200">
                        {links}
                        {user && userSpecificRoute}
                    </ul>
                </div>

                
                {!user ? (
                    <div className="navbar-end hidden md:flex items-center gap-4">

                        <ThemeToggle value={icons.darkMode} />

                        <Link href="/login">
                            <button className="btn btn-outline border-0 text-indigo-600 dark:border-indigo-400 dark:text-white hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300">
                                Login
                            </button>
                        </Link>

                        <Link href="/register">
                            <button className="btn border-0 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300">
                                Register
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="navbar-end flex items-center gap-3">

                        <ThemeToggle value={icons.darkMode} />

                        <ProfileDropdown
                            handleLogOut={handleLogOut}
                            image={user.image}
                            name={user.name}
                            email={user.email}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;