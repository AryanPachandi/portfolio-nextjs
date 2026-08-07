import { NextResponse } from "next/server";
import { RESEND_FROM, CONTACT_RECIPIENT, resend, buildWelcomeEmailHtml } from "@/app/api/_lib/email";

type SubscribePayload = {
  email?: unknown;
  name?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as SubscribePayload;
    const email = typeof payload.email === "string" ? payload.email.trim() : "";
    const name = typeof payload.name === "string" ? payload.name.trim() : "You";

    if (!isNonEmptyString(payload.email) || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_RECIPIENT,
      subject: `New portfolio lead: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px; color:#111827;">
          <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
            <div style="background:linear-gradient(135deg, #111827 0%, #5b4bff 100%); padding:24px 32px; color:#ffffff;">
              <h2 style="margin:0 0 8px; font-size:24px;">New email capture</h2>
              <p style="margin:0; font-size:14px; opacity:0.9;">Someone chose to stay connected through your portfolio.</p>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
              <p style="margin:0;"><strong>Name:</strong> ${name}</p>
            </div>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "You made it. 👋",
      html: buildWelcomeEmailHtml(name || "there"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Portfolio subscribe failed:", error);
    return NextResponse.json({ error: "Unable to save your email right now." }, { status: 500 });
  }
}
