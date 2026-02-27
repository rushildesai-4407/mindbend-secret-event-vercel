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
            <div className="w-full text-center py-10">
                <h3 className="text-[25px] font-medium text-white mb-2">Registration Complete</h3>
                <p className="text-[#b3b3b3] text-base mb-6">Your team is registered. Join the official comms channel below.</p>

                <div className="py-8 bg-[#0a0a0f] border border-white/10 rounded-lg max-w-sm mx-auto shadow-lg mb-6">
                    <span className="text-sm text-neutral-500 font-medium block mb-2">Team Number</span>
                    <span className="text-4xl font-bold text-[#00f3ff]">{teamNumber}</span>
                </div>

                <a
                    href="https://chat.whatsapp.com/IqcVVG4sS3XGV6vqrrXUHM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full max-w-sm h-[45px] leading-[45px] text-[16px] font-medium rounded bg-[#25D366] hover:bg-[#128C7E] text-white tracking-[1px] transition-all mb-2"
                >
                    Join WhatsApp Community
                </a>

                <br />

                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 text-neutral-400 hover:text-white transition-colors text-sm underline"
                >
                    Register Another Team
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[700px] bg-[#0a0a0f] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden mx-auto border border-white/10">
            <div className="p-[25px] bg-[#11111a] border-b border-white/5 relative">
                <p className="text-[25px] font-medium text-white relative inline-block">
                    Registration
                    <span className="absolute bottom-[-25px] left-0 w-[40px] h-[3px] bg-gradient-to-r from-[#00f3ff] to-[#9d00ff]"></span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="p-[25px]">
                    <div className="mb-6 bg-cyan-900/20 border border-cyan-500/30 p-4 rounded text-cyan-100 text-sm text-center">
                        <strong>Important:</strong> Exactly 4 members should be in the team (Leader + 3 Members).
                    </div>

                    <h3 className="text-lg font-medium text-white mb-4">Primary Details</h3>
                    <div className="flex flex-wrap gap-[20px]">
                        <InputField label="Team Name" id="teamName" type="text" placeholder="Enter team name" required />
                        <InputField label="Leader Name" id="leaderName" type="text" placeholder="Enter full name" required />
                        <InputField label="Leader Phone" id="leaderPhone" type="tel" placeholder="Enter phone number" required />
                        <InputField label="Date of Birth" id="leaderBirthDate" type="date" placeholder="" required />
                    </div>

                    <h3 className="text-lg font-medium text-white mb-4 mt-8">Team Members</h3>
                    <div className="flex flex-wrap gap-[20px]">
                        <InputField label="Member 1 Name" id="mem1Name" type="text" placeholder="Enter name" />
                        <InputField label="Member 1 Phone" id="mem1Phone" type="tel" placeholder="Enter phone" />
                        <InputField label="Member 2 Name" id="mem2Name" type="text" placeholder="Enter name" />
                        <InputField label="Member 2 Phone" id="mem2Phone" type="tel" placeholder="Enter phone" />
                        <InputField label="Member 3 Name" id="mem3Name" type="text" placeholder="Enter name" />
                        <InputField label="Member 3 Phone" id="mem3Phone" type="tel" placeholder="Enter phone" />
                    </div>
                </div>

                {error && (
                    <div className="px-[25px]">
                        <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded">{error}</p>
                    </div>
                )}

                <div className="p-[25px] mt-[15px]">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-[45px] border-none text-[18px] font-medium cursor-pointer rounded bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] text-white tracking-[1px] hover:from-[#9d00ff] hover:to-[#00f3ff] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function InputField({ label, id, type, placeholder, required = false }: { label: string, id: string, type: string, placeholder: string, required?: boolean }) {
    return (
        <div className="w-full sm:w-[calc(50%-10px)] mb-[12px]">
            <label htmlFor={id} className="font-medium text-white mb-[5px] block text-sm">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full h-[45px] border-none outline-none rounded bg-[#151520] text-base px-[15px] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)] focus:shadow-[0_0_0_2px_#00f3ff] transition-all duration-150 placeholder:text-neutral-500"
                style={{ colorScheme: "dark" }}
            />
        </div>
    );
}