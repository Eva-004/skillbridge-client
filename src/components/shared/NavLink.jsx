"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href, children}) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    return (
       <Link href={href} className={`${isActive ? "bg-slate-200 dark:bg-slate-800 text-[#1E3A8A]  font-bold" : ""}`}>
        {children}
       </Link>
    );
};

export default NavLink;