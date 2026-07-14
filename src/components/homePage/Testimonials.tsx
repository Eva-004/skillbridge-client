'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
    { text: "The customized MERN roadmap cut through the tutorial hell. Tracking my progress explicitly using charts gave me visual motivation.", user: "Rahat Khan", role: "Software Engineer Intern", img: "/images/review2.jpeg" },
    { text: "Booking 1:1 sessions for resume parsing directly with tech leads helped me bypass HR screenings seamlessly. A game changer.", user: "Nadia Sultana", role: "Frontend Developer", img: "/images/review1.jpeg" }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
            <div className="w-11/12 mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">Alumni Reviews</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">From Learning to Earning</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {reviews.map((rev, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 relative flex flex-col justify-between shadow-2xl"
                        >
                            <FaQuoteLeft className="absolute right-8 top-8 text-slate-800 text-5xl pointer-events-none" />
                            <p className="text-slate-300 text-base md:text-lg italic leading-relaxed z-10">{rev.text}</p>
                            
                            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image src={rev.img} alt={rev.user} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm md:text-base">{rev.user}</h4>
                                    <p className="text-cyan-400 text-xs font-medium">{rev.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}