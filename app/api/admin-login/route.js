import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || "forten123";
  const ok = password === expected;
  const response = NextResponse.json({ ok });
  if (ok) {
    response.cookies.set("fortenAdminSession", "active", {
      maxAge: 60 * 60 * 8,
      path: "/",
      sameSite: "lax"
    });
  }
  return response;
}
