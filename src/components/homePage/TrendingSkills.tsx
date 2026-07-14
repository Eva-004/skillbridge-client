'use client';

import { motion } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaDocker,
    FaPython,
    FaAws,
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiTypescript,
    SiMongodb,
} from "react-icons/si";

const skills = [
    {
        name: "React",
        level: "High Demand",
        icon: <FaReact />,
        color: "from-cyan-400 to-blue-500",
    },
    {
        name: "Next.js",
        level: "Trending",
        icon: <SiNextdotjs />,
        color: "from-slate-700 to-slate-900",
    },
    {
        name: "TypeScript",
        level: "Most Popular",
        icon: <SiTypescript />,
        color: "from-blue-500 to-sky-500",
    },
    {
        name: "Node.js",
        level: "Backend",
        icon: <FaNodeJs />,
        color: "from-green-500 to-emerald-600",
    },
    {
        name: "MongoDB",
        level: "Database",
        icon: <SiMongodb />,
        color: "from-green-600 to-lime-500",
    },
    {
        name: "Docker",
        level: "DevOps",
        icon: <FaDocker />,
        color: "from-sky-500 to-cyan-500",
    },
    {
        name: "Python",
        level: "AI / ML",
        icon: <FaPython />,
        color: "from-yellow-400 to-blue-500",
    },
    {
        name: "AWS",
        level: "Cloud",
        icon: <FaAws />,
        color: "from-orange-500 to-amber-500",
    },
];

export default function TrendingSkills() {
    return (
        <section className="py-20 bg-slate-950 border-t border-white/5">
            <div className="w-11/12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
                        Trending Skills
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
                        Learn The Most In-Demand Technologies
                    </h2>

                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Master the technologies companies are actively hiring for
                        and accelerate your software engineering career.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-all cursor-pointer"
                        >
                            <div
                                className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                            >
                                {skill.icon}
                            </div>

                            <h3 className="text-white font-bold text-lg mt-5">
                                {skill.name}
                            </h3>

                            <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300">
                                {skill.level}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}