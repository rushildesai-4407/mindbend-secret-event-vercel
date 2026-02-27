"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldAlert, Lock, RefreshCw, LogOut, Skull, User, Users, AlertTriangle } from "lucide-react";
// Internal Types omitted on frontend for object spread compatibility

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin52") {
            setIsAuthenticated(true);
            fetchTeams();
        } else {
            setError("Invalid passcode.");
        }
    };

    const fetchTeams = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/teams");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch");
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
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update role");

            // Update local state
            setTeams(teams.map(t => (t.id || (t as any)._id) === id ? { ...t, role: newRole } : t));
        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black text-white p-4">
                <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
                    <div className="mb-8 text-center flex flex-col items-center">
                        <div className="bg-neutral-800 p-4 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-primary-500" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-widest text-glow">SYSTEM ACCESS</h1>
                        <p className="text-neutral-500 text-sm mt-2">Restricted personnel only.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-neutral-400">Passcode</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 font-mono tracking-widest"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                            Authenticate
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white p-4 sm:p-8 pt-24 relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-xl">
                    <div>
                        <h1 className="text-2xl font-bold tracking-widest flex items-center gap-3">
                            <ShieldAlert className="text-primary-500" />
                            DATABASE RECORDS
                        </h1>
                        <p className="text-neutral-500 mt-1">Total Teams Registered: {teams.length}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchTeams}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={() => { setIsAuthenticated(false); setPassword(""); setTeams([]); }}
                            className="flex items-center gap-2 px-4 py-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition text-red-500"
                        >
                            <LogOut className="w-4 h-4" />
                            Lock System
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-400" /> Total Registrations
                        </span>
                        <span className="text-4xl font-black text-white">{teams.length}</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" /> Assigned Crew
                        </span>
                        <span className="text-4xl font-black text-blue-400">{teams.filter(t => t.role === "Crew").length}</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Skull className="w-4 h-4 text-red-500" /> Assigned Imposters
                        </span>
                        <span className="text-4xl font-black text-red-500">{teams.filter(t => t.role === "Imposter").length}</span>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col">
                        <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" /> Pending Action
                        </span>
                        <span className="text-4xl font-black text-yellow-500">{teams.filter(t => t.role === "Unassigned" || !t.role).length}</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-neutral-950 uppercase text-neutral-500 text-xs tracking-wider">
                                <tr>
                                    <th className="p-4 font-medium">Team ID</th>
                                    <th className="p-4 font-medium">Team Name</th>
                                    <th className="p-4 font-medium">Leader Name</th>
                                    <th className="p-4 font-medium">Phone & Birth Date</th>
                                    <th className="p-4 font-medium">Role Assignment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {teams.length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-neutral-500 italic">
                                            No records found in the database.
                                        </td>
                                    </tr>
                                ) : (
                                    teams.map((team) => (
                                        <tr key={team.id || (team as any)._id} className="hover:bg-neutral-800/50 transition-colors">
                                            <td className="p-4 font-mono font-bold text-primary-500 text-lg">{team.teamNumber}</td>
                                            <td className="p-4 font-medium text-base">{team.teamName}</td>
                                            <td className="p-4 text-neutral-300">{team.leaderName}</td>
                                            <td className="p-4">
                                                <div className="text-neutral-400 font-mono">{team.leaderPhone}</div>
                                                <div className="text-neutral-500 font-mono text-xs">{team.leaderBirthDate}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <button
                                                        onClick={() => updateRole(team.id || (team as any)._id, "Crew")}
                                                        className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider transition-colors border
                              ${team.role === "Crew"
                                                                ? "bg-blue-500/20 text-blue-400 border-blue-500"
                                                                : "bg-neutral-950 text-neutral-500 border-neutral-800 hover:border-blue-500 hover:text-blue-400"}`}
                                                    >
                                                        <User className="w-3 h-3" /> CREW
                                                    </button>
                                                    <button
                                                        onClick={() => updateRole(team.id || (team as any)._id, "Imposter")}
                                                        className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider transition-colors border
                               ${team.role === "Imposter"
                                                                ? "bg-red-500/20 text-red-500 border-red-500"
                                                                : "bg-neutral-950 text-neutral-500 border-neutral-800 hover:border-red-500 hover:text-red-500"}`}
                                                    >
                                                        <Skull className="w-3 h-3" /> IMPOSTER
                                                    </button>
                                                    <button
                                                        onClick={() => updateRole(team.id || (team as any)._id, "Unassigned")}
                                                        className={`flex items-center justify-center px-3 py-1.5 rounded-md text-xs transition-colors border
                              ${team.role === "Unassigned" || !team.role
                                                                ? "bg-neutral-800 text-white border-neutral-600"
                                                                : "bg-neutral-950 text-neutral-600 border-neutral-800 hover:border-neutral-600 hover:text-neutral-400"}`}
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
