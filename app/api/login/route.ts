import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { teamNumber, password } = await req.json();

        if (!teamNumber || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        // Check if the input is a Team ID (with or without #) or a Phone Number
        let input = teamNumber.trim();
        let query = supabase.from("teams").select("*").eq("leaderBirthDate", password);

        // If it looks like a short number (e.g. "042" or "42" or "#42"), format it as a Team ID
        const isLikelyTeamId = input.startsWith("#") || (input.length <= 4 && !isNaN(Number(input)));

        if (isLikelyTeamId) {
            // Ensure it has the # prefix and minimum 3 digits padding if they just typed "1"
            let formattedId = input.startsWith("#") ? input : `#${input.padStart(3, "0")}`;
            query = query.eq("teamNumber", formattedId.toUpperCase());
        } else {
            // Otherwise, treat it as a phone number query
            query = query.eq("leaderPhone", input);
        }

        const { data: team, error } = await query.single();

        if (error || !team) {
            return NextResponse.json({ error: "Invalid Team ID or Password" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true, teamNumber: team.teamNumber });
        response.cookies.set("auth_team", team.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 3, // 3 days
            path: "/",
        });

        return response;
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
