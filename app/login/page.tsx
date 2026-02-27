"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
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
                body: JSON.stringify({ teamNumber: identifier, password }),
            });

            if (!res.ok) throw new Error("Invalid Credentials");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden bg-[#050508]">
            {/* Ambient Background Glow matching Homepage */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f3ff]/5 blur-[120px] rounded-full z-0 pointer-events-none" />

            <div className="w-full max-w-[500px] z-10 relative">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-neutral-500 hover:text-white transition font-bold tracking-[2px] uppercase text-xs">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>

                <div className="bg-[#0a0a0f] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
                    <div className="p-6 md:p-8 border-b border-white/5 relative">
                        <h2 className="text-glow text-white text-2xl sm:text-3xl font-cinzel font-bold tracking-[4px] uppercase relative inline-block">
                            Portal Access
                        </h2>
                    </div>

                    <form onSubmit={handleLogin} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="w-full">
                                <label className="text-neutral-300 text-sm font-semibold tracking-wide mb-2 block">
                                    Team ID or Mobile <span className="text-[#00f3ff] ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your registered number"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full bg-[#11111a] border border-white/10 rounded-lg py-3 px-4 text-white text-base tracking-wide transition-all focus:outline-none focus:bg-[#151520] focus:border-[#00f3ff]/50 hover:bg-[#151520] hover:border-white/20 placeholder:text-neutral-600 font-medium"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-neutral-300 text-sm font-semibold tracking-wide mb-2 block">
                                    Authorization (DOB) <span className="text-[#00f3ff] ml-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#11111a] border border-white/10 rounded-lg py-3 px-4 text-white text-base tracking-wide transition-all focus:outline-none focus:bg-[#151520] focus:border-[#00f3ff]/50 hover:bg-[#151520] hover:border-white/20 font-medium"
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6">
                                <p className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 p-4 rounded-lg font-medium tracking-wide text-center">{error}</p>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00f3ff]/10 border border-[#00f3ff]/50 rounded-lg p-4 text-[#00f3ff] text-base font-bold tracking-[3px] uppercase hover:bg-[#00f3ff]/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Authorizing..." : "Initialize Session"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}