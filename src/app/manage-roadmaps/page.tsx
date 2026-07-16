
import FiltereRoadmaps from "@/components/FiltereRoadmaps";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

const ManageRoadmapsPage = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers()
  });
  const token = tokenData?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/roadmaps`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const roadmaps: Roadmap[] = await res.json();

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 py-10 relative overflow-hidden'>
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      
      <div className='w-11/12 mx-auto relative z-10'>
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Manage Your Roadmaps
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review, update, or optimize your published frameworks and career tracks.
          </p>
        </div>
        <FiltereRoadmaps roadmaps={roadmaps} />
      </div>
    </div>
  );
};

export default ManageRoadmapsPage;