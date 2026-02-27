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
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full z-0 pointer-events-none" />

            <div className="w-full max-w-[500px] z-10">
                <div className="mb-6 pl-2">
                    <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white transition font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </div>

                <div className="bg-[#0a0a0f] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10">
                    <div className="p-[25px] bg-[#11111a] border-b border-white/5 relative">
                        <p className="text-[25px] font-medium text-white relative inline-block">
                            Sign In
                            <span className="absolute bottom-[-25px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></span>
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="p-[25px] flex flex-wrap gap-[20px]">
                            <div className="w-full mb-[12px]">
                                <label className="font-medium text-white mb-[5px] block text-sm">
                                    Team Number or Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter Team ID or Phone"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full h-[45px] border-none outline-none rounded bg-[#151520] text-base px-[15px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[0_0_0_2px_#00f3ff] transition-all duration-150"
                                />
                            </div>

                            <div className="w-full mb-[12px]">
                                <label className="font-medium text-white mb-[5px] block text-sm">
                                    Date of Birth (Password) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-[45px] border-none outline-none rounded bg-[#151520] text-base px-[15px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[0_0_0_2px_#00f3ff] transition-all duration-150"
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="px-[25px]">
                                <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</p>
                            </div>
                        )}

                        <div className="p-[25px] mt-[5px]">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-[45px] border-none text-[18px] font-medium cursor-pointer rounded bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-white tracking-[1px] hover:from-[#9d00ff] hover:to-[#00f3ff] transition-all disabled:opacity-50"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}