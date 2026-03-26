import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_INSTAGRAM_HANDLE_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 2000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

const inMemoryIpHits = new Map<string, number[]>();

function sanitizeText(input: unknown, maxLength: number) {
  if (typeof input !== "string") return "";

  let value = input.replace(/\r\n/g, "\n");
  value = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  value = value.trim();

  if (value.length > maxLength) value = value.slice(0, maxLength);
  return value;
}

function sanitizeInstagramHandle(input: unknown) {
  const raw = sanitizeText(input, MAX_INSTAGRAM_HANDLE_LENGTH);
  return raw.replace(/[^a-zA-Z0-9._@]/g, "").trim();
}

function isValidEmail(email: string) {
  if (email.length > MAX_EMAIL_LENGTH) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkInMemoryRateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const prev = inMemoryIpHits.get(ip) ?? [];
  const filtered = prev.filter((ts) => ts > windowStart);

  if (filtered.length >= RATE_LIMIT_MAX) {
    inMemoryIpHits.set(ip, filtered);
    return false;
  }

  filtered.push(now);
  inMemoryIpHits.set(ip, filtered);
  return true;
}

let upstashLimiter:
  | {
      limit: (identifier: string) => Promise<{ success: boolean }>;
    }
  | null = null;
let upstashInitAttempted = false;

async function getUpstashLimiter() {
  if (upstashInitAttempted) return upstashLimiter;
  upstashInitAttempted = true;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const dynamicImport = Function(
      "moduleName",
      "return import(moduleName)",
    ) as unknown as (moduleName: string) => Promise<unknown>;

    type UpstashRatelimitModule = {
      Ratelimit: {
        new (options: { redis: unknown; limiter: unknown; prefix: string }): {
          limit: (identifier: string) => Promise<{ success: boolean }>;
        };
        slidingWindow: (limit: number, window: string) => unknown;
      };
    };

    type UpstashRedisModule = {
      Redis: new (options: { url: string; token: string }) => unknown;
    };

    const [ratelimitModule, redisModule] = await Promise.all([
      dynamicImport("@upstash/ratelimit") as Promise<UpstashRatelimitModule>,
      dynamicImport("@upstash/redis") as Promise<UpstashRedisModule>,
    ]);

    const redis = new redisModule.Redis({ url, token });
    upstashLimiter = new ratelimitModule.Ratelimit({
      redis,
      limiter: ratelimitModule.Ratelimit.slidingWindow(RATE_LIMIT_MAX, "10 m"),
      prefix: "contact",
    });
  } catch {
    upstashLimiter = null;
  }

  return upstashLimiter;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limiter = await getUpstashLimiter();
  if (limiter) {
    const { success } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
  } else {
    if (!checkInMemoryRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  const honeypot = sanitizeText(payload.company, 80);
  if (honeypot) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = sanitizeText(payload.name, MAX_NAME_LENGTH);
  const email = sanitizeText(payload.email, MAX_EMAIL_LENGTH).toLowerCase();
  const instagramHandle = sanitizeInstagramHandle(payload.instagramHandle);
  const message = sanitizeText(payload.message, MAX_MESSAGE_LENGTH);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || ownerEmail;

  if (!resendApiKey || !ownerEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: "Server email is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);

  const ownerSubject = `New contact form submission — ${name}`;
  const ownerText = [
    `Name: ${name}`,
    `Email: ${email}`,
    instagramHandle ? `Instagram: ${instagramHandle}` : "Instagram: (not provided)",
    "",
    "Message:",
    message || "(not provided)",
  ].join("\n");

  const replySubject = `We received your message — ${process.env.NEXT_PUBLIC_BRAND_NAME || "LKSTUDIOUK"}`;
  const replyText = [
    `Hi ${name},`,
    "",
    "Thank you for getting in touch. We’ve received your message and will get back to you as soon as possible.",
    "",
    "If you need to add anything, just reply to this email.",
    "",
    `${process.env.NEXT_PUBLIC_BRAND_NAME || "LKSTUDIOUK"}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: ownerSubject,
      text: ownerText,
      replyTo: email,
    });

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: replySubject,
      text: replyText,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
