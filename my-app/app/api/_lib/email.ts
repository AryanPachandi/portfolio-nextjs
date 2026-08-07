import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const RESEND_FROM = "Aryan Pachandi <getmejob@aryanpachandi.space>";
export const CONTACT_RECIPIENT = "pachandiaryan@gmail.com";
export const PORTFOLIO_URL = "https://aryanpachandi.space";
export const GITHUB_URL = "https://github.com/AryanPachandi";
export const LINKEDIN_URL = "https://www.linkedin.com/in/aryan-pachandi-bb7b6822a/";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildNotificationEmailHtml(name: string, email: string, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px; color:#111827;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #111827 0%, #1f2937 100%); padding:24px 32px; color:#ffffff;">
          <h2 style="margin:0 0 8px; font-size:24px;">New Portfolio Message</h2>
          <p style="margin:0; font-size:14px; opacity:0.9;">A visitor has submitted a message through your portfolio contact form.</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">You received a new message from your portfolio website.</p>
          <div style="background:#f9fafb; border-radius:8px; padding:16px; margin-bottom:16px;">
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:0 0 8px;"><strong>Message:</strong></p>
            <p style="margin:0; white-space:pre-wrap; line-height:1.7;">${escapeHtml(message)}</p>
          </div>
          <p style="margin:0; font-size:14px; color:#6b7280;">Please reply to the visitor at the email above when convenient.</p>
        </div>
      </div>
    </div>
  `;
}

export function buildAutoReplyEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px; color:#111827;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #111827 0%, #3b82f6 100%); padding:24px 32px; color:#ffffff;">
          <h2 style="margin:0 0 8px; font-size:24px;">Thanks for reaching out</h2>
          <p style="margin:0; font-size:14px; opacity:0.9;">Your message has been received successfully.</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Thank you for reaching out through my portfolio. I've successfully received your message.</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">I'll personally review it and usually respond within 24 hours.</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Meanwhile, feel free to explore my portfolio or connect with me on LinkedIn.</p>
          <p style="margin:0 0 24px; font-size:16px; line-height:1.7;">Looking forward to speaking with you.</p>
          <p style="margin:0 0 6px; font-size:16px;">Best regards,</p>
          <p style="margin:0; font-size:16px; font-weight:600;">Aryan Pachandi</p>
          <p style="margin:0; font-size:14px; color:#6b7280;">Full Stack Developer</p>
          <div style="margin-top:24px; padding-top:16px; border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px; font-size:14px;"><strong>Portfolio:</strong> <a href="${PORTFOLIO_URL}" style="color:#2563eb;">${PORTFOLIO_URL}</a></p>
            <p style="margin:0 0 8px; font-size:14px;"><strong>GitHub:</strong> <a href="${GITHUB_URL}" style="color:#2563eb;">${GITHUB_URL}</a></p>
            <p style="margin:0; font-size:14px;"><strong>LinkedIn:</strong> <a href="${LINKEDIN_URL}" style="color:#2563eb;">${LINKEDIN_URL}</a></p>
          </div>
        </div>
        <div style="padding:0 32px 24px; color:#6b7280; font-size:12px; text-align:center;">
          <p style="margin:0;">This is an automated confirmation email.</p>
        </div>
      </div>
    </div>
  `;
}

export function buildWelcomeEmailHtml(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px; color:#111827;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #f5f5f5 0%, #5b4bff 100%); padding:24px 32px; color:#ffffff;">
          <h2 style="margin:0 0 8px; font-size:24px;">You made it. 👋</h2>
          <p style="margin:0; font-size:14px; opacity:0.9;">Thanks for staying connected with my portfolio.</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">Thanks for stopping by my portfolio. Most people visit, scroll, and leave. You decided to stay connected.</p>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">That genuinely means a lot.</p>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">Here are a few places where we can connect:</p>
          <ul style="margin:0 0 16px 20px; padding:0; font-size:16px; line-height:1.8;">
            <li><strong>Portfolio:</strong> <a href="${PORTFOLIO_URL}" style="color:#2563eb;">${PORTFOLIO_URL}</a></li>
            <li><strong>GitHub:</strong> <a href="${GITHUB_URL}" style="color:#2563eb;">${GITHUB_URL}</a></li>
            <li><strong>LinkedIn:</strong> <a href="${LINKEDIN_URL}" style="color:#2563eb;">${LINKEDIN_URL}</a></li>
          </ul>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">If you're hiring, building something exciting, or just want to talk tech, I'd love to hear from you.</p>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7;">Hope we build something amazing together.</p>
          <p style="margin:0 0 4px; font-size:16px;">Aryan Pachandi</p>
          <p style="margin:0; font-size:14px; color:#6b7280;">Full Stack Developer</p>
        </div>
        <div style="padding:0 32px 24px; color:#6b7280; font-size:12px; text-align:center;">
          <p style="margin:0;">You received this because you chose to stay connected through my portfolio.</p>
        </div>
      </div>
    </div>
  `;
}
