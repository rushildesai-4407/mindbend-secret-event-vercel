"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import Link from "next/link";
import { LogOut } from "lucide-react";

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
                if (res.status === 401) return router.push("/login");
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

    const handleLogout = () => {
        document.cookie = "auth_team=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
    };

    if (loading) return <main className="min-h-screen bg-[#050508] flex items-center justify-center text-white text-xl">Loading Dataset...</main>;
    if (error || !team) return (
        <main className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
            <div className="bg-[#0a0a0f] p-8 border border-white/10 rounded-lg text-center max-w-sm w-full">
                <p className="text-red-400 mb-6">{error}</p>
                <button onClick={() => router.push("/login")} className="w-full h-[45px] bg-[#151520] text-white rounded hover:bg-[#1a1a25] transition-colors border border-white/10">Return to Login</button>
            </div>
        </main>
    );

    const isImposter = team.role === "Imposter";

    return (
        <main className="min-h-screen bg-[#050508] text-white p-6 lg:p-12 relative overflow-hidden">
            {/* Ambient Background Glow matching Homepage */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00f3ff]/5 blur-[150px] rounded-full z-0 pointer-events-none" />

            <div className="max-w-[900px] mx-auto relative z-10" style={{ "margin": "0 auto" }}>
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 bg-[#0a0a0f] p-8 rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] gap-6">
                    <div>
                        <h2 className="text-glow text-white text-2xl sm:text-3xl font-cinzel font-bold tracking-[4px] uppercase relative inline-block">
                            Team Output
                            <span className="absolute bottom-[-10px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></span>
                        </h2>
                        <p className="text-neutral-500 mt-4 tracking-widest text-sm uppercase">
                            <span className="text-white font-bold">{team.teamName}</span> / <span className="text-[#00f3ff]">{team.teamNumber}</span>
                        </p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-neutral-400 hover:text-red-400 transition-colors bg-[#11111a] hover:bg-[#151520] px-5 py-3 rounded-lg border border-white/5 hover:border-red-500/30 text-xs font-bold tracking-[2px] uppercase">
                        <LogOut className="w-4 h-4" /> Terminate Session
                    </button>
                </header>

                <div className="grid md:grid-cols-1 gap-[20px]">
                    {/* Role Block */}
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-center min-h-[300px] relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] z-0 pointer-events-none ${isImposter ? 'bg-red-500/10' : 'bg-[#00f3ff]/10'}`} />

                        <div className="relative z-10">
                            <span className="text-xs uppercase tracking-[3px] text-neutral-500 font-bold block mb-6 outline-none">Assigned Role</span>
                            {(!team.role || team.role === "Unassigned") ? (
                                <div>
                                    <h2 className="text-glow text-5xl font-cinzel font-bold text-white mb-4 tracking-widest uppercase">Pending</h2>
                                    <p className="text-neutral-400 text-base tracking-wide font-medium">System has not broadcasted assignment. Stand by.</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className={`text-glow text-6xl sm:text-7xl font-cinzel font-bold uppercase mb-4 tracking-widest ${isImposter ? "text-red-500" : "text-[#00f3ff]"}`}>
                                        {team.role}
                                    </h2>
                                    <p className="text-neutral-300 text-base sm:text-lg tracking-wide font-medium">
                                        {isImposter ? "Objective: Subvert and eliminate. Remain undetected." : "Objective: Maintain logic and complete protocols."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-[#0a0a0f] border border-[#25D366]/30 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent"></div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-widest uppercase font-cinzel text-glow mb-2">Official Comms Channel</h3>
                        <p className="text-sm text-neutral-400 font-medium tracking-wide">Important updates and protocol changes will be broadcasted here.</p>
                    </div>
                    <a href="https://chat.whatsapp.com/IqcVVG4sS3XGV6vqrrXUHM" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/50 hover:bg-[#25D366]/20 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] text-[#25D366] font-bold text-sm tracking-[2px] uppercase rounded-lg transition-all whitespace-nowrap">
                        Join WhatsApp
                    </a>
                </div>

            </div>
        </main>
    );
}
