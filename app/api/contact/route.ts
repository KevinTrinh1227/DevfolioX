// app/api/contact/route.ts
import { NextResponse } from "next/server";

const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;

export async function POST(req: Request) {
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Discord webhook not configured" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, reason, message } = body as {
    name?: string;
    email?: string;
    reason?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const timestamp = new Date().toISOString();

  const content = [
    "📩 **New contact form submission**",
    "",
    `**Name:** ${name}`,
    `**Email:** ${email}`,
    reason ? `**Reason:** ${reason}` : null,
    "",
    "**Message:**",
    message,
    "",
    `🕒 **Received:** ${timestamp}`,
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  return NextResponse.json({ ok: true });
}
