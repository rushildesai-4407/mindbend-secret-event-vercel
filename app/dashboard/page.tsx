"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User, Skull, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

export default function DashboardPage() {
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        try {
            const res = await fetch("/api/me");
            if (!res.ok) {
                if (res.status === 401) {
                    router.push("/login"); // Redirect to login if not authenticated
                    return;
                }
                throw new Error("Failed to load profile");
            }
            const data = await res.json();
            setTeam(data.team);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        // Basic client-side clear for demonstration since we used httpOnly cookies.
        // Ideally, call an API to clear the cookie.
        document.cookie = "auth_team=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white relative z-10 w-full">
                <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
            </main>
        );
    }

    if (error || !team) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative z-10 w-full">
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl text-center">
                    <p className="text-red-500 mb-4">{error || "Could not load data"}</p>
                    <button onClick={() => router.push("/login")} className="text-blue-400 hover:underline">
                        Return to Login
                    </button>
                </div>
            </main>
        );
    }

    const isImposter = team.role === "Imposter";
    const isCrew = team.role === "Crew";

    return (
        <main className="min-h-screen bg-black text-white p-4 sm:p-8 pt-24 relative z-10 w-full">
            <div className="max-w-4xl mx-auto space-y-8">

                <header className="flex justify-between items-center border-b border-neutral-800 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-widest text-glow">TEAM DASHBOARD</h1>
                        <p className="text-neutral-400 font-mono mt-1">ID: {team.teamNumber}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">DISCONNECT</span>
                    </button>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`relative overflow-hidden rounded-2xl border p-10 text-center ${isImposter
                        ? "bg-red-950/20 border-red-500/50 shadow-[0_0_50px_rgba(226,29,29,0.15)]"
                        : isCrew
                            ? "bg-blue-950/20 border-blue-500/50 shadow-[0_0_50px_rgba(0,100,255,0.15)]"
                            : "bg-neutral-900 border-neutral-700"
                        }`}
                >
                    {/* Background Indicator */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
                        {isImposter ? <Skull className="w-96 h-96" /> : <User className="w-96 h-96" />}
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2">
                            ASSIGNED PROTOCOL ROLE
                        </h2>

                        {!isImposter && !isCrew ? (
                            <div className="py-12">
                                <h3 className="text-4xl sm:text-6xl font-black tracking-tighter text-neutral-600 animate-pulse">
                                    PENDING ASSIGNMENT
                                </h3>
                                <p className="mt-4 text-neutral-500 max-w-md mx-auto">
                                    Your roles have not yet been assigned by the Game Masters. Please check back later.
                                </p>
                            </div>
                        ) : (
                            <div className="py-8">
                                <h3 className={`text-6xl sm:text-8xl font-black tracking-tighter uppercase mb-6 ${isImposter ? "text-primary-500 text-glow" : "text-blue-500"
                                    }`}>
                                    {team.role}
                                </h3>

                                {isImposter ? (
                                    <p className="text-xl text-red-400 font-medium max-w-xl mx-auto">
                                        Your objective is sabotage and elimination. Trust no one. Betrayal is your only path to victory.
                                    </p>
                                ) : (
                                    <p className="text-xl text-blue-300 font-medium max-w-xl mx-auto">
                                        Complete tasks. Survive the protocol. Identify the imposters before it&apos;s too late.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute top-4 left-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">DIGITAL PASS</h3>
                        </div>
                        <div className="bg-white p-3 rounded-xl mt-6">
                            <QRCode value={team.teamNumber} size={100} bgColor="#ffffff" fgColor="#000000" />
                        </div>
                        <p className="mt-4 text-white text-lg font-medium">{team.teamName}</p>
                        <p className="text-neutral-400 mt-1 text-sm">Leader: {team.leaderName}</p>
                    </div>

                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">STATUS</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-white font-medium">System Connected</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
