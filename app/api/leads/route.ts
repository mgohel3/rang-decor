import { NextResponse } from "next/server";

// Receives leads from the site (popup and catalogue downloads).
// Set LEADS_WEBHOOK_URL (for example the CMS leads endpoint or a form/sheet webhook) to forward each lead.
// Without it, leads are only written to the server log, so set it before launch.
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 }); }
  if (clean(body.company, 100)) return NextResponse.json({ ok: true }); // honeypot: pretend success, store nothing

  const lead = {
    name: clean(body.name, 120), email: clean(body.email, 160), phone: clean(body.phone, 40), role: clean(body.role, 60),
    source: clean(body.source, 40), catalogue: clean(body.catalogue, 80), page: clean(body.page, 200), at: new Date().toISOString(),
  };
  if (lead.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false, error: "Please check your details" }, { status: 422 });
  }

  const hook = process.env.LEADS_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(8000) });
      if (!r.ok) console.error("lead webhook returned", r.status);
    } catch (e) { console.error("lead webhook failed", e); }
  } else {
    console.log("lead (no LEADS_WEBHOOK_URL set)", JSON.stringify(lead));
  }
  return NextResponse.json({ ok: true });
}
