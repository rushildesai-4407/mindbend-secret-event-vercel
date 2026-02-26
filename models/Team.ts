export interface ITeam {
    id?: string; // Supabase generates this as UUID or BigInt
    teamNumber: string;
    teamName: string;
    leaderName: string;
    leaderPhone: string;
    leaderBirthDate: string;
    role: "Crew" | "Imposter" | "Unassigned";
    createdAt?: string; // Supabase timestamp string
}
