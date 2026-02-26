"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CountdownTimer() {
    // Target date: Feb 28th 12:00 PM of the current year (or next year if passed)
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let targetYear = now.getFullYear();
            let targetDate = new Date(targetYear, 1, 28, 12, 0, 0); // Month is 0-indexed (1 = Feb)

            if (now.getTime() > targetDate.getTime()) {
                // If past Feb 28th of this year, calculate for next year
                targetDate = new Date(targetYear + 1, 1, 28, 12, 0, 0);
            }

            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft(); // Initial calculation
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeBlocks = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds },
    ];

    return (
        <div className="z-10 mt-12 flex w-full max-w-3xl justify-center gap-4 sm:gap-8">
            {timeBlocks.map((block, index) => (
                <motion.div
                    key={block.label}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 shadow-[0_0_15px_rgba(226,29,29,0.1)] backdrop-blur-sm sm:h-24 sm:w-24">
                        <span className="text-2xl font-bold font-mono text-white sm:text-4xl">
                            {block.value.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <span className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 sm:text-sm">
                        {block.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
