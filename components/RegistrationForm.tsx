"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

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
        const data = Object.fromEntries(formData.entries());

        try {
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
            
            // Play success sound (catch handles browser autoplay restrictions)
            try {
                const audio = new Audio("https://actions.google.com/sounds/v1/science_fiction/sci_fi_door_open.ogg");
                audio.volume = 0.3;
                audio.play();
            } catch (e) { /* silent fail for autoplay blocks */ }
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success && teamNumber) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto w-full max-w-lg px-4"
            >
                <div className="relative overflow-hidden bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 text-center shadow-[0_0_80px_rgba(0,243,255,0.15)]">
                    {/* Animated Aura */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-8 relative">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"
                            />
                            <CheckCircle2 className="h-20 w-20 text-cyan-400 relative z-10" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                            Registration Complete
                        </h3>

                        <p className="text-neutral-400 text-sm mb-8 max-w-[280px] leading-relaxed">
                            Your identity has been encrypted and stored in our secure nodes.
                        </p>

                        <div className="w-full py-8 px-6 rounded-2xl bg-white/5 border border-white/10 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 py-1 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                                Assigned ID
                            </div>
                            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 block">
                                {teamNumber}
                            </span>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-10 text-neutral-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest py-3 px-8 border border-white/10 hover:border-white/30 rounded-full hover:bg-white/5"
                        >
                            Return to Base
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 min-h-screen flex items-center">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
                {/* Visual Sidebar */}
                <div className="lg:col-span-5 flex flex-col gap-12">
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                            JOIN THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">NEXT GENERATION</span>.
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                            Complete the synchronization protocol to secure your spot in the most exclusive event of the year.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <FeatureItem icon={<ShieldCheck />} title="Encrypted" desc="End-to-end secure registration" />
                        <FeatureItem icon={<Zap />} title="Instant" desc="Real-time verification and ID assignment" />
                        <FeatureItem icon={<Globe />} title="Global" desc="Access from anywhere in the sector" />
                    </div>
                </div>

                {/* Form Body */}
                <div className="lg:col-span-7 relative">
                    {/* Decorative rotating element */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 border border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite] z-0 hidden md:flex backdrop-blur-sm bg-black/20">
                        <Cpu className="text-neutral-500 h-6 w-6" />
                    </div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="bg-black/40 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative z-10"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="grid gap-8 md:grid-cols-2">
                                <InputField
                                    label="Team Alias"
                                    id="teamName"
                                    placeholder="e.g. DESIGN ATOM"
                                    type="text"
                                />
                                <InputField
                                    label="Leader Name"
                                    id="leaderName"
                                    placeholder="e.g. ALEX VANCE"
                                    type="text"
                                />
                            </div>

                            <InputField
                                label="Communication Channel"
                                id="leaderPhone"
                                placeholder="+1 (000) 000-0000"
                                type="tel"
                            />

                            <InputField
                                label="Access Key (Date of Birth)"
                                id="leaderBirthDate"
                                placeholder=""
                                type="date"
                            />

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium overflow-hidden"
                                    >
                                        <AlertCircle className="shrink-0 h-5 w-5" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full h-16 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative h-full flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm bg-white group-hover:bg-transparent transition-colors duration-300">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            "Synchronize Now"
                                        )}
                                    </div>
                                </button>

                                <p className="text-center text-[11px] text-neutral-500 uppercase tracking-widest font-semibold mt-6">
                                    Authentication Required: Team size of 4
                                </p>
                            </div>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

function InputField({ label, id, placeholder, type }: { label: string, id: string, placeholder: string, type: string }) {
    return (
        <div className="flex flex-col gap-2 group">
            <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-neutral-400 group-focus-within:text-cyan-400 transition-colors ml-1">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:bg-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 focus:outline-none transition-all text-sm"
                // This makes the date picker icon white in webkit browsers
                style={{ colorScheme: "dark" }}
            />
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-bold text-sm tracking-wide">{title}</h4>
                <p className="text-neutral-400 text-sm">{desc}</p>
            </div>
        </div>
    );
}