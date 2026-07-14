'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    FaArrowRight,
    FaBookOpen,
    FaChartLine,
} from "react-icons/fa";

import {
    HiSparkles,
} from "react-icons/hi2";

const slides = [
    {
        title: "Learn Smarter with AI-Powered Roadmaps",
        description:
            "Personalized learning paths, AI recommendations, project guidance and interview preparation — everything in one place.",
        image: "/images/banner1.jpeg",
        button: "Explore Roadmaps",
        link: "/explore",
    },
    {
        title: "Build Real Projects. Get Job Ready.",
        description:
            "Master modern technologies with hands-on projects, progress tracking and AI-assisted learning.",
        image: "/images/banner2.jpg",
        button: "Start Learning",
        link: "/explore",
    },
    {
        title: "Your Complete Developer Growth Platform",
        description:
            "Roadmaps, coding challenges, AI mentor, analytics and portfolio building for every developer.",
        image: "/images/banner3.jpg",
        button: "Get Started",
        link: "/register",
    },
];

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .6,
        },
    },
};

export default function Banner() {
    return (
        <section className="relative min-h-[90vh] md:min-h-[80vh] lg:h-[85vh] bg-slate-950 overflow-hidden flex items-center justify-center">
            
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 12,
                }}
                className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    x: [0, -40, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                }}
                className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
            />

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-11/12 mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 md:py-16 lg:py-0">
                            
                            <div className="order-2 lg:order-1 lg:col-span-7 z-20 flex flex-col justify-center text-center lg:text-left">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    className="mx-auto lg:mx-0 w-fit"
                                >
                                    <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs md:text-sm font-medium text-cyan-300 backdrop-blur-md">
                                        🚀 AI Powered Learning Platform
                                    </span>
                                </motion.div>

                                <motion.h1
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ delay: .2 }}
                                    className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ delay: .35 }}
                                    className="mt-4 md:mt-6 max-w-2xl text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed mx-auto lg:mx-0"
                                >
                                    {slide.description}
                                </motion.p>

                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    transition={{ delay: 0.45 }}
                                    className="mt-6 md:mt-8 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 pb-12 lg:pb-0"
                                >
                                    <Link href={slide.link} className="w-full sm:w-auto">
                                        <button className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-6 py-3.5 md:px-8 md:py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40">
                                            {slide.button}
                                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </button>
                                    </Link>

                                    <Link href="/register" className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 md:px-8 md:py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:bg-white/20">
                                            Get Started Free
                                        </button>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="order-1 lg:order-2 lg:col-span-5 relative h-[250px] sm:h-[350px] lg:h-[450px] w-full flex items-center justify-center z-10 px-2 sm:px-0">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        priority={index === 0}
                                        className="object-cover"
                                    />
                                </div>

                                <div className="hidden xl:block">
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: .3 }}
                                        className="absolute -right-8 top-8 rounded-2xl border border-white/20 bg-slate-900/80 backdrop-blur-xl p-4 w-64 text-white shadow-2xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-cyan-500/20 p-2.5">
                                                <HiSparkles className="text-cyan-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">AI Recommendation</h3>
                                                <p className="text-xs text-slate-300">React Developer Roadmap</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: .5 }}
                                        className="absolute -bottom-6 left-10 rounded-2xl border border-white/20 bg-slate-900/80 backdrop-blur-xl p-4 w-56 text-white shadow-2xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-indigo-500/20 p-2.5">
                                                <FaChartLine className="text-indigo-300" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-300">Learning Progress</p>
                                                <h3 className="font-bold text-lg">86%</h3>
                                            </div>
                                        </div>
                                        <div className="mt-3 h-1.5 rounded-full bg-slate-700">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "86%" }}
                                                transition={{ duration: 2 }}
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: .7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: .8 }}
                                        className="absolute -right-4 bottom-16 rounded-2xl border border-white/20 bg-slate-900/80 backdrop-blur-xl p-4 text-white shadow-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FaBookOpen className="text-cyan-400" />
                                            <div>
                                                <p className="text-xs text-slate-300">Roadmaps</p>
                                                <h2 className="font-bold text-lg">50+</h2>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <motion.div
                animate={{
                    y: [0, 12, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden lg:block"
            >
                <div className="flex h-10 w-6 justify-center rounded-full border border-white/40">
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                        className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400"
                    />
                </div>
            </motion.div>
        </section>
    );
}