import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const { data: teams, error } = await supabase
            .from("teams")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch DB Error:", error);
            return NextResponse.json({ error: "Failed to fetch teams." }, { status: 500 });
        }

        return NextResponse.json({ success: true, teams });
    } catch (error: any) {
        console.error("Admin fetch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
