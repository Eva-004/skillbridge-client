import Banner from "@/components/homePage/Banner";
import FAQ from "@/components/homePage/FAQ";
import Features from "@/components/homePage/Features";
import Statistics from "@/components/homePage/Statistics";
import Testimonials from "@/components/homePage/Testimonials";
import TopMentors from "@/components/homePage/TopMentors";
import TrendingSkills from "@/components/homePage/TrendingSkills";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner/>
    <Features/>
    <TrendingSkills/>
    <Statistics/>
    <TopMentors/>
    <Testimonials/>
    <FAQ/>
    </>
  );
}
