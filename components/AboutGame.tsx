"use client";

import { motion } from "framer-motion";

export function AboutGame() {
    const protocolDays = [
        {
            day: "Day 1 – Initiation",
            description: ["Strategic elimination begins."],
        },
        {
            day: "Day 2 – Division Protocol",
            description: [
                "6 Zones.",
                "3 compulsory per round.",
                "Round 1: 1 hidden trap zone.",
                "Round 2: 2 hidden trap zones.",
                "No voting. Only survival.",
                "Top 12 qualify.",
            ],
        },
        {
            day: "Day 3 – King of Hearts",
            description: [
                "Psychological trial.",
                "Final: Joker Run.",
                "Only 1 winner claims full deck.",
            ],
        },
    ];

    return (
        <section id="about" className="relative z-10 mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl text-primary-500 mb-12 text-center text-glow font-bold tracking-widest uppercase">
                Protocol Overview
            </h2>

            <div className="space-y-8 text-neutral-300 relative">
                {protocolDays.map((protocol, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: idx * 0.2, duration: 0.6 }}
                        className="bg-neutral-900/85 backdrop-blur-md border border-primary-500/25 rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 hover:border-primary-500 hover:shadow-[0_0_20px_rgba(226,29,29,0.2)]"
                    >
                        <h3 className="text-xl text-blue-400 mb-4 font-bold tracking-widest uppercase">
                            {protocol.day}
                        </h3>
                        <div className="space-y-2 text-lg">
                            {protocol.description.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
