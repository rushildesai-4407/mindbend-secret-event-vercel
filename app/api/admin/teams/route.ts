import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();

        // Fetch all teams sorted by creation date (newest first)
        const teams = await Team.find().sort({ createdAt: -1 });

        return NextResponse.json({ success: true, teams }, { status: 200 });
    } catch (error) {
        console.error("Error fetching teams for admin:", error);
        return NextResponse.json(
            { error: "Failed to fetch teams." },
            { status: 500 }
        );
    }
}
