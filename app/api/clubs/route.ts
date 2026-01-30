import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { CLUBS } from "@/lib/data";

export async function GET(request: NextRequest) {
  const email = request.headers.get("x-user-email") || "";

  const clubsWithMembership = CLUBS.map((club) => ({
    ...club,
    isMember: email ? db.isMember(email, club.id) : false,
  }));

  return NextResponse.json(clubsWithMembership);
}
