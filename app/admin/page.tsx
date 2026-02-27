"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, RefreshCw, Lock } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedAuth = localStorage.getItem("admin_auth");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
            fetchTeams();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin52") {
            setIsAuthenticated(true);
            localStorage.setItem("admin_auth", "true");
            fetchTeams();
        } else {
            setError("Invalid access coordinates.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword("");
        setTeams([]);
        localStorage.removeItem("admin_auth");
    };

    const fetchTeams = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/teams");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch dataset");
            setTeams(data.teams);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id: string, newRole: "Crew" | "Imposter" | "Unassigned") => {
        try {
            const res = await fetch(`/api/admin/teams/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            if (!res.ok) throw new Error("Failed to update vector");
            setTeams(teams.map(t => (t.id || (t as any)._id) === id ? { ...t, role: newRole } : t));
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    const deleteTeam = async (id: string) => {
        if (!confirm("Permanently erase this team?")) return;
        try {
            const res = await fetch(`/api/admin/teams/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to execute deletion");
            setTeams(teams.filter(t => (t.id || (t as any)._id) !== id));
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    const filteredTeams = teams.filter(team =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.teamNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <main className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden z-10 bg-[#050508]">
                {/* Ambient Background Glow matching Homepage */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full z-0 pointer-events-none" />

                <div className="w-full max-w-[450px] bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden mx-auto z-10 p-8 text-center transition-all relative">
                    <div className="mb-6 pb-4 border-b border-white/5">
                        <h2 className="text-glow text-white text-2xl font-cinzel font-bold tracking-[4px] uppercase">
                            System Access
                        </h2>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="w-full mb-6 relative">
                            <label className="text-neutral-300 text-sm font-semibold tracking-wide mb-2 block text-left">
                                Clearance Code <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="password"
                                required
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#11111a] border border-white/10 rounded-lg py-3 px-4 text-white text-base tracking-wide transition-all focus:outline-none focus:bg-[#151520] focus:border-red-500/50 hover:bg-[#151520] hover:border-white/20"
                                style={{ colorScheme: "dark" }}
                            />
                        </div>

                        {error && <div className="mt-4 mb-4 bg-red-900/20 border border-red-500/30 p-3 rounded-lg text-red-400 text-sm font-medium">{error}</div>}

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <button
                                type="submit"
                                className="w-full bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-base font-bold tracking-[3px] uppercase hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
                            >
                                Authorize
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen text-white p-6 lg:p-12 relative z-10 bg-[#050508] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00f3ff]/5 blur-[150px] rounded-full z-0 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto space-y-8 relative z-10">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0a0a0f] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] gap-6">
                    <div>
                        <h2 className="text-glow text-white text-2xl sm:text-3xl font-cinzel font-bold tracking-[4px] uppercase">
                            Admin Dashboard
                        </h2>
                        <p className="text-neutral-400 mt-2 text-sm font-medium tracking-widest uppercase">
                            Total Registered: <span className="text-[#00f3ff] font-bold">{teams.length}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button onClick={fetchTeams} disabled={loading} className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-[#11111a] hover:bg-[#151520] border border-white/10 px-5 py-2.5 rounded-lg transition-all text-xs tracking-[2px] uppercase disabled:opacity-50">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Syncing...' : 'Sync'}
                        </button>
                        <button onClick={handleLogout} className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-lg transition-all text-xs tracking-[2px] uppercase">
                            <Lock className="w-4 h-4" /> Lock
                        </button>
                    </div>
                </header>

                {error && <div className="text-red-400 text-sm bg-red-900/20 p-4 rounded-xl mb-6 border border-red-500/30">{error}</div>}

                <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-[#11111a]">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search by team name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:max-w-md bg-[#151520] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white text-sm tracking-wide transition-all focus:outline-none focus:bg-[#1a1a25] focus:border-[#00f3ff]/50 hover:bg-[#1a1a25] hover:border-white/20 placeholder:text-neutral-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="border-b border-white/5 bg-[#050508] text-neutral-500 text-xs tracking-[3px] uppercase font-bold">
                                <tr>
                                    <th className="py-5 px-6">Identity</th>
                                    <th className="py-5 px-6">Contact</th>
                                    <th className="py-5 px-6">Assignment</th>
                                    <th className="py-5 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-[#0a0a0f]">
                                {filteredTeams.map((team) => (
                                    <tr key={team.id || (team as any)._id} className="hover:bg-[#11111a] transition-colors group">
                                        <td className="py-5 px-6">
                                            <div className="text-white font-bold text-sm sm:text-base mb-1 tracking-wide">{team.teamName}</div>
                                            <div className="text-[#00f3ff] font-mono text-xs uppercase tracking-[2px]">{team.teamNumber}</div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="text-neutral-300 text-sm mb-1 font-medium">{team.leaderName}</div>
                                            <div className="text-neutral-500 text-xs tracking-widest">{team.leaderPhone}</div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex gap-2">
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Crew")}
                                                    className={`px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] uppercase tracking-[2px] font-bold border transition-all ${team.role === "Crew" ? "border-[#00f3ff] bg-[#00f3ff]/10 text-[#00f3ff]" : "border-white/10 text-neutral-500 bg-[#11111a] hover:bg-[#00f3ff]/5 hover:border-[#00f3ff]/50 hover:text-[#00f3ff]"}`}>
                                                    Crew
                                                </button>
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Imposter")}
                                                    className={`px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] uppercase tracking-[2px] font-bold border transition-all ${team.role === "Imposter" ? "border-red-500 bg-red-500/10 text-red-500" : "border-white/10 text-neutral-500 bg-[#11111a] hover:bg-red-500/5 hover:border-red-500/50 hover:text-red-500"}`}>
                                                    Imposter
                                                </button>
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Unassigned")}
                                                    className={`px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] uppercase tracking-[2px] font-bold border transition-all ${!team.role || team.role === "Unassigned" ? "border-neutral-500 text-white bg-[#151520]" : "border-white/10 text-neutral-500 bg-[#11111a] hover:bg-[#151520] hover:border-white/30 hover:text-white"}`}>
                                                    Clear
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <button
                                                onClick={() => deleteTeam(team.id || (team as any)._id)}
                                                className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-600 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all"
                                                title="Delete Team"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTeams.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-16 text-center text-neutral-500 text-sm tracking-widest uppercase">
                                            No tracking data found matching the parameters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
