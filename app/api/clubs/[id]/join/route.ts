import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Using the newer Next.js patterns where params is async not strictly needed in API routes yet for this version?
// In 16.1.6, API route params in second argument are standard.
// params: { id: string }

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { email } = await req.json();

    if (!email || !id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stmt = db.prepare(`
        INSERT INTO memberships (user_email, club_id) VALUES ($email, $id)
        ON CONFLICT DO NOTHING
    `);
    stmt.run({ $email: email, $id: id });

    return NextResponse.json({ success: true, joined: true });
  } catch (err) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { email } = await req.json();

    if (!email || !id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stmt = db.prepare(
      `DELETE FROM memberships WHERE user_email = $email AND club_id = $id`,
    );
    stmt.run({ $email: email, $id: id });

    return NextResponse.json({ success: true, joined: false });
  } catch (err) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
