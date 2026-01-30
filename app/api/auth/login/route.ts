import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Upsert user
    const stmt = db.prepare(`
      INSERT INTO users (email, name) VALUES ($email, $name)
      ON CONFLICT(email) DO UPDATE SET name = $name
    `);

    stmt.run({ $email: email, $name: name });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
