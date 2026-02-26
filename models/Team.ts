import mongoose from "mongoose";

export interface ITeam extends mongoose.Document {
    teamName: string;
    leaderName: string;
    leaderPhone: string;
    leaderBirthDate: string; // Stored as a string YYYY-MM-DD
    teamNumber: string; // The assigned #001 format
    role: "Crew" | "Imposter" | "Unassigned";
    createdAt: Date;
}

const TeamSchema = new mongoose.Schema<ITeam>(
    {
        teamName: {
            type: String,
            required: [true, "Please provide a team name."],
            maxlength: [60, "Team Name cannot be more than 60 characters"],
        },
        leaderName: {
            type: String,
            required: [true, "Please provide the leader's name."],
            maxlength: [60, "Leader Name cannot be more than 60 characters"],
        },
        leaderPhone: {
            type: String,
            required: [true, "Please provide the leader's phone number."],
            maxlength: [20, "Phone number cannot be more than 20 characters"],
        },
        leaderBirthDate: {
            type: String,
            required: [true, "Please provide the leader's birth date."],
        },
        teamNumber: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["Crew", "Imposter", "Unassigned"],
            default: "Unassigned",
        },
    },
    { timestamps: true }
);

// Prevent redefining the model if hot reloading
export default mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
