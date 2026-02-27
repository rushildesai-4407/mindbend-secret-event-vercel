"use client";

import { useState } from "react";

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [teamNumber, setTeamNumber] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            teamName: formData.get("teamName"),
            leaderName: formData.get("leaderName"),
            leaderPhone: formData.get("leaderPhone"),
            leaderBirthDate: formData.get("leaderBirthDate"),
        };

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) throw new Error(responseData.error || "Registration failed.");

            setTeamNumber(responseData.teamNumber);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success && teamNumber) {
        return (
            <div className="w-full max-w-[600px] bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mx-auto text-center z-10 relative flex items-center flex-col gap-3">
                <h3 className="text-glow text-white text-3xl font-cinzel font-bold tracking-widest uppercase mb-2">
                    Registration Complete
                </h3>
                <p className="text-neutral-400 text-sm mb-6 font-medium tracking-wide">
                    Your team is registered. Join the official comms channel below.
                </p>

                <div className="py-8 w-full bg-[#050508] border border-white/5 rounded-xl max-w-sm mx-auto shadow-inner mb-6 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></div>
                    <span className="text-xs text-neutral-500 font-bold block mb-2 uppercase tracking-[3px]">Team Number</span>
                    <span className="text-5xl font-cinzel font-bold text-[#00f3ff] tracking-wider text-glow">{teamNumber}</span>
                </div>

                <a
                    href="https://chat.whatsapp.com/IqcVVG4sS3XGV6vqrrXUHM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center w-full max-w-sm h-12 bg-[#25D366]/90 border border-[#25D366]/50 hover:bg-[#25D366] text-white text-sm font-bold tracking-[2px] uppercase rounded-lg transition-all mb-4"
                >
                    Join WhatsApp Group
                </a>

                <br />

                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-neutral-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-[2px]"
                >
                    Register Another Team
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[800px] bg-[#0a0a0f] border border-white/10 rounded-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mx-auto relative z-10 transition-all overflow-hidden">
            {/* Ambient Background Glow matching Homepage */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f3ff]/5 blur-[80px] rounded-full z-0 pointer-events-none" />

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5 relative z-10">
                <h2 className="text-glow text-white text-2xl sm:text-3xl font-cinzel font-bold tracking-[4px] uppercase">
                    Registration
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
                <div className="mb-8 bg-[#050508] border border-blue-500/30 p-4 rounded-lg text-blue-200/80 text-sm md:text-base text-center tracking-wide font-medium shadow-inner">
                    <strong className="text-blue-400">INFO:</strong> Exactly 4 members should be in the team (Leader + 3 Members).
                </div>

                <h3 className="text-neutral-400 text-sm font-bold tracking-[3px] uppercase mb-5">Primary Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <InputField label="Team Name" id="teamName" type="text" placeholder="Enter team name" required />
                    <InputField label="Leader Name" id="leaderName" type="text" placeholder="Enter full name" required />
                    <InputField label="Leader Phone" id="leaderPhone" type="tel" placeholder="Enter phone number" required />
                    <InputField label="Date of Birth" id="leaderBirthDate" type="date" placeholder="" required />
                </div>

                <h3 className="text-neutral-400 text-sm font-bold tracking-[3px] uppercase mb-5 pb-2 border-b border-white/5">Team Members</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <InputField label="Member 1 Name" id="mem1Name" type="text" placeholder="Enter name" />
                    <InputField label="Member 2 Name" id="mem2Name" type="text" placeholder="Enter name" />
                    <InputField label="Member 3 Name" id="mem3Name" type="text" placeholder="Enter name" />
                </div>

                {error && (
                    <div className="mt-8 bg-red-900/20 border border-red-500/30 p-4 rounded-lg text-red-400 text-sm font-medium tracking-wide text-center">
                        {error}
                    </div>
                )}

                <div className="mt-10 pt-8 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00f3ff]/10 border border-[#00f3ff]/50 rounded-lg p-4 text-[#00f3ff] text-base font-bold tracking-[3px] uppercase hover:bg-[#00f3ff]/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Submitting..." : "Initialize Registration"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function InputField({ label, id, type, placeholder, required = false }: { label: string, id: string, type: string, placeholder: string, required?: boolean }) {
    return (
        <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
                <label htmlFor={id} className="text-neutral-300 text-sm font-semibold tracking-wide">
                    {label} {required && <span className="text-[#00f3ff] ml-1">*</span>}
                </label>
            </div>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full bg-[#11111a] border border-white/10 rounded-lg py-3 px-4 text-white text-base tracking-wide transition-all focus:outline-none focus:bg-[#151520] focus:border-[#00f3ff]/50 hover:bg-[#151520] hover:border-white/20 placeholder:text-neutral-600 font-medium"
                style={{ colorScheme: "dark" }}
            />
        </div>
    );
}