import { NextResponse } from "next/server";

export async function POST(request) {
  const lead = await request.json();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const timestamp = new Date().toISOString();

  if (!token || !chatId) {
    console.info("Forten Telegram lead notification skipped: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return NextResponse.json({ ok: true, telegram: "skipped", reason: "not_configured" });
  }

  const text = [
    "🔔 NEW FORTEN WEBSITE LEAD",
    "",
    "Ticket:",
    lead.ticketNumber || "-",
    "",
    "Business:",
    lead.businessName || "-",
    "",
    "Contact:",
    lead.contact || lead.contactName || "-",
    "",
    "Phone:",
    lead.phone || "-",
    "",
    "Email:",
    lead.email || "-",
    "",
    "Address:",
    lead.address || lead.serviceAddress || "-",
    "",
    "Equipment:",
    lead.equipment || lead.equipmentType || "-",
    "",
    "Brand / Model:",
    [lead.brand || lead.manufacturer || lead.brandModel, lead.model || lead.equipmentBrandModel].filter(Boolean).join(" / ") || "-",
    "",
    "Problem:",
    lead.issue || lead.problemDescription || "-",
    "",
    "Preferred Contact:",
    lead.preferredContactMethod || "-",
    "",
    "Preferred Time:",
    lead.notes || lead.preferredServiceTime || "-",
    "",
    "Source:",
    "Website",
    "",
    "Assigned:",
    lead.assigned || "Dispatcher Queue",
    "",
    "Status:",
    lead.status || "NEW LEAD",
    "",
    "Timestamp:",
    lead.created || lead.createdAt || timestamp
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const telegramBody = await response.text();
    console.info("Forten Telegram lead notification response", {
      status: response.status,
      ok: response.ok,
      body: telegramBody
    });

    if (!response.ok) {
      return NextResponse.json({ ok: true, telegram: "failed", telegramStatus: response.status });
    }

    return NextResponse.json({ ok: true, telegram: "sent", telegramStatus: response.status });
  } catch (error) {
    console.info("Forten Telegram lead notification failed", error);
    return NextResponse.json({ ok: true, telegram: "failed" });
  }
}
