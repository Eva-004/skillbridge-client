import Image from "next/image";
import Link from "next/link";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-20 pb-8">

      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <Image
                src="/images/logo.png"
                alt="SkillBridge AI"
                width={55}
                height={55}
                className="rounded-xl bg-white p-1"
              />

              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                SkillBridge AI
              </h2>

            </div>

            <p className="mt-5 leading-7 text-slate-400">
              AI-powered learning platform helping students and developers
              discover personalized roadmaps, track progress and build
              job-ready skills.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="hover:text-cyan-400 transition"
                >
                  Explore Roadmaps
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-cyan-400 transition"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-cyan-400 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Resources
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-cyan-400 transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="hover:text-cyan-400 transition"
                >
                  Learning Paths
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-cyan-400 transition"
                >
                  Get Started
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-3">

              <p>Sylhet, Bangladesh</p>

              <p>support@skillbridgeai.com</p>

              <p>+880 17XXXXXXXX</p>

            </div>

            <div className="flex gap-4 mt-6">

              <Link
                href="https://github.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 transition flex justify-center items-center"
              >
                <FaGithub className="text-xl text-white" />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 transition flex justify-center items-center"
              >
                <AiFillLinkedin className="text-2xl text-white" />
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 transition flex justify-center items-center"
              >
                <FaFacebookSquare className="text-xl text-white" />
              </Link>

              <Link
                href="mailto:support@skillbridgeai.com"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-500 transition flex justify-center items-center"
              >
                <AiOutlineMail className="text-2xl text-white" />
              </Link>

            </div>

          </div>

        </div>

        <div className="my-10 border-t border-slate-800"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-slate-400">

          <p>
            &copy; {new Date().getFullYear()} SkillBridge AI. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy-policy"
              className="hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-cyan-400 transition"
            >
              Terms of Service
            </Link>

            <Link
              href="/cookies"
              className="hover:text-cyan-400 transition"
            >
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;