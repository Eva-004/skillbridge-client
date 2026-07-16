'use client';

import React from "react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@heroui/react";
import Link from "next/link";
import MyRoadmapCard from "./cards/MyRoadmapCard";

interface MetaInfo {
  price: number;
  date: string;
  rating: number;
  location: string;
  duration: string;
  level: string;
  category: string;
  isFeatured: boolean;
}

interface Roadmap {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  userEmail?: string;
  metaInfo: MetaInfo;
}

interface FilterRoadmapsProps {
  roadmaps: Roadmap[];
}

const FiltereRoadmaps: React.FC<FilterRoadmapsProps> = ({ roadmaps }) => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const filteredRoadmaps = roadmaps.filter(roadmap => roadmap.userEmail === user?.email);

  return (
    <div className="space-y-6">
      {filteredRoadmaps.length === 0 ? (
        <div className="text-center text-slate-400 text-xl py-20 border border-white/5 bg-slate-900/20 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-4">
          <span>No roadmap added yet.</span>
          <Button className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl px-6'>
            <Link href='/add-roadmaps' className="block">Add Roadmap</Link>
          </Button>
        </div>
      ) : (
        filteredRoadmaps.map(roadmap => (
          <MyRoadmapCard key={roadmap._id} roadmap={roadmap} />
        ))
      )}
    </div>
  );
};

export default FiltereRoadmaps;