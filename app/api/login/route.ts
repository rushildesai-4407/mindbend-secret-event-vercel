import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const { teamNumber, password } = await req.json();

        if (!teamNumber || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        // Check if the input is a Team ID (starts with #) or a Phone Number
        const input = teamNumber.trim();
        let query = supabase.from("teams").select("*").eq("leaderBirthDate", password);

        if (input.startsWith("#")) {
            query = query.eq("teamNumber", input.toUpperCase());
        } else {
            query = query.eq("leaderPhone", input);
        }

        const { data: team, error } = await query.single();

        if (error || !team) {
            return NextResponse.json({ error: "Invalid Team ID or Password" }, { status: 401 });
        }

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_team", team.teamNumber, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 3, // 3 days
            path: "/",
        });

        return NextResponse.json({ success: true, teamNumber: team.teamNumber });
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
