"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center z-10 w-full">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,rgba(226,29,29,0.15)_0,rgba(0,0,0,1)_70%)]" />

      <div className="flex flex-col items-center gap-6">
        <motion.h1
          className="text-glow max-w-4xl text-5xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-white glitch"
          data-text="52 BEFORE ZERO"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block">52 BEFORE ZERO</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg text-neutral-400 sm:text-xl font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Trust No One.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col md:flex-row gap-6 w-full max-w-md justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#register" className="w-full md:w-auto">
            <button className="bg-primary-500 hover:bg-primary-600 px-8 py-3 rounded-lg transition w-full text-white font-bold tracking-widest uppercase">
              Register Team
            </button>
          </a>
          <Link href="/login" className="w-full md:w-auto">
            <button className="border border-blue-500 text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-900/30 transition w-full font-bold tracking-widest uppercase bg-transparent">
              Enter Portal
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
