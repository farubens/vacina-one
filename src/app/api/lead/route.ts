import { NextResponse } from "next/server";
import { sendLeadEmails, type LeadPayload } from "../../../lib/lead-mailer";
import { appendLeadToSheet } from "../../../lib/google-sheets";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const ipHits = new Map<string, { count: number; resetAt: number }>();

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || entry.resetAt <= now) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

function buildLead(formData: FormData): LeadPayload {
  const selectedVaccines = formData
    .getAll("vaccine")
    .map((value) => clean(value))
    .filter(Boolean);
  const otherVaccine = clean(formData.get("vaccineOther"));
  const vaccine = selectedVaccines
    .map((item) => (item === "Outras" && otherVaccine ? `Outras: ${otherVaccine}` : item))
    .join(", ");

  return {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")).toLowerCase(),
    phone: clean(formData.get("phone")),
    coupon: clean(formData.get("coupon")),
    vaccine,
  };
}

function isValidLead(lead: LeadPayload) {
  if (!lead.name || lead.name.length < 3 || lead.name.length > 120) {
    return false;
  }

  if (!isEmail(lead.email) || lead.email.length > 180) {
    return false;
  }

  if (!lead.phone || lead.phone.length < 8 || lead.phone.length > 40) {
    return false;
  }

  if (lead.coupon.length > 40 || lead.vaccine.length > 500) {
    return false;
  }

  return true;
}

function redirectTo(path: string, request: Request) {
  return NextResponse.redirect(new URL(path, request.url), { status: 303 });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return redirectTo("/obrigado?status=rate-limited", request);
  }

  const formData = await request.formData();

  if (clean(formData.get("website"))) {
    return redirectTo("/obrigado?status=ok", request);
  }

  const lead = buildLead(formData);

  if (!isValidLead(lead)) {
    return redirectTo("/obrigado?status=invalid", request);
  }

  try {
    await appendLeadToSheet(lead);
    await sendLeadEmails(lead);
    return redirectTo("/obrigado?status=ok", request);
  } catch (error) {
    console.error("Lead submission failed", error);
    return redirectTo("/obrigado?status=error", request);
  }
}
