"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [teamNumber, setTeamNumber] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            teamName: formData.get("teamName"),
            leaderName: formData.get("leaderName"),
            leaderPhone: formData.get("leaderPhone"),
            leaderBirthDate: formData.get("leaderBirthDate"),
        };

        try {
            // Mocking API call for now until backend is connected
            // await new Promise(r => setTimeout(r, 2000));
            // const response = { ok: true, teamNumber: "#042" }; // Mock response

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.error || "Registration failed. Please try again.");
            }

            setTeamNumber(responseData.teamNumber);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success && teamNumber) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto w-full max-w-md rounded-2xl border border-primary-500/50 bg-neutral-900/80 p-8 text-center shadow-[0_0_30px_rgba(226,29,29,0.2)] backdrop-blur-xl"
            >
                <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-primary-500" />
                <h3 className="mb-2 text-2xl font-bold text-white text-glow">
                    REGISTRATION CONFIRMED
                </h3>
                <p className="mb-8 text-neutral-400">
                    Your credentials have been securely logged. Remember your assigned ID.
                </p>
                <div className="rounded-xl border border-neutral-800 bg-black py-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                        TEAM IDENTIFICATION NO.
                    </p>
                    <p className="mt-2 text-5xl font-mono font-bold text-white">
                        {teamNumber}
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <section className="relative z-10 mx-auto w-full max-w-2xl px-4 py-24 sm:px-6">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                    REGISTER YOUR CREW
                </h2>
                <div className="inline-flex items-center justify-center rounded-full bg-primary-500/10 px-4 py-1.5 border border-primary-500/20">
                    <AlertCircle className="mr-2 h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-primary-500">
                        MANDATORY: Teams MUST consist of exactly 4 members.
                    </span>
                </div>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur-md sm:p-8"
            >
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="teamName" className="text-sm font-medium text-neutral-300">
                                Team Name
                            </label>
                            <input
                                id="teamName"
                                name="teamName"
                                type="text"
                                required
                                placeholder="Enter team alias"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 pb-3 text-white placeholder:text-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="leaderName" className="text-sm font-medium text-neutral-300">
                                Leader&apos;s Full Name
                            </label>
                            <input
                                id="leaderName"
                                name="leaderName"
                                type="text"
                                required
                                placeholder="John Doe"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 pb-3 text-white placeholder:text-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="leaderPhone" className="text-sm font-medium text-neutral-300">
                            Leader&apos;s Phone Number
                        </label>
                        <input
                            id="leaderPhone"
                            name="leaderPhone"
                            type="tel"
                            required
                            placeholder="e.g. +1 234 567 8900"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 pb-3 text-white placeholder:text-neutral-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="leaderBirthDate" className="text-sm font-medium text-neutral-300 flex items-center justify-between">
                            <span>Leader&apos;s Birth Date</span>
                            <span className="text-xs text-primary-500">(Will be used as your secure password)</span>
                        </label>
                        <input
                            id="leaderBirthDate"
                            name="leaderBirthDate"
                            type="date"
                            required
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 pb-3 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                        />
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="rounded-lg bg-red-500/10 p-4 border border-red-500/20 text-sm text-red-500 flex items-start"
                        >
                            <AlertCircle className="mr-2 h-5 w-5 shrink-0" />
                            <p>{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full justify-center overflow-hidden rounded-lg bg-white px-4 py-4 text-sm font-bold text-black transition-all hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <span className="flex items-center tracking-widest uppercase">
                            Confirm Registration
                        </span>
                    )}
                </button>
            </motion.form>
        </section>
    );
}
