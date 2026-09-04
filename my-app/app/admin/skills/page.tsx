import { prisma } from "@/lib/db";
import { Wrench } from "lucide-react";
import SkillsClient from "./SkillsClient";

export const revalidate = 0;

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { displayOrder: "asc" },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Wrench className="w-7 h-7 text-amber-400" />
            <span>Tech Stack & Skills</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your skill categories, frameworks, databases, and development tools.
          </p>
        </div>
      </div>

      <SkillsClient initialSkills={skills} />
    </div>
  );
}
