import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { teamNumber, password } = await req.json();

        if (!teamNumber || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        // Find team by teamNumber
        // Password is the leaderBirthDate
        const team = await Team.findOne({
            teamNumber: teamNumber.toUpperCase(),
            leaderBirthDate: password
        });

        if (!team) {
            return NextResponse.json({ error: "Invalid Team ID or Password" }, { status: 401 });
        }

        // Set a simple cookie for "auth"
        const cookieStore = await cookies();
        cookieStore.set("auth_team", team.teamNumber, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 3, // 3 days
            path: "/",
        });

        return NextResponse.json({ success: true, teamNumber: team.teamNumber });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
