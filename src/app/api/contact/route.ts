import { Resend } from "resend";

import {
  validateContact,
  type ContactPayload,
} from "@/lib/contact-schema";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@maridots.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Maridots Website <website@maridots.com>";

/**
 * Per-instance rate limiting. Enough to stop naive form spam; put a WAF or
 * a shared store in front of it if the site is deployed across many instances.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(entry);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#0f172a;font-size:14px;vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
  </tr>`;
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return Response.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return Response.json({ ok: true });
  }

  if (isRateLimited(clientKey(request))) {
    return Response.json(
      {
        ok: false,
        error: "Too many enquiries from this connection. Please try again later.",
      },
      { status: 429 },
    );
  }

  const fieldErrors = validateContact(body);
  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const value = (input: unknown) =>
    typeof input === "string" ? input.trim() : "";

  const lead = {
    fullName: value(body.fullName),
    company: value(body.company),
    role: value(body.role),
    email: value(body.email),
    phone: value(body.phone) || "Not provided",
    fleetSize: value(body.fleetSize) || "Not provided",
    message: value(body.message),
    pageUrl: value(body.pageUrl) || "https://maridots.com/",
    submittedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Without a key the site still works in development; the lead is logged
    // rather than dropped so nothing is lost while DNS is being verified.
    console.warn(
      `[maridots] RESEND_API_KEY is not set — enquiry logged instead of emailed: ${JSON.stringify(lead)}`,
    );
    return Response.json({ ok: true, delivered: false });
  }

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:'Source Sans 3',Helvetica,Arial,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;">
      <div style="background:#0f172a;padding:20px 24px;">
        <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">New website enquiry</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">maridots.com contact form</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Full name", lead.fullName)}
          ${row("Company", lead.company)}
          ${row("Role", lead.role)}
          ${row("Work email", lead.email)}
          ${row("Phone", lead.phone)}
          ${row("Fleet size", lead.fleetSize)}
          ${row("Message", lead.message)}
          ${row("Submitted", lead.submittedAt)}
          ${row("Page", lead.pageUrl)}
        </table>
      </div>
    </div>
  </body>
</html>`;

  const text = [
    "New website enquiry — maridots.com",
    "",
    `Full name:   ${lead.fullName}`,
    `Company:     ${lead.company}`,
    `Role:        ${lead.role}`,
    `Work email:  ${lead.email}`,
    `Phone:       ${lead.phone}`,
    `Fleet size:  ${lead.fleetSize}`,
    "",
    "Message:",
    lead.message,
    "",
    `Submitted:   ${lead.submittedAt}`,
    `Page:        ${lead.pageUrl}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: lead.email,
      subject: `Maridots website enquiry — ${lead.company}`,
      html,
      text,
    });

    if (error) {
      console.error("[maridots] Resend rejected the enquiry", error);
      return Response.json(
        {
          ok: false,
          error:
            "We could not send your enquiry just now. Please email info@maridots.com directly.",
        },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[maridots] Failed to deliver enquiry", cause);
    return Response.json(
      {
        ok: false,
        error:
          "We could not send your enquiry just now. Please email info@maridots.com directly.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, delivered: true });
}
