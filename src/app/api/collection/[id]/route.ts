import { NextResponse } from "next/server";
import { db } from "../../../../db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;

        const DELETE_COLLECTION_TABLE_QUERY = sql`DELETE FROM collection WHERE uuid = ${id}`;

        await db.execute(DELETE_COLLECTION_TABLE_QUERY);

        return NextResponse.json({ message: "success delete", id });
    } catch {
        return NextResponse.json({ message: "Delete Error" }, { status: 500 });
    }
}
