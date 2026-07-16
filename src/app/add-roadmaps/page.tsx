'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField
} from '@heroui/react';
import { toast } from 'react-toastify';

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

interface RoadmapPayload {
  title: string;
  shortDescription: string;
  imageUrl: string;
  metaInfo: MetaInfo;
  userEmail?: string;
}

const AddRoadmapPage = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const router = useRouter();
  
  const [roadmapCategory, setRoadmapCategory] = useState<string>("Web Development");
  const [roadmapLevel, setRoadmapLevel] = useState<string>("Advanced");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const roadmapPayload: RoadmapPayload = {
      title: rawData.title as string,
      shortDescription: rawData.shortDescription as string,
      imageUrl: rawData.imageUrl as string,
      userEmail: user?.email || undefined,
      metaInfo: {
        price: Number(rawData.price) || 0,
        date: new Date().toISOString().split('T')[0], 
        rating: 5.0, 
        location: (rawData.location as string) || "Remote / Online",
        duration: (rawData.duration as string) || "12 Weeks",
        level: roadmapLevel,
        category: roadmapCategory,
        isFeatured: false 
      }
    };

    try {
      const tokenResponse = await authClient.token();
      const tokenData = tokenResponse?.data;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(roadmapPayload)
      });

      if (res.ok) {
        toast.success("Roadmap created successfully!");
        router.push('/roadmaps');
      } else {
        toast.error("Failed to add roadmap!");
      }
    } catch (error) {
      console.error("Error creating roadmap:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden'>
     
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <Card className="w-11/12 mx-auto max-w-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
        
        <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Create Career Roadmap
        </h1>

        <p className="text-center text-slate-400 text-sm mt-2 mb-8">
          Publish structured developer career tracks onto SkillBridge AI platform
        </p>

        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          
          <TextField isRequired name="title" className="w-full">
            <Label className="text-slate-300 font-semibold mb-1.5 block text-sm">Roadmap Title</Label>
            <Input className="bg-slate-950/60 border w-full border-white/10 text-white placeholder:text-slate-600 rounded-xl" placeholder="e.g., Full-Stack Next.js 14 Developer Career Path" />
            <FieldError className="text-rose-500 text-xs mt-1" />
          </TextField>

          <TextField isRequired name="imageUrl">
            <Label className="text-slate-300 font-semibold mb-1.5 block text-sm">Cover Image URL</Label>
            <Input className="bg-slate-950/60 w-full border border-white/10 text-white placeholder:text-slate-600 rounded-xl" placeholder="https://images.unsplash.com/..." />
            <FieldError className="text-rose-500 text-xs mt-1" />
          </TextField>

          <TextField isRequired name="shortDescription">
            <Label className="text-slate-300 font-semibold mb-1.5 block text-sm">Short Description / Overview</Label>
            <TextArea 
              className="bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 rounded-xl"
              rows={4}
              placeholder="Master modern web architectures using Next.js, Server Actions, App Router..."
            />
            <FieldError className="text-rose-500 text-xs mt-1" />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300 font-semibold mb-1.5 block text-sm">Category</Label>
              <select
                className="w-full bg-slate-950/60 border border-white/10 text-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[42px] text-sm"
                value={roadmapCategory}
                onChange={(e) => setRoadmapCategory(e.target.value)}
                required
              >
                <option value="Web Development" className="bg-slate-900 text-slate-200">Web Development</option>
                <option value="Artificial Intelligence" className="bg-slate-900 text-slate-200">Artificial Intelligence</option>
                <option value="Cybersecurity" className="bg-slate-900 text-slate-200">Cybersecurity</option>
                <option value="Mobile App Development" className="bg-slate-900 text-slate-200">Mobile App Development</option>
                <option value="Data Science" className="bg-slate-900 text-slate-200">Data Science</option>
              </select>
            </div>

            <div>
              <Label className="text-slate-300 font-semibold mb-1.5 block text-sm">Difficulty Level</Label>
              <select
                className="w-full bg-slate-950/60 border border-white/10 text-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-[42px] text-sm"
                value={roadmapLevel}
                onChange={(e) => setRoadmapLevel(e.target.value)}
                required
              >
                <option value="Beginner" className="bg-slate-900 text-slate-200">Beginner</option>
                <option value="Intermediate" className="bg-slate-900 text-slate-200">Intermediate</option>
                <option value="Advanced" className="bg-slate-900 text-slate-200">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-950/40 border border-white/5 rounded-2xl">
            <TextField isRequired name="price" type="number">
              <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Price ($)</Label>
              <Input className="bg-transparent border-none text-emerald-400 font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="49.99" defaultValue="0" />
            </TextField>

            <TextField isRequired name="duration">
              <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Duration</Label>
              <Input className="bg-transparent border-none text-white font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="12 Weeks" defaultValue="12 Weeks" />
            </TextField>

            <TextField isRequired name="location">
              <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Format / Location</Label>
              <Input className="bg-transparent border-none text-white font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="Remote / Online" defaultValue="Remote / Online" />
            </TextField>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-950 hover:scale-[1.02]"
            >
              Publish Roadmap
            </Button>

            <Button
              type="reset"
              className="w-1/3 bg-slate-950/60 border border-white/10 hover:border-white/20 text-slate-400 font-medium rounded-xl transition-all"
              onPress={() => {
                setRoadmapCategory("Web Development");
                setRoadmapLevel("Advanced");
              }}
            >
              Reset
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default AddRoadmapPage;