import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import {
    HiLightningBolt,
    HiOutlineClock,
    HiOutlineLocationMarker,
    HiStar,
} from "react-icons/hi";

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

interface RoadmapCardProps {
    roadmap: Roadmap;
}

const RoadmapCard = ({ roadmap }: RoadmapCardProps) => {
    const {
        _id,
        title,
        shortDescription,
        imageUrl,
        category,
        metaInfo = {
            price: 0,
            rating: 5.0,
            location: "Online",
            duration: "8 Weeks",
        },
    } = roadmap;

    return (
        <Card className="w-full h-[450px]  bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group shadow-xl">
            {/* Image Container */}
            <div className="relative w-full h-44 min-h-[176px] overflow-hidden bg-slate-950">
                <Image
                    src={
                        imageUrl ||
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                    }
                    alt={title || "SkillBridge Roadmap"}
                    fill
                    sizes="(max-width:758px) 100vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 z-20">
                    <Chip
                        size="sm"
                        className="bg-slate-950/80 backdrop-blur-md text-cyan-400 font-semibold text-xs border border-cyan-500/20"
                    >
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow justify-start gap-2.5">
                <h3 className="font-bold text-lg text-white line-clamp-2 tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {shortDescription}
                </p>

                <div className="grid grid-cols-2 gap-y-2 gap-x-1 pt-2 mt-auto text-xs text-slate-400 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                        <HiOutlineClock className="text-cyan-400 text-sm" />
                        <span className="truncate">
                            {metaInfo.duration || "Self-Paced"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <HiOutlineLocationMarker className="text-indigo-400 text-sm" />
                        <span className="truncate">
                            {metaInfo.location || "Online"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <HiStar className="text-amber-400 text-sm" />
                        <span>{metaInfo.rating.toFixed(1)} Rating</span>
                    </div>

                    <div className="flex items-center justify-start font-bold text-white">
                        {metaInfo.price === 0 ? (
                            <span className="text-emerald-400 font-semibold">Free</span>
                        ) : (
                            <span>${metaInfo.price}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0">
                <Link href={`/roadmaps/${_id}`} className="w-full">
                    <Button
                        className="w-full font-semibold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-xl py-5"
                    >
                        View Details <HiLightningBolt className="text-sm" />
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default RoadmapCard;