'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";

const faqs = [
    { q: "How do the AI roadmaps work?", a: "Our system analyzes your dynamic tech background, timeline constraints, and desired stack to map a granular sequence of modules tailored specifically for you." },
    { q: "Are the mentorship sessions free or paid?", a: "Mentors can choose to host free discovery sessions or set custom hourly rates for deep code reviews, structural pair-programming, or career mapping." },
    { q: "Can I track multiple roadmaps simultaneously?", a: "Absolutely! The comprehensive dashboard allows students to enroll in multiple tech paths, bookmarks resources, and saves progress dynamically." },
    { q: "Is the progress metric recruiter-verifiable?", a: "Yes, once your profile optimization hits 100% along with project completions, you can generate a distinct shareable public URL for hiring teams." }
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className="py-20 bg-slate-950">
            <div className="w-11/12 mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Got Questions?</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Frequently Asked Queries</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden transition-colors duration-200">
                                <button
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-5 text-left text-white font-semibold group"
                                >
                                    <span className="group-hover:text-cyan-300 transition-colors pr-4 text-sm md:text-base">{faq.q}</span>
                                    <HiOutlineChevronDown className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className="p-5 pt-0 text-slate-400 text-xs md:text-sm leading-relaxed border-t border-white/5 bg-slate-950/20">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}