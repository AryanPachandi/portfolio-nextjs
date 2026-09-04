import { prisma } from "@/lib/db";
import { Briefcase } from "lucide-react";
import ExperienceClient from "./ExperienceClient";

export const revalidate = 0;

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { displayOrder: "asc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Briefcase className="w-7 h-7 text-purple-400" />
            <span>Experience & Journey</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your career timeline, internships, roles, and major milestones.
          </p>
        </div>
      </div>

      <ExperienceClient initialExperiences={experiences} />
    </div>
  );
}
