import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const query = db.query(
    `SELECT * FROM messages WHERE club_id = $clubId ORDER BY created_at ASC`,
  );
  const messages = query.all({ $clubId: clubId });

  return NextResponse.json(messages);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  try {
    const { clubId } = await params;
    const { email, sender, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO messages (club_id, user_email, sender_name, content) 
      VALUES ($clubId, $email, $sender, $message)
    `);

    // Return the inserted row ID or just success
    const info = stmt.run({
      $clubId: clubId,
      $email: email,
      $sender: sender,
      $message: message,
    });

    return NextResponse.json({ success: true, id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
