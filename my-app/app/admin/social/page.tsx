import { prisma } from "@/lib/db";
import { Share2 } from "lucide-react";
import SocialClient from "./SocialClient";

export const revalidate = 0;

export default async function AdminSocialPage() {
  const socialLinks = await prisma.socialLink.findMany({
    orderBy: { displayOrder: "asc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Share2 className="w-7 h-7 text-indigo-400" />
            <span>Social Links</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your external profile URLs and footer social links.
          </p>
        </div>
      </div>

      <SocialClient initialLinks={socialLinks} />
    </div>
  );
}
