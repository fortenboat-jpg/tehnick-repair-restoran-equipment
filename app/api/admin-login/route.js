import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || "forten123";
  return NextResponse.json({ ok: password === expected });
}
