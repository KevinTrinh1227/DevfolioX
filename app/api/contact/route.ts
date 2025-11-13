// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import contactCfg from "../../../config/contact.json";

export const runtime = "nodejs";

// ─── ENV ──────────────────────────────────────────────────────────────────────
const DISCORD_WEBHOOK = process.env.DISCORD_CONTACT_WEBHOOK_URL || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// ─── LIMITS / CONFIG (keeps parity with frontend) ────────────────────────────
const limits = contactCfg?.limits ?? {};
const NAME_MAX = limits.nameMax ?? 50;
const EMAIL_MAX = limits.emailMax ?? 50;
const SUBJECT_MAX = limits.subjectMax ?? 50;
const MESSAGE_MAX = limits.messageMax ?? 1000;

const DISCORD_MAX = limits.discordMax ?? 2000;
const TELEGRAM_MAX = limits.telegramMax ?? 2000;
// Not an actual SMTP limit; just a guardrail
const EMAIL_CONTENT_MAX = limits.emailContentMax ?? 2000;

// ─── UTIL ────────────────────────────────────────────────────────────────────
const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const disposableDomains = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
]);

const clip = (s: string, n: number) => (s ?? "").toString().slice(0, n);

function fill(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? "");
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Avoid Discord pings like @everyone
function sanitizeForDiscord(s: string) {
  return s.replace(/@/g, "@\u200B").replace(/`/g, "´"); // soften backticks too
}

// Request IP best-effort
function getIP(req: NextRequest | Request): string {
  // NextRequest has .headers same API
  const xfwd = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  return xfwd || req.headers.get("x-real-ip") || "0.0.0.0";
}

// Simple in-memory rate limit (per instance)
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

// Small fetch helper with timeout
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = 10_000
) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getIP(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  // Parse JSON safely
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    email,
    subject,
    message,
    hp, // honeypot
    startedAt,
    sendCopy,
  }: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    hp?: string;
    startedAt?: number;
    sendCopy?: boolean;
  } = body || {};

  // Honeypot or suspiciously instant submit → silently succeed
  if (hp && String(hp).trim()) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (typeof startedAt === "number" && Date.now() - startedAt < 1500) {
    return NextResponse.json(
      { error: "Please take a moment before submitting." },
      { status: 400 }
    );
  }

  // Clip & validate
  const _name = clip(String(name || "").trim(), NAME_MAX);
  const _email = clip(
    String(email || "")
      .trim()
      .toLowerCase(),
    EMAIL_MAX
  );
  const _subject = clip(
    String(
      subject || contactCfg?.ui?.subjectOptions?.[0] || "General message"
    ).trim(),
    SUBJECT_MAX
  );
  const _message = clip(
    String(message || "")
      .trim()
      .replace(/\r/g, ""),
    MESSAGE_MAX
  );

  if (!_name || !_email || !_message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!emailRx.test(_email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const domain = (_email.split("@")[1] || "").toLowerCase();
  if (disposableDomains.has(domain)) {
    return NextResponse.json(
      { error: "Please use a real email address." },
      { status: 400 }
    );
  }
  const urlCount = (_message.match(/https?:\/\/\S+/gi) || []).length;
  if (urlCount > 5) {
    return NextResponse.json(
      { error: "Too many links in message" },
      { status: 400 }
    );
  }

  // Timestamps
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

  // Vars
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

  // Templates/fallbacks
  const tpl = contactCfg?.templates ?? {};
  const discordContentRaw =
    tpl?.discord?.content ??
    "📩 **New contact form submission**\n\n**Name:** {{name}}\n**Email:** {{email}}\n**Subject:** {{subject}}\n\n**Message:**\n{{message}}\n\n🕒 **Received:** {{timestamp_fmt}}\n🧭 **IP:** {{ip}}";
  const telegramTextTpl =
    tpl?.telegram?.text ??
    "📩 New contact form submission\nName: {{name}}\nEmail: {{email}}\nSubject: {{subject}}\n\nMessage:\n{{message}}\n\nReceived: {{timestamp_fmt}}\nIP: {{ip}}";
  const emailSubjectTpl =
    tpl?.email?.subject ?? "New contact: {{name}} ({{subject}})";
  const emailTextTpl =
    tpl?.email?.text ??
    "New contact form submission\nName: {{name}}\nEmail: {{email}}\nSubject: {{subject}}\n\nMessage:\n{{message}}\n\nReceived: {{timestamp_fmt}}\nIP: {{ip}}";
  const emailHtmlTpl =
    tpl?.email?.html ??
    "<div style='font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;color:#0b1220'><h2 style='margin:0 0 8px'>New contact form submission</h2><p style='margin:4px 0'><strong>Name:</strong> {{name}}</p><p style='margin:4px 0'><strong>Email:</strong> {{email}}</p><p style='margin:4px 0'><strong>Subject:</strong> {{subject}}</p><pre style='white-space:pre-wrap;background:#f6f8fa;padding:12px;border-radius:8px;border:1px solid #e5e7eb'>{{message}}</pre><p style='margin-top:10px;color:#64748b'>Received: {{timestamp_fmt}} • IP: {{ip}}</p></div>";
  const ackSubjectTpl =
    tpl?.email?.ackSubject ?? "Thanks — I received your message";
  const ackTextTpl =
    tpl?.email?.ackText ??
    "Hi {{name}},\n\nThanks for your message about {{subject}}.\nI'll get back to you soon.\n\n— Kevin";
  const ackHtmlTpl =
    tpl?.email?.ackHtml ??
    "<div style='font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;color:#0b1220'><p>Hi {{name}},</p><p>Thanks for your message about <strong>{{subject}}</strong>.</p><p>I'll get back to you soon.</p><p>— Kevin</p></div>";

  // Rendered
  let discordContent = sanitizeForDiscord(fill(discordContentRaw, varsRaw));
  if (discordContent.length > DISCORD_MAX) {
    discordContent = clip(discordContent, DISCORD_MAX - 3) + "...";
  }
  let telegramText = fill(telegramTextTpl, varsRaw);
  if (telegramText.length > TELEGRAM_MAX) {
    telegramText = clip(telegramText, TELEGRAM_MAX - 3) + "...";
  }
  const emailSubject = fill(emailSubjectTpl, varsRaw);
  const emailText = fill(emailTextTpl, varsRaw);
  const emailHtml = fill(emailHtmlTpl, varsHtml);

  const ackSubject = fill(ackSubjectTpl, varsRaw);
  const ackText = fill(ackTextTpl, varsRaw);
  const ackHtml = fill(ackHtmlTpl, varsHtml);

  if (emailText.length + emailHtml.length > EMAIL_CONTENT_MAX) {
    return NextResponse.json(
      { error: "Email content too large." },
      { status: 400 }
    );
  }

  // ─── Deliver ────────────────────────────────────────────────────────────────
  const warnings: string[] = [];
  let delivered = false;

  // Discord
  if (DISCORD_WEBHOOK) {
    try {
      const resp = await fetchWithTimeout(
        DISCORD_WEBHOOK,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: discordContent }),
        },
        10_000
      );
      if (resp.ok) delivered = true;
      else warnings.push("Discord delivery failed.");
    } catch {
      warnings.push("Discord delivery failed.");
    }
  }

  // Telegram (optional)
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      const resp = await fetchWithTimeout(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: "HTML", // we didn't add HTML tags, safe; or omit
            disable_web_page_preview: true,
          }),
        },
        10_000
      );
      if (resp.ok) delivered = true;
      else warnings.push("Telegram delivery failed.");
    } catch {
      warnings.push("Telegram delivery failed.");
    }
  }

  // Email via Resend
  if (resend && CONTACT_TO_EMAIL) {
    try {
      await resend.emails.send({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        replyTo: `${_name} <${_email}>`,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      delivered = true;

      if (sendCopy && emailRx.test(_email)) {
        await resend.emails.send({
          from: CONTACT_FROM_EMAIL,
          to: [_email],
          subject: ackSubject,
          text: ackText,
          html: ackHtml,
        });
      }
    } catch {
      warnings.push("Email delivery failed.");
    }
  }

  if (!delivered) {
    return NextResponse.json(
      {
        error: warnings[0] || "Delivery failed. Please try again later.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, warnings });
}
