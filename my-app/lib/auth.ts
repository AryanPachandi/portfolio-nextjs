import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";

function getAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAILS ?? "";
  return envEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) {
        return false;
      }
      const adminEmails = getAdminEmails();
      return adminEmails.includes(email);
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});

/**
 * Reusable server-side helper to enforce admin authorization.
 * 1. Retrieves current NextAuth session.
 * 2. Checks if user is authenticated and email is in ADMIN_EMAILS.
 * 3. Redirects to /admin/login if not authorized.
 * 4. Returns valid session when authorized.
 */
export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  const adminEmails = getAdminEmails();

  if (!email || !adminEmails.includes(email)) {
    redirect("/admin/login");
  }

  return session;
}

/**
 * Reusable server-side helper for API routes (returns null if unauthorized).
 */
export async function checkAdminApi() {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  const adminEmails = getAdminEmails();

  if (!email || !adminEmails.includes(email)) {
    return null;
  }

  return session;
}
