import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Team from "@/models/Team";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await context.params;
        const body = await req.json();

        const { role } = body;

        // Validate the role string
        if (!["Crew", "Imposter", "Unassigned"].includes(role)) {
            return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            { role },
            { new: true } // Return the updated document
        );

        if (!updatedTeam) {
            return NextResponse.json({ error: "Team not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, team: updatedTeam });
    } catch (error) {
        console.error("Error updating team role:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
