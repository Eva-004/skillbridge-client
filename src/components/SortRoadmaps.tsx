"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SortRoadmaps = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedSort, setSelectedSort] = useState<string>(
        searchParams.get('sort') || ''
    );

    useEffect(() => {
        setSelectedSort(searchParams.get('sort') || '');
    }, [searchParams]);

    const handleSort = (sortKey: string) => {
        setSelectedSort(sortKey);
        const queryParams = new URLSearchParams(searchParams.toString());

        if (sortKey === 'none') {
            queryParams.delete('sort');
        } else {
            queryParams.set('sort', sortKey);
        }

        router.push(`/roadmaps?${queryParams.toString()}`);
    };

    return (
        <div className="">
            <div className="dropdown dropdown-start">
                <div 
                    tabIndex={0} 
                    role="button" 
                    className="btn font-bold m-1 bg-slate-950/60 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                    Sort by Price ⇅
                </div>
                <ul 
                    tabIndex={-1} 
                    className="dropdown-content menu bg-slate-900 border border-white/10 rounded-box z-45 w-52 p-2 shadow-2xl text-slate-300"
                >
                    <li  
                        onClick={() => handleSort('none')}
                        className={`rounded-lg mb-0.5 transition-colors cursor-pointer
                            ${selectedSort === '' 
                                ? 'active bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold' 
                                : 'hover:bg-white/5 hover:text-cyan-400'
                            }`}
                    > 
                        <a>Default Order</a>
                    </li>
                    <li  
                        onClick={() => handleSort('asc')}
                        className={`rounded-lg mb-0.5 transition-colors cursor-pointer
                            ${selectedSort === 'asc' 
                                ? 'active bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold' 
                                : 'hover:bg-white/5 hover:text-cyan-400'
                            }`}
                    > 
                        <a>Price: Low to High</a>
                    </li>
                    <li  
                        onClick={() => handleSort('desc')}
                        className={`rounded-lg mb-0.5 transition-colors cursor-pointer
                            ${selectedSort === 'desc' 
                                ? 'active bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold' 
                                : 'hover:bg-white/5 hover:text-cyan-400'
                            }`}
                    > 
                        <a>Price: High to Low</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SortRoadmaps;