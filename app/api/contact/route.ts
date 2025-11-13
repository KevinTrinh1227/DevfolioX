// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import contactCfg from "../../../config/contact.json";

const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL || "";
const resendApiKey = process.env.RESEND_API_KEY || "";
const toEmail = process.env.CONTACT_TO_EMAIL || "";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const tgToken = process.env.TELEGRAM_BOT_TOKEN || "";
const tgChatId = process.env.TELEGRAM_CHAT_ID || "";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// simple rate limit
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, { count: number; ts: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= MAX_REQ) return false;
  rec.count++;
  return true;
}
function getIP(req: Request) {
  return (
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const disposableDomains = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
]);

function fill(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const ip = getIP(req);
  if (!rateLimit(ip))
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );

  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const limits = contactCfg?.limits ?? {};
  const nameMax = limits.nameMax ?? 80;
  const emailMax = limits.emailMax ?? 254;
  const subjectMax = limits.subjectMax ?? 50;
  const messageMax = limits.messageMax ?? 2000;

  const { name, email, subject, hp, startedAt, sendCopy, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    hp?: string;
    startedAt?: number;
    sendCopy?: boolean;
  };

  if (hp && String(hp).trim().length > 0)
    return NextResponse.json({ ok: true });
  if (typeof startedAt === "number" && Date.now() - startedAt < 1500) {
    return NextResponse.json(
      { error: "Please take a moment before submitting." },
      { status: 400 }
    );
  }

  const _name = String(name || "")
    .trim()
    .slice(0, nameMax);
  const _email = String(email || "")
    .trim()
    .toLowerCase()
    .slice(0, emailMax);
  const _subject = String(
    subject || contactCfg?.ui?.subjectOptions?.[0] || "General message"
  )
    .trim()
    .slice(0, subjectMax);
  const _message = String(message || "")
    .trim()
    .slice(0, messageMax);

  if (!_name || !_email || !_message)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!emailRx.test(_email))
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const domain = (_email.split("@")[1] || "").toLowerCase();
  if (disposableDomains.has(domain))
    return NextResponse.json(
      { error: "Please use a real email address." },
      { status: 400 }
    );

  const urlCount = (_message.match(/https?:\/\/\S+/gi) || []).length;
  if (urlCount > 5)
    return NextResponse.json(
      { error: "Too many links in message" },
      { status: 400 }
    );

  const now = new Date();
  const timestamp = now.toISOString();
  const timestamp_fmt = now.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const varsRaw = {
    name: _name,
    email: _email,
    subject: _subject,
    message: _message,
    timestamp,
    timestamp_fmt,
    ip,
  };
  const varsHtml = {
    ...varsRaw,
    name: escapeHtml(_name),
    email: escapeHtml(_email),
    subject: escapeHtml(_subject),
    message: escapeHtml(_message),
  };

  const tpl = contactCfg?.templates ?? {};
  const discordText = fill(
    tpl?.discord?.content ??
      "📩 **New contact form submission**\n\n**Name:** {{name}}\n**Email:** {{email}}\n**Subject:** {{subject}}\n\n**Message:**\n{{message}}\n\n🕒 **Received:** {{timestamp_fmt}}\n🧭 **IP:** {{ip}}",
    varsRaw
  );

  const telegramText = fill(
    tpl?.telegram?.text ??
      "📩 New contact form submission\nName: {{name}}\nEmail: {{email}}\nSubject: {{subject}}\n\nMessage:\n{{message}}\n\nReceived: {{timestamp_fmt}}\nIP: {{ip}}",
    varsRaw
  );

  const emailSubject = fill(
    tpl?.email?.subject ?? "New contact: {{name}} ({{subject}})",
    varsRaw
  );
  const emailText = fill(
    tpl?.email?.text ??
      "New contact form submission\nName: {{name}}\nEmail: {{email}}\nSubject: {{subject}}\n\nMessage:\n{{message}}\n\nReceived: {{timestamp_fmt}}\nIP: {{ip}}",
    varsRaw
  );

  const emailHtml = fill(
    tpl?.email?.html ??
      "<div><h2>New contact form submission</h2><p><strong>Name:</strong> {{name}}</p><p><strong>Email:</strong> {{email}}</p><p><strong>Subject:</strong> {{subject}}</p><pre>{{message}}</pre></div>",
    varsHtml
  );

  const ackSubject = fill(
    tpl?.email?.ackSubject ?? "Thanks — I received your message",
    varsRaw
  );
  const ackText = fill(
    tpl?.email?.ackText ??
      "Hi {{name}},\n\nThanks for your message about {{subject}}.\nI'll get back to you soon.\n\n— Kevin",
    varsRaw
  );
  const ackHtml = fill(
    tpl?.email?.ackHtml ??
      "<div><p>Hi {{name}},</p><p>Thanks for your message about <strong>{{subject}}</strong>.</p><p>— Kevin</p></div>",
    varsHtml
  );

  const dMax = limits.discordMax ?? 2000;
  const tMax = limits.telegramMax ?? 4096;
  const eMax = limits.emailMax ?? 100000;

  const channelErrors: string[] = [];
  let delivered = false;

  if (webhookUrl) {
    if (discordText.length > dMax)
      channelErrors.push(
        `Discord message too long (${discordText.length}/${dMax}).`
      );
    else {
      try {
        const resp = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: discordText }),
        });
        if (resp.ok) delivered = true;
        else channelErrors.push("Discord delivery failed.");
      } catch {
        channelErrors.push("Discord delivery failed.");
      }
    }
  }

  if (tgToken && tgChatId) {
    if (telegramText.length > tMax)
      channelErrors.push(
        `Telegram message too long (${telegramText.length}/${tMax}).`
      );
    else {
      try {
        const resp = await fetch(
          `https://api.telegram.org/bot${tgToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: tgChatId, text: telegramText }),
          }
        );
        if (resp.ok) delivered = true;
        else channelErrors.push("Telegram delivery failed.");
      } catch {
        channelErrors.push("Telegram delivery failed.");
      }
    }
  }

  if (resend && toEmail) {
    if (emailText.length + emailHtml.length > eMax)
      channelErrors.push("Email content too large.");
    else {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          replyTo: _email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });
        delivered = true;
        if (body?.sendCopy && emailRx.test(_email)) {
          await resend.emails.send({
            from: fromEmail,
            to: [_email],
            subject: ackSubject,
            text: ackText,
            html: ackHtml,
          });
        }
      } catch {
        channelErrors.push("Email delivery failed.");
      }
    }
  }

  if (!delivered) {
    const err = channelErrors[0] || "Delivery failed. Please try again later.";
    return NextResponse.json({ error: err }, { status: 502 });
  }

  return NextResponse.json({ ok: true, warnings: channelErrors });
}
