'use client';

import { motion } from "framer-motion";
import { HiSparkles, HiUserGroup, HiPresentationChartLine, HiBookOpen } from "react-icons/hi2";

const features = [
    {
        icon: <HiSparkles className="text-cyan-400 text-2xl" />,
        title: "AI-Powered Roadmaps",
        desc: "Get customized, step-by-step learning paths generated specifically for your career goals, blending roadmap.sh with AI smarts."
    },
    {
        icon: <HiUserGroup className="text-indigo-400 text-2xl" />,
        title: "1:1 Mentor Booking",
        desc: "Book live sessions directly with industry experts for code reviews, mock interviews, and career guidance via integrated scheduling."
    },
    {
        icon: <HiPresentationChartLine className="text-cyan-400 text-2xl" />,
        title: "Growth Analytics",
        desc: "Track your learning progress, skill distribution, and profile strength with interactive, data-driven visual charts."
    },
    {
        icon: <HiBookOpen className="text-indigo-400 text-2xl" />,
        title: "Portfolio Tracking",
        desc: "Connect your real-world projects, track completions, and showcase a recruiter-ready profile to stand out from the crowd."
    }
];

export default function Features() {
    return (
        <section className="py-20 bg-slate-950 relative overflow-hidden">
            <div className="w-11/12 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
                        Platform Core
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                        Everything You Need to <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">Land Your Dream Job</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 group shadow-xl"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-cyan-500 transition-all duration-300">
                                {feat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mt-6 mb-3 group-hover:text-cyan-400 transition-colors">
                                {feat.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}