"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert, KeyRound, User, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const [teamNumber, setTeamNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ teamNumber, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Invalid Credentials");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#020204] relative overflow-hidden w-full p-4">
            {/* Background Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.15]" 
                 style={{ 
                    backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`, 
                    backgroundSize: '30px 30px' 
                 }} />
            
            {/* Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] z-10"
            >
                <div className="relative bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
                    
                    {/* Header Section */}
                    <div className="relative z-10 mb-12 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative bg-[#0f172a] p-4 rounded-2xl border border-cyan-500/30">
                                <Lock className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                            </div>
                        </div>
                        
                        <h1 className="font-cinzel text-3xl font-bold tracking-[0.4em] text-white text-center uppercase">
                            Security <span className="text-cyan-400">Portal</span>
                        </h1>
                        <div className="mt-2 h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                        <p className="mt-4 text-neutral-500 text-[10px] tracking-[0.2em] uppercase font-bold">
                            Level 4 Authorization Required
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8 relative z-10">
                        {/* Operative ID Input */}
                        <div className="space-y-3 group">
                            <label className="text-[11px] uppercase tracking-widest font-black text-neutral-400 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                                <User className="w-3.5 h-3.5" /> Operative ID
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., ALPHA-7"
                                required
                                value={teamNumber}
                                onChange={(e) => setTeamNumber(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 focus:bg-white/[0.07] focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 focus:outline-none transition-all text-sm font-mono tracking-wider"
                            />
                        </div>

                        {/* Date Key Input */}
                        <div className="space-y-3 group">
                            <label className="text-[11px] uppercase tracking-widest font-black text-neutral-400 group-focus-within:text-cyan-400 transition-colors flex items-center gap-2">
                                <KeyRound className="w-3.5 h-3.5" /> Access Key
                            </label>
                            <input
                                type="date"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ colorScheme: "dark" }}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.07] focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 focus:outline-none transition-all text-sm font-mono tracking-wider cursor-pointer"
                            />
                        </div>

                        {/* Error Handling */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-4 rounded-xl text-center font-bold uppercase tracking-widest"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full overflow-hidden rounded-2xl bg-cyan-500 p-[1px] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] disabled:opacity-50"
                        >
                            <div className="relative bg-[#0a0a0f] group-hover:bg-transparent transition-colors rounded-[calc(1rem-1px)] px-6 py-5 flex justify-center items-center">
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                                ) : (
                                    <span className="text-cyan-400 group-hover:text-black font-black text-sm uppercase tracking-[0.3em] transition-colors">
                                        Establish Uplink
                                    </span>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Footer Status */}
                    <div className="mt-10 flex items-center justify-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                        <span className="text-[9px] text-neutral-600 uppercase font-black tracking-[0.2em]">
                            System: <span className="text-neutral-400">Stable</span> // Encryption: <span className="text-neutral-400">Active</span>
                        </span>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}