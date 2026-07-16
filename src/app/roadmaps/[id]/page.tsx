import React from 'react';
import Image from 'next/image';
import { Card, Chip } from '@heroui/react';
import { HiLightningBolt, HiOutlineClock, HiOutlineLocationMarker, HiStar } from 'react-icons/hi';
import RoadmapCard from '@/components/cards/RoadmapCard';

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
  detailDescription: string;
  imageUrl: string;
  additionalImages?: string[];
  category: string;
  tags: string[];
  targetAudience: string;
  estimatedBudget?: string;
  problemStatement: string;
  proposedSolution: string;
  metaInfo?: MetaInfo;
}

// Params-এর জন্য টাইপ ইন্টারফেস তৈরি করা হয়েছে
interface PageProps {
  params: Promise<{ id: string }>;
}

const RoadmapDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  // Fetch Core Details (Public Access Enabled)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps/${id}`, {
    cache: "no-store"
  });
  const roadmap: Roadmap = await res.json();

  // Fetch Related Items (Same category, dynamic lookup)
  const relatedRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps?category=${encodeURIComponent(roadmap?.category || '')}`,
    { cache: "no-store" }
  );
  const allRelated: Roadmap[] = await relatedRes.json();
  
  // সেফ ফিল্টারিং যাতে ডেটা মিসিং হলেও ক্র্যাশ না করে
  const relatedItems = (allRelated || [])
    .filter((item) => item?._id !== roadmap?._id)
    .slice(0, 4);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden'>
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className='w-11/12 mx-auto max-w-[1400px] relative z-10 space-y-12'>
        
        {/* Main Hero & Multiple Media Section */}
        <Card className='bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex flex-col lg:flex-row gap-8 items-stretch shadow-2xl'>
          
          {/* Multiple Media Component */}
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div className='relative w-full h-[40vh] sm:h-[50vh] rounded-2xl overflow-hidden bg-slate-950 border border-white/5'>
              <Image 
                src={roadmap?.imageUrl || ''} 
                fill 
                alt={roadmap?.title || 'Roadmap main media'} 
                className='object-cover' 
              />
              <div className="absolute top-5 right-5 z-20">
                <Chip className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-3 py-1 border-none shadow-lg shadow-cyan-950">
                  {roadmap?.category}
                </Chip>
              </div>
            </div>
            
            {/* Secondary/Gallery Images Container */}
            {roadmap?.additionalImages && roadmap.additionalImages.length > 0 && (
              <div className='grid grid-cols-3 gap-3'>
                {roadmap.additionalImages.slice(0, 3).map((imgUrl, idx) => (
                  <div key={idx} className='relative h-24 rounded-xl overflow-hidden bg-slate-950 border border-white/5 group cursor-pointer'>
                    <Image src={imgUrl} fill alt={`Gallery item ${idx}`} className='object-cover group-hover:scale-105 transition-transform duration-300' />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Info Briefing */}
          <div className='lg:w-1/2 flex flex-col justify-between py-2'>
            <div>
              <h1 className='font-extrabold text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight'>
                {roadmap?.title}
              </h1>
              
              {/* Reviews & Ratings Badge Display */}
              <div className="flex items-center gap-2 mt-3 text-sm text-slate-300">
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20 font-bold">
                  <HiStar className="text-base" /> {roadmap?.metaInfo?.rating?.toFixed(1) || "5.0"}
                </div>
                <span className="text-slate-500">|</span>
                <span className="text-xs text-slate-400">(Based on expert curriculum review)</span>
              </div>

              {/* Tags Section - Safe mapping added to fix runtime crash */}
              <div className='flex gap-2 items-center mt-5 flex-wrap'>
                {(roadmap?.tags || []).map((tag, ind) => (
                  <span key={ind} className="text-xs font-semibold px-3 py-1 bg-slate-950/60 border border-white/10 text-cyan-400 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Pricing & Duration Metadata Grid */}
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-950/40 border border-white/5 rounded-2xl'>
              <div className='flex flex-col gap-1'>
                <span className='text-[10px] text-slate-500 font-bold uppercase tracking-wider'>Price</span>
                <span className='text-base font-bold text-emerald-400'>
                  {roadmap?.metaInfo?.price === 0 ? "Free" : `$${roadmap?.metaInfo?.price}`}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-[10px] text-slate-500 font-bold uppercase tracking-wider'>Duration</span>
                <span className='text-base font-bold text-white flex items-center gap-1'>
                  <HiOutlineClock className="text-cyan-400" /> {roadmap?.metaInfo?.duration || "8 Weeks"}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-[10px] text-slate-500 font-bold uppercase tracking-wider'>Format</span>
                <span className='text-base font-bold text-white flex items-center gap-1'>
                  <HiOutlineLocationMarker className="text-indigo-400" /> {roadmap?.metaInfo?.location || "Online"}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-[10px] text-slate-500 font-bold uppercase tracking-wider'>Level</span>
                <span className='text-base font-bold text-white flex items-center gap-1'>
                  <HiLightningBolt className="text-amber-400" /> Professional
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Section 1: Description / Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-6 w-1 bg-cyan-500 rounded-full inline-block"></span>
            Description & Core Overview
          </h2>
          <Card className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl">
            <p className="text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {roadmap?.detailDescription || roadmap?.shortDescription}
            </p>
          </Card>
        </section>

        {/* Section 2: Key Information / Specifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-6 w-1 bg-indigo-500 rounded-full inline-block"></span>
            Key Information & Framework Specs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-cyan-400 mb-3">Architectural Problem Statement</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{roadmap?.problemStatement}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Target Audience:</span> {roadmap?.targetAudience}
              </div>
            </Card>

            <Card className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-indigo-400 mb-3">Proposed AI Learning Solution</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{roadmap?.proposedSolution}</p>
              </div>
              {roadmap?.estimatedBudget && (
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-400">Estimated Resource Value:</span> {roadmap.estimatedBudget}
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Section 3: Reviews / Ratings */}
        <section className="space-y-4 pt-6 border-t border-white/5">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="h-6 w-1 bg-amber-500 rounded-full inline-block"></span>
            Reviews & Ratings
          </h2>
          <Card className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl max-w-md mx-auto text-center space-y-3">
            <h3 className="text-5xl font-extrabold text-white">{roadmap?.metaInfo?.rating?.toFixed(1) || "5.0"}</h3>
            <div className="flex justify-center text-amber-400 text-xl"><HiStar/><HiStar/><HiStar/><HiStar/><HiStar/></div>
            <p className="text-xs text-slate-400">Course alignment and verification checked by AI validation protocols.</p>
          </Card>
        </section>

        {/* Section 4: Related Items Configuration */}
        {relatedItems.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-white/5">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="h-6 w-1 bg-emerald-500 rounded-full inline-block"></span>
              Related Technology Roadmaps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <RoadmapCard key={item._id} roadmap={item} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default RoadmapDetailsPage;