import { prisma } from "@/lib/db";
import { GraduationCap } from "lucide-react";
import EducationClient from "./EducationClient";

export const revalidate = 0;

export default async function AdminEducationPage() {
  const educationList = await prisma.education.findMany({
    orderBy: { displayOrder: "asc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-cyan-400" />
            <span>Education</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your academic history, degrees, and university credentials.
          </p>
        </div>
      </div>

      <EducationClient initialList={educationList} />
    </div>
  );
}
