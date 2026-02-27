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
            <main className="w-full min-h-screen flex items-center justify-center p-4 bg-[#050508] relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full z-0 pointer-events-none" />
                
                <div className="w-full max-w-[450px] bg-[#0a0a0f] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden mx-auto border border-white/10 z-10 transition-all">
                     <div className="p-[25px] bg-[#11111a] border-b border-white/5 relative">
                        <p className="text-[25px] font-medium text-white relative inline-block">
                            System Access
                            <span className="absolute bottom-[-25px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-red-500 to-orange-500"></span>
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="p-[25px]">
                        <div className="w-full mb-[20px]">
                            <label className="font-medium text-white mb-[5px] block text-sm">
                                Clearance Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                required
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-[45px] border-none outline-none rounded bg-[#151520] text-base px-[15px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[0_0_0_2px_#ef4444] transition-all duration-150 font-mono tracking-widest"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded mb-[20px]">{error}</p>}

                        <button
                            type="submit"
                            className="w-full h-[45px] border-none text-[18px] font-medium cursor-pointer rounded bg-gradient-to-r from-red-600 to-orange-600 text-white tracking-[1px] hover:from-orange-600 hover:to-red-600 transition-all"
                        >
                            Authorize
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050508] text-white p-6 lg:p-12">
            <div className="max-w-[1200px] mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 bg-[#0a0a0f] p-[25px] rounded-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] gap-4">
                    <div>
                        <p className="text-[25px] font-medium text-white relative inline-block">
                            Admin Dashboard
                            <span className="absolute bottom-[-10px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></span>
                        </p>
                        <p className="text-neutral-500 mt-4 text-sm font-medium">Total Registered: <span className="text-white">{teams.length}</span></p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button onClick={fetchTeams} disabled={loading} className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-[#151520] hover:bg-[#1a1a25] border border-white/10 px-4 py-2 rounded transition-colors text-sm font-medium disabled:opacity-50">
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Syncing...' : 'Sync'}
                        </button>
                        <button onClick={handleLogout} className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded transition-colors text-sm font-medium">
                            <Lock className="w-4 h-4" /> Lock
                        </button>
                    </div>
                </header>

                {error && <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-lg mb-6 border border-red-500/20">{error}</div>}

                <div className="bg-[#0a0a0f] border border-white/10 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                    <div className="p-[20px] bg-[#11111a] border-b border-white/5 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input 
                                type="text" 
                                placeholder="Search by team name or ID..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:max-w-md h-[40px] border-none outline-none rounded bg-[#151520] text-sm pl-10 pr-[15px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[0_0_0_2px_#00f3ff] transition-all duration-150"
                            />
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="text-neutral-400 border-b border-white/10 bg-[#0d0d14]">
                                <tr>
                                    <th className="py-4 px-6 font-medium">Identity</th>
                                    <th className="py-4 px-6 font-medium">Contact</th>
                                    <th className="py-4 px-6 font-medium">Assignment</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredTeams.map((team) => (
                                    <tr key={team.id || (team as any)._id} className="hover:bg-[#151520] transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="text-white font-medium text-base mb-1">{team.teamName}</div>
                                            <div className="text-[#00f3ff] font-mono text-xs uppercase tracking-widest">{team.teamNumber}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-neutral-300 mb-1">{team.leaderName}</div>
                                            <div className="text-neutral-500 text-xs">{team.leaderPhone}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Crew")}
                                                    className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium border transition-colors ${team.role === "Crew" ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-white/10 text-neutral-500 bg-[#0a0a0f] hover:bg-blue-500/5 hover:border-blue-500/50 hover:text-blue-400"}`}>
                                                    Crew
                                                </button>
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Imposter")}
                                                    className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium border transition-colors ${team.role === "Imposter" ? "border-red-500 bg-red-500/10 text-red-500" : "border-white/10 text-neutral-500 bg-[#0a0a0f] hover:bg-red-500/5 hover:border-red-500/50 hover:text-red-500"}`}>
                                                    Imposter
                                                </button>
                                                <button onClick={() => updateRole(team.id || (team as any)._id, "Unassigned")}
                                                    className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium border transition-colors ${!team.role || team.role === "Unassigned" ? "border-neutral-500 text-white bg-neutral-800" : "border-white/10 text-neutral-500 bg-[#0a0a0f] hover:bg-neutral-800 hover:text-white"}`}>
                                                    Clear
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => deleteTeam(team.id || (team as any)._id)} 
                                                className="inline-flex items-center justify-center w-8 h-8 rounded text-neutral-600 hover:text-white hover:bg-red-600 transition-colors"
                                                title="Delete Team"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTeams.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-neutral-500 bg-[#0a0a0f]">
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
