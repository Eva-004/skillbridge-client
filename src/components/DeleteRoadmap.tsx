'use client';

import React from "react";
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button, Modal } from "@heroui/react";
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

interface DeleteRoadmapProps {
  id: string;
  roadmap: Roadmap;
}

const DeleteRoadmap: React.FC<DeleteRoadmapProps> = ({ id, roadmap }) => {
  const handleDelete = async (): Promise<void> => {
    try {
      const tokenResponse = await authClient.token();
      const tokenData = tokenResponse?.data;

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      if (res.ok) {
        toast.warn(`Deleted "${roadmap.title}" permanently!`);
      } else {
        toast.error('Failed to delete roadmap!');
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button className='border border-rose-500 text-rose-500 bg-transparent rounded-xl flex items-center gap-1 hover:bg-rose-500/10 transition-all'>
          <TrashBin /> Delete
        </Button>
        <AlertDialog.Backdrop>
          <Modal.Container placement="auto">
            <AlertDialog.Dialog className="sm:max-w-[400px] bg-slate-900 border border-white/10 text-slate-100 rounded-3xl shadow-2xl">
              <AlertDialog.CloseTrigger className='text-slate-400 hover:text-white' />
              
              <AlertDialog.Header className="flex items-center gap-3">
                <AlertDialog.Icon status="danger" className="text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl" />
                <AlertDialog.Heading className="text-white font-bold">Delete permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              
              <AlertDialog.Body className="py-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                  This will permanently delete <strong>{roadmap.title}</strong> and all of its
                  associated career milestones. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              
              <AlertDialog.Footer className="flex gap-3">
                <Button slot="close" className="bg-slate-950/60 border border-white/10 text-slate-400 font-medium rounded-xl hover:text-white transition-all">
                  Cancel
                </Button>
                <Button 
                  onClick={handleDelete} 
                  slot="close" 
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-950"
                >
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </Modal.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteRoadmap;