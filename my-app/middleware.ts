import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isAuthRoute = path === "/admin/login";
  const isAdminRoute = path.startsWith("/admin") && !isAuthRoute;

  const email = req.auth?.user?.email?.trim().toLowerCase();
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAuthenticatedAdmin = Boolean(email && adminEmails.includes(email));

  // Redirect unauthenticated or unauthorized users trying to access /admin pages to /admin/login
  if (isAdminRoute && !isAuthenticatedAdmin) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated authorized admin users trying to access /admin/login to /admin
  if (isAuthRoute && isAuthenticatedAdmin) {
    const adminUrl = new URL("/admin", req.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
