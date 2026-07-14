'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const mentors = [
    { name: "Alex Rivera", role: "Senior MERN Developer", company: "Google", img: "/images/mentor1.jpeg", rating: "4.9", sessions: "120+" },
    { name: "Sarah Jenkins", role: "DevOps Architect", company: "AWS", img: "/images/mentor2.jpeg", rating: "5.0", sessions: "95+" },
    { name: "David Kim", role: "AI Research Engineer", company: "Meta", img: "/images/mentor3.jpeg", rating: "4.8", sessions: "210+" },
];

export default function TopMentors() {
    return (
        <section className="py-20 bg-slate-950">
            <div className="w-11/12 mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Expert Network</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Connect with Top Mentors</h2>
                    <p className="text-slate-400 mt-3 text-sm">Skip the guesswork. Book structured 1-on-1 calls with real engineers working at global tech giants.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mentors.map((mentor, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative flex flex-col items-center text-center shadow-xl hover:border-indigo-500/30 transition-all group"
                        >
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400/80 p-1 mb-4">
                                <Image src={mentor.img} alt={mentor.name} fill className="object-cover rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
                                {mentor.company}
                            </span>
                            <h3 className="text-white font-bold text-xl">{mentor.name}</h3>
                            <p className="text-slate-400 text-sm mt-1">{mentor.role}</p>

                            <div className="flex items-center gap-6 border-t border-white/10 w-full mt-6 pt-4 text-sm justify-center text-slate-300">
                                <span className="flex items-center gap-1 text-amber-400"><FaStar /> {mentor.rating}</span>
                                <span>{mentor.sessions} Sessions</span>
                            </div>
                            
                            <button className="mt-5 w-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500 hover:text-white text-slate-200 text-sm font-semibold py-3 rounded-xl transition-all duration-300">
                                Book 1:1 Session
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}