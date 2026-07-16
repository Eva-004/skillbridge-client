'use client';

import React, { useState, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

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

interface UpdatedRoadmapProps {
  id: string;
  roadmap: Roadmap;
}

const UpdatedRoadmap: React.FC<UpdatedRoadmapProps> = ({ id, roadmap }) => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  
  const { title, shortDescription, imageUrl, metaInfo } = roadmap;
  
  const [roadmapCategory, setRoadmapCategory] = useState<string>(metaInfo?.category || "Web Development");
  const [roadmapLevel, setRoadmapLevel] = useState<string>(metaInfo?.level || "Advanced");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const roadmapPayload = {
      title: rawData.title as string,
      shortDescription: rawData.shortDescription as string,
      imageUrl: rawData.imageUrl as string,
      userEmail: user?.email,
      metaInfo: {
        price: Number(rawData.price) || 0,
        date: metaInfo?.date || new Date().toISOString().split('T')[0],
        rating: metaInfo?.rating || 5.0,
        location: (rawData.location as string) || "Remote / Online",
        duration: (rawData.duration as string) || "12 Weeks",
        level: roadmapLevel,
        category: roadmapCategory,
        isFeatured: metaInfo?.isFeatured || false
      }
    };

    const tokenResponse = await authClient.token();
    const tokenData = tokenResponse?.data;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(roadmapPayload)
    });

    if (res.ok) {
      toast.success("Updated roadmap successfully!");
    } else {
      toast.error("Failed to update roadmap!");
    }
  };

  return (
    <div>
      <Modal>
        <Button className='border border-cyan-500 text-cyan-400 bg-transparent rounded-xl flex items-center gap-1 hover:bg-cyan-500/10 transition-all'>
          <BiEdit /> Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-slate-900 border border-white/10 text-slate-100 rounded-3xl shadow-2xl">
              <Modal.CloseTrigger className="text-slate-400 hover:text-white" />
              
              <Modal.Header>
                <Modal.Icon className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <BiEdit className="text-indigo-400" />
                </Modal.Icon>
                <Modal.Heading className="text-white font-bold">Update Roadmap</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-slate-400">
                  Modify the details of your published career track frameworks.
                </p>
              </Modal.Header>
              
              <Modal.Body className="p-6">
                <Surface className="bg-transparent">
                  <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    
                    <TextField isRequired name="title" defaultValue={title}>
                      <Label className="text-slate-300 text-sm font-semibold">Roadmap Title</Label>
                      <Input className='bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 rounded-xl mt-1' placeholder="Enter roadmap title" />
                      <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <TextField isRequired name="imageUrl" defaultValue={imageUrl}>
                      <Label className="text-slate-300 text-sm font-semibold">Cover Image URL</Label>
                      <Input className='bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 rounded-xl mt-1' placeholder="https://images.unsplash.com/..." />
                      <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <TextField isRequired name="shortDescription" defaultValue={shortDescription}>
                      <Label className="text-slate-300 text-sm font-semibold">Short Description</Label>
                      <TextArea 
                        className='bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-600 rounded-xl mt-1'
                        rows={3}
                        placeholder="Write roadmap brief description..."
                      />
                      <FieldError className="text-rose-500 text-xs mt-1" />
                    </TextField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-slate-300 text-sm font-semibold">Category</Label>
                        <select 
                          className="w-full bg-slate-950/60 border border-white/10 text-slate-300 rounded-xl p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm h-[40px]"
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
                        <Label className="text-slate-300 text-sm font-semibold">Difficulty Level</Label>
                        <select 
                          className="w-full bg-slate-950/60 border border-white/10 text-slate-300 rounded-xl p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm h-[40px]"
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/40 border border-white/5 rounded-2xl mt-1">
                      <TextField isRequired name="price" type="number" defaultValue={metaInfo?.price?.toString() || "0"}>
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Price ($)</Label>
                        <Input className="bg-transparent border-none text-emerald-400 font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="0" />
                      </TextField>

                      <TextField isRequired name="duration" defaultValue={metaInfo?.duration || "12 Weeks"}>
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Duration</Label>
                        <Input className="bg-transparent border-none text-white font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="12 Weeks" />
                      </TextField>

                      <TextField isRequired name="location" defaultValue={metaInfo?.location || "Remote / Online"}>
                        <Label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Location</Label>
                        <Input className="bg-transparent border-none text-white font-bold p-0 min-h-0 h-6 text-sm focus:ring-0" placeholder="Remote / Online" />
                      </TextField>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02]">
                        Update
                      </Button>

                      <Button slot="close" className='bg-slate-950/60 border border-white/10 text-slate-400 font-medium rounded-xl hover:text-white transition-all'>
                        Cancel
                      </Button>
                    </div>

                  </Form>
                </Surface>
              </Modal.Body>
              <Modal.Footer />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default UpdatedRoadmap;