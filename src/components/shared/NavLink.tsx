"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
    href: string;
    children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`
                px-4 py-2 rounded-lg font-medium transition-all duration-300

                ${
                    isActive
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-cyan-400"
                }
            `}
        >
            {children}
        </Link>
    );
};

export default NavLink;