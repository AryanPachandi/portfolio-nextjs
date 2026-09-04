import Link from "next/link";
import { prisma } from "@/lib/db";
import { FolderGit2, Plus, Edit3, CheckCircle2, AlertCircle, ExternalLink, Star } from "lucide-react";
import ProjectsListClient from "./ProjectsListClient";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FolderGit2 className="w-7 h-7 text-indigo-400" />
            <span>Projects Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create, edit, feature, publish or delete portfolio projects.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/25 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </Link>
      </div>

      <ProjectsListClient initialProjects={projects} />
    </div>
  );
}
