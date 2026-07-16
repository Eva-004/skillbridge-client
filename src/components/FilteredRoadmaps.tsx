"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoryItem {
    key: string;
    label: string;
}

const FilteredRoadmaps = () => {
    const roadmapCategories: CategoryItem[] = [
        { key: "Web Development", label: "Web Development" },
        { key: "Artificial Intelligence", label: "Artificial Intelligence" },
        { key: "Competitive Programming", label: "Competitive Programming" },
        { key: "Design", label: "UI/UX Design" },
        { key: "Cloud & DevOps", label: "Cloud & DevOps" },
        { key: "Cybersecurity", label: "Cybersecurity" },
        { key: "Databases", label: "Databases" },
        { key: "Mobile Apps", label: "Mobile App Dev" },
        { key: "Management", label: "Tech Management" },
        { key: "Blockchain", label: "Blockchain & Web3" },
        { key: "Data Science", label: "Data Science" }
    ];

    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>(
        searchParams.get('category') || 'all'
    );

    const handleFilter = (key: string) => {
        const value = String(key);
        setSelectedCategory(value);
        if (key === 'all') {
            router.push('/roadmaps');
        } else {
            router.push(`/roadmaps?category=${value}`);
        }
    };

    return (
        <div className="">
            <div className="dropdown dropdown-start">
                <div 
                    tabIndex={0} 
                    role="button" 
                    className="btn font-bold m-1 bg-slate-950/60 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                    Filter by Category ⬇️
                </div>
                <ul 
                    tabIndex={-1} 
                    className="dropdown-content menu bg-slate-900 border border-white/10 rounded-box z-40 w-52 p-2 shadow-2xl text-slate-300"
                >
                    <li  
                        onClick={() => handleFilter('all')}
                        className={`rounded-lg mb-0.5 transition-colors cursor-pointer
                            ${selectedCategory === 'all' 
                                ? 'active bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold' 
                                : 'hover:bg-white/5 hover:text-cyan-400'
                            }`}
                    > 
                        <a>All Categories</a>
                    </li>
                    {
                        roadmapCategories.map(category => (
                            <li 
                                key={category.key} 
                                onClick={() => handleFilter(category.key)} 
                                className={`rounded-lg mb-0.5 transition-colors cursor-pointer
                                    ${selectedCategory === category.key 
                                        ? 'active bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold' 
                                        : 'hover:bg-white/5 hover:text-cyan-400'
                                    }`}
                            >
                                <a>{category.label}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default FilteredRoadmaps;