import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { role } = await req.json();

        if (!["Crew", "Imposter", "Unassigned"].includes(role)) {
            return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
        }

        const { data: updatedTeam, error } = await supabase
            .from("teams")
            .update({ role })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Update DB Error:", error);
            return NextResponse.json({ error: "Failed to update team." }, { status: 500 });
        }

        return NextResponse.json({ success: true, team: updatedTeam });
    } catch (error: any) {
        console.error("Error updating team role:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const { error } = await supabase
            .from("teams")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete DB Error:", error);
            return NextResponse.json({ error: "Failed to delete team." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting team:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
