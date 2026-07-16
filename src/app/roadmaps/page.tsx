import React, { Suspense } from "react";
import RoadmapCard from "@/components/cards/RoadmapCard";
import RoadmapSkeleton from "@/components/RoadmapSkeleton";
import FilteredRoadmaps from "@/components/FilteredRoadmaps";
import SearchBar from "@/components/SearchBar";
import SortRoadmaps from "@/components/SortRoadmaps";

interface SearchParams {
    search?: string;
    category?: string;
    sort?: string; // সর্টিং প্যারামিটার টাইপ যোগ করা হলো
}

interface MetaInfo {
    price: number;
    rating: number;
    location: string;
    duration: string;
}

interface Roadmap {
    _id: string;
    title: string;
    shortDescription: string;
    imageUrl: string;
    category: string;
    metaInfo?: MetaInfo;
}

const RoadmapsPage = async ({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) => {
    const params = await searchParams;
    const search = params?.search || "";
    const category = params?.category || "";
    const sort = params?.sort || ""; // সর্টিং মান রিসিভ করা হলো

    // ব্যাকএন্ডে sort কোয়েরি প্যারামিটার পাস করা হচ্ছে
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps?search=${search}&category=${category}&sort=${sort}`,
        { cache: "no-store" }
    );

    const data: Roadmap[] = await res.json();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden">
            {/* Background Aesthetic Ambient Glows */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

            <div className="w-11/12 mx-auto max-w-[1400px] relative z-50">
                {/* Header Section */}
                <div className="text-center space-y-3 mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Explore AI-Powered{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                            Roadmaps
                        </span>
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                        Accelerate your tech career with expert-curated paths, precise
                        metadata, and structured learning frameworks.
                    </p>
                </div>

                {/* Search & Filter Shell */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                    <SearchBar />
                    <div className="flex flex-wrap items-center gap-2">
                        <FilteredRoadmaps />
                        <SortRoadmaps /> 
                    </div>
                </div>

                {/* Grid Layout */}
                <Suspense fallback={<RoadmapSkeleton />}>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.map((roadmap: Roadmap) => (
                            <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                        ))}
                    </div>
                </Suspense>

                {data.length === 0 && (
                    <div className="text-center py-20 text-slate-500 border border-dashed border-white/5 rounded-3xl mt-12">
                        No customized roadmaps found matching your query.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoadmapsPage;