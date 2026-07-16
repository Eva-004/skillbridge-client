import React from "react";
import { Card, CardFooter } from "@heroui/react";

const RoadmapSkeleton = () => {
    // Generates a mock array of 8 components matching the listing configuration
    const skeletonItems = Array.from({ length: 8 });

    return (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skeletonItems.map((_, index) => (
                <Card key={index} className="w-full h-[450px] bg-slate-900/40 border border-white/5 rounded-2xl animate-pulse flex flex-col justify-between">
                    {/* Visual Media Placeholder */}
                    <div className="w-full h-44 bg-slate-800/60" />

                    {/* Content Placeholders */}
                    <div className="p-4 flex flex-col flex-grow gap-3">
                        <div className="h-5 bg-slate-800 rounded-md w-5/6" />
                        <div className="h-4 bg-slate-800 rounded-md w-full" />
                        <div className="h-4 bg-slate-800 rounded-md w-2/3" />
                        
                        {/* Meta Grid Placeholder */}
                        <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-white/5">
                            <div className="h-3 bg-slate-800 rounded w-3/4" />
                            <div className="h-3 bg-slate-800 rounded w-2/3" />
                            <div className="h-3 bg-slate-800 rounded w-1/2" />
                            <div className="h-3 bg-slate-800 rounded w-1/3" />
                        </div>
                    </div>

                    {/* Action Button Placeholder */}
                    <CardFooter className="p-4 pt-0">
                        <div className="w-full h-10 bg-slate-800 rounded-xl" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default RoadmapSkeleton;