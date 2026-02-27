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
        <main className="min-h-screen bg-[#050508] text-white p-6 lg:p-12">
            <div className="max-w-[900px] mx-auto"  style={{"margin": "0 auto"}}>
                <header className="flex justify-between items-center mb-10 bg-[#0a0a0f] p-[25px] rounded-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[25px] font-medium text-white relative inline-block">
                            Team Output
                            <span className="absolute bottom-[-10px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></span>
                        </p>
                        <p className="text-neutral-500 mt-4 font-mono">{team.teamName} / {team.teamNumber}</p>
                    </div>
                    <button onClick={handleLogout} className="relative z-10 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors bg-[#151520] px-4 py-2 rounded border border-white/5">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                    {/* Subtle ambient accent directly in the header */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 blur-[50px] rounded-full z-0 pointer-events-none" />
                </header>

                <div className="grid md:grid-cols-1 gap-[20px]">
                    {/* Role Block */}
                    <div className="bg-[#0a0a0f] border border-white/10 rounded-lg p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-center min-h-[300px] relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] z-0 pointer-events-none ${isImposter ? 'bg-red-500/20' : 'bg-[#00f3ff]/20'}`} />

                        <div className="relative z-10">
                            <span className="text-xs uppercase tracking-widest text-[#b3b3b3] font-medium block mb-4">Assigned Role</span>
                            {(!team.role || team.role === "Unassigned") ? (
                                <div>
                                    <h2 className="text-4xl text-white font-medium mb-3">Pending</h2>
                                    <p className="text-[#b3b3b3] text-base leading-relaxed">System has not broadcasted assignment. Stand by.</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className={`text-5xl font-bold uppercase mb-4 tracking-tight ${isImposter ? "text-red-500" : "text-[#00f3ff]"}`}>
                                        {team.role}
                                    </h2>
                                    <p className="text-[#b3b3b3] text-base leading-relaxed">
                                        {isImposter ? "Objective: Subvert and eliminate. Remain undetected." : "Objective: Maintain logic and complete protocols."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pass Block */}
                    {/* <div className="bg-[#0a0a0f] border border-white/10 rounded-lg p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-[#b3b3b3] font-medium block mb-6">Digital Pass</span>
                            <div className="bg-white p-4 w-fit rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                <QRCode value={team.teamNumber} size={130} bgColor="#ffffff" fgColor="#000000" />
                            </div>
                        </div>
                        <div className="mt-8 border-t border-white/5 pt-4">
                            <p className="text-xl font-medium text-white">{team.teamName}</p>
                            <p className="text-[#b3b3b3] text-base mt-1">Lead: {team.leaderName}</p>
                        </div>
                    </div> */}
                </div>
                <div className="mt-[20px] bg-[#0a0a0f] border border-[#25D366]/30 rounded-lg p-[25px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div>
                        <h3 className="text-lg font-medium text-white">Official Comms Channel</h3>
                        <p className="text-sm text-[#b3b3b3] mt-1">Important updates and protocol changes will be broadcasted here.</p>
                    </div>
                    <a href="https://chat.whatsapp.com/IqcVVG4sS3XGV6vqrrXUHM" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium rounded transition-colors whitespace-nowrap">
                        Join WhatsApp
                    </a>
                </div>

            </div>
        </main>
    );
}
