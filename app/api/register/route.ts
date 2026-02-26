import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const { teamName, leaderName, leaderPhone, leaderBirthDate } = body;

        if (!teamName || !leaderName || !leaderPhone || !leaderBirthDate) {
            return NextResponse.json(
                { error: "Please provide all required fields." },
                { status: 400 }
            );
        }

        // Generate unique team number
        // Find the team with the highest team number to increment
        const latestTeam = await Team.findOne().sort({ createdAt: -1 });
        let nextNumber = 1;

        if (latestTeam && latestTeam.teamNumber) {
            // Assuming format is #001
            const currentHighest = parseInt(latestTeam.teamNumber.replace("#", ""), 10);
            if (!isNaN(currentHighest)) {
                nextNumber = currentHighest + 1;
            }
        }

        const teamNumberString = `#${nextNumber.toString().padStart(3, "0")}`;

        const newTeam = await Team.create({
            teamName,
            leaderName,
            leaderPhone,
            leaderBirthDate,
            teamNumber: teamNumberString,
        });

        return NextResponse.json(
            { success: true, teamNumber: newTeam.teamNumber },
            { status: 201 }
        );
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "A team with this information already exists." },
                { status: 400 }
            );
        }
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}
