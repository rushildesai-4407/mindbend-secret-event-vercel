import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const rawTeamId = cookieStore.get("auth_team")?.value;

        if (!rawTeamId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: team, error } = await supabase
            .from("teams")
            .select("*")
            .eq("id", rawTeamId)
            .single();

        if (error || !team) {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, team });
    } catch (error: any) {
        console.error("Auth me error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
