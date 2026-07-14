'use client';

import { motion } from "framer-motion";

const stats = [
    { value: "50+", label: "Expert Guided Roadmaps" },
    { value: "12,000+", label: "Active Tech Students" },
    { value: "450+", label: "Verified Industry Mentors" },
    { value: "93%", label: "Career Transition Success" }
];

export default function Statistics() {
    return (
        <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-y border-white/5 relative">
            <div className="w-11/12 mx-auto max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex flex-col justify-center p-4"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                                {stat.value}
                            </h2>
                            <p className="text-slate-400 text-xs md:text-sm font-medium mt-3 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}