/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/adminActions";
import { Session } from "next-auth";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Wrench,
  Share2,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Social Links", href: "/admin/social", icon: Share2 },
];

export default function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render children directly without admin navigation shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const currentItem =
    navItems.find((item) =>
      item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
    ) || navItems[0];

  const user = session?.user;
  const userName = user?.name || "Admin User";
  const userEmail = user?.email || "";
  const userImage = user?.image;

  return (
    <div className="min-h-screen bg-[#0D0E12] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Navigation Header */}
      <div className="md:hidden sticky top-0 z-[120] bg-[#13141B] border-b border-white/10 shadow-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 font-bold text-base text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Aryan CMS</span>
            <span className="text-xs font-normal text-slate-400 border-l border-white/10 pl-2">
              {currentItem.label}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border border-indigo-500/30 object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                {userName.charAt(0)}
              </div>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Quick Tabs */}
        <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto border-t border-white/5 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-white/5 text-slate-300 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-[130] w-64 bg-[#13141B] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5 font-extrabold text-xl text-white tracking-tight">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
              <span>Aryan CMS</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Authenticated User Display */}
          {userEmail && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full border border-indigo-500/40 object-cover shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{userName}</div>
                <div className="text-[11px] text-slate-400 truncate">{userEmail}</div>
              </div>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[125] md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
