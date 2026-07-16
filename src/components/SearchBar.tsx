"use client";

import React, { useState, ChangeEvent } from 'react';
import { Label, SearchField } from '@heroui/react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/roadmaps?search=${search}`);
    };

    return (
        <div className='flex gap-4 items-end'>
            <SearchField name="search" onClear={() => setSearch('')}>
                <Label className='font-bold text-sm text-slate-300 mb-1.5 block'>Search Roadmap</Label>
                <SearchField.Group className="bg-slate-950/60 border border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-colors flex items-center px-3">
                    <SearchField.SearchIcon className="text-slate-400 text-sm" />
                    <SearchField.Input 
                        value={search} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="w-40 sm:w-70 bg-transparent text-white placeholder:text-slate-600 focus:outline-none py-2.5 px-2 text-sm" 
                        placeholder="Search your desired roadmap..." 
                    />
                    <SearchField.ClearButton className="text-slate-400 hover:text-white transition-colors" />
                </SearchField.Group>
            </SearchField>

            <button 
                onClick={handleSearch} 
                className='font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white rounded-xl px-6 py-2.5 text-sm transition-all duration-300 shadow-md shadow-indigo-950 h-[42px]'
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;