'use client';

import React from 'react';
import { Card } from '@heroui/react';
import Image from 'next/image';
import UpdatedRoadmap from '../UpdatedRoadmap';
import DeleteRoadmap from '../DeleteRoadmap';


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

interface MyRoadmapCardProps {
  roadmap: Roadmap;
}

const MyRoadmapCard: React.FC<MyRoadmapCardProps> = ({ roadmap }) => {
  return (
    <Card className='flex flex-col md:flex-row justify-between gap-6 md:items-center bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-xl'>
      <div className='flex flex-col md:flex-row gap-6 items-center flex-1 w-full'>
        <div className='relative w-full md:w-48 h-32 flex-shrink-0'>
          <Image 
            src={roadmap?.imageUrl} 
            alt={roadmap?.title || 'roadmap title'} 
            fill 
            className='object-cover rounded-2xl border border-white/5'
            sizes="(max-w-768px) 100vw, 192px"
          />
        </div>
        <div className='space-y-2.5 w-full'>
          <h2 className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent'>
            {roadmap.title}
          </h2>
          <p className='text-sm text-slate-300 line-clamp-2 max-w-xl'>
            {roadmap.shortDescription}
          </p>
          <div className='flex flex-wrap gap-2 pt-1 text-xs font-semibold'>
            <span className='px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'>
              {roadmap.metaInfo.category}
            </span>
            <span className='px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'>
              {roadmap.metaInfo.level}
            </span>
            <span className='px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'>
              ${roadmap.metaInfo.price}
            </span>
            <span className='px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 border border-white/5'>
              {roadmap.metaInfo.duration}
            </span>
          </div>
        </div>
      </div>
      <div className='flex md:flex-col justify-end gap-3 items-center w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0'>
        <UpdatedRoadmap id={roadmap._id} roadmap={roadmap} />
        <DeleteRoadmap id={roadmap._id} roadmap={roadmap} />
      </div>
    </Card>
  );
};

export default MyRoadmapCard;