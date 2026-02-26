import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const teamNumber = cookieStore.get("auth_team")?.value;

        if (!teamNumber) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const team = await Team.findOne({ teamNumber });

        if (!team) {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, team });
    } catch (error) {
        console.error("Auth me error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
