import { NextResponse } from "next/server";

export async function POST(request) {
  const lead = await request.json();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: true, telegram: "not_configured" });
  }

  const text = [
    "New Forten website lead",
    `Business: ${lead.businessName || "-"}`,
    `Contact: ${lead.contact || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Address: ${lead.address || "-"}`,
    `Type: ${lead.businessType || "-"}`,
    `Equipment: ${lead.equipment || "-"}`,
    `Urgency: ${lead.urgency || "-"}`,
    `Issue: ${lead.issue || "-"}`,
    `Notes: ${lead.notes || "-"}`
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    if (!response.ok) {
      return NextResponse.json({ ok: true, telegram: "failed" });
    }

    return NextResponse.json({ ok: true, telegram: "sent" });
  } catch {
    return NextResponse.json({ ok: true, telegram: "failed" });
  }
}
