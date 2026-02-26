"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

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

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative overflow-hidden z-10 w-full">
            <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,rgba(0,0,255,0.1)_0%,rgba(0,0,0,1)_70%)]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,100,255,0.15)]"
            >
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="bg-neutral-950 p-4 rounded-full mb-4 border border-neutral-800">
                        <ShieldAlert className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-glow" style={{ textShadow: "0 0 10px rgba(0, 204, 255, 0.5)" }}>
                        PORTAL LOGIN
                    </h1>
                    <p className="text-neutral-400 text-sm mt-2">Enter credentials to view your assigned role.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-neutral-400">Team ID or Phone Number</label>
                        <input
                            type="text"
                            placeholder="#001 or +123456789"
                            required
                            value={teamNumber}
                            onChange={(e) => setTeamNumber(e.target.value)}
                            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-widest uppercase transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-neutral-400">Password (Leader&apos;s DOB)</label>
                        <input
                            type="date"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex w-full justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:outline-none disabled:opacity-70 mt-4 tracking-widest uppercase"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Portal"}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
