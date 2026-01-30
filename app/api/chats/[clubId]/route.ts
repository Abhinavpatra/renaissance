import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const messages = db.getMessages(clubId);

  return NextResponse.json(messages);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> },
) {
  const { clubId } = await params;
  const { email, name, content } = await request.json();

  if (!email || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const message = db.addMessage(
    clubId,
    email,
    name || email.split("@")[0],
    content,
  );

  return NextResponse.json(message);
}
