import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  FolderGit2,
  Briefcase,
  Wrench,
  User,
  Plus,
  ExternalLink,
  Eye,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Share2,
} from "lucide-react";

export const revalidate = 0; // Dynamic dashboard overview

export default async function AdminDashboardPage() {
  const [totalProjects, publishedProjects, experiencesCount, skillsCount, recentProjects, settings] =
    await Promise.all([
      prisma.project.count().catch(() => 0),
      prisma.project.count().catch(() => 0),
      prisma.experience.count().catch(() => 0),
      prisma.skill.count().catch(() => 0),
      prisma.project.findMany({ take: 5, orderBy: { createdAt: "desc" } }).catch(() => []),
      prisma.siteSettings.findUnique({ where: { id: "default" } }).catch(() => null),
    ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900/50 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              {settings?.status || "Available for work"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {settings?.name || "Aryan"} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Manage your portfolio content, update projects, experience, and profile details in real-time.
            </p>
          </div>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 self-start sm:self-auto"
          >
            <User className="w-4 h-4" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#13141B] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{totalProjects}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{publishedProjects} published</span>
          </div>
        </div>

        <div className="bg-[#13141B] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Experience</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{experiencesCount}</div>
          <div className="text-xs text-slate-500 mt-1">Timeline entries</div>
        </div>

        <div className="bg-[#13141B] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Skills</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{skillsCount}</div>
          <div className="text-xs text-slate-500 mt-1">Tech stack tags</div>
        </div>

        <div className="bg-[#13141B] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Graduation</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <User className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{settings?.graduationYear || "2027"}</div>
          <div className="text-xs text-slate-500 mt-1">Target graduation</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/projects/new"
            className="p-5 rounded-2xl bg-[#13141B] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.03] transition-all group shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Add Project</div>
                <div className="text-xs text-slate-400">New portfolio work</div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/experience"
            className="p-5 rounded-2xl bg-[#13141B] border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.03] transition-all group shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Add Experience</div>
                <div className="text-xs text-slate-400">Role or internship</div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/profile"
            className="p-5 rounded-2xl bg-[#13141B] border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.03] transition-all group shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Edit Bio & Photo</div>
                <div className="text-xs text-slate-400">Update site bio</div>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/social"
            className="p-5 rounded-2xl bg-[#13141B] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.03] transition-all group shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cyan-600/20 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Social Links</div>
                <div className="text-xs text-slate-400">GitHub, LinkedIn</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects Overview */}
      <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Projects</h2>
            <p className="text-xs text-slate-400">Overview of your latest portfolio additions</p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Manage All</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">No projects found. Create your first project!</div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1B23] border border-white/5 hover:border-white/10 transition-all gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                    style={{ background: project.gradient || "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)" }}
                  >
                    {project.number || "P"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-sm truncate">{project.title}</div>
                    <div className="text-xs text-slate-400 truncate">{project.category} · {project.year}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live</span>
                  </span>

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
