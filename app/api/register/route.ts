import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { teamName, leaderName, leaderPhone, leaderBirthDate } = body;

        if (!teamName || !leaderName || !leaderPhone || !leaderBirthDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // --- NEW: Check if phone number already exists ---
        const { data: existingPhone } = await supabase
            .from("teams")
            .select("id")
            .eq("leaderPhone", leaderPhone)
            .single();

        if (existingPhone) {
            return NextResponse.json({ error: "This phone number is already registered to a team." }, { status: 400 });
        }
        // ------------------------------------------------

        // Get current count to assign the next team number
        const { count, error: countError } = await supabase
            .from("teams")
            .select("*", { count: "exact", head: true });

        if (countError) {
            console.error("Count Error:", countError);
            return NextResponse.json({ error: "Failed to fetch team count" }, { status: 500 });
        }

        const teamCount = count || 0;
        const teamNumber = `#${String(teamCount + 1).padStart(3, "0")}`;

        const { data: newTeam, error } = await supabase
            .from("teams")
            .insert([{
                teamNumber,
                teamName,
                leaderName,
                leaderPhone,
                leaderBirthDate,
                role: "Unassigned"
            }])
            .select()
            .single();

        if (error) {
            console.error("Insert Error:", error);
            return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
        }

        return NextResponse.json({ success: true, teamNumber: newTeam.teamNumber }, { status: 201 });
    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
