import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clubId } = await params;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  db.joinClub(email, clubId);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clubId } = await params;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  db.leaveClub(email, clubId);

  return NextResponse.json({ success: true });
}
