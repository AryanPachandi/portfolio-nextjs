"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteProjectAction } from "@/lib/actions/adminActions";
import {
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Loader2,
  AlertTriangle,
  FolderGit2,
} from "lucide-react";

export default function ProjectsListClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredProjects = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const res = await deleteProjectAction(deleteTarget.id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#13141B] p-4 border border-white/10 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, category, tags..."
            className="w-full bg-[#1A1B23] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-slate-100 placeholder-slate-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-[#13141B] border border-white/10 rounded-3xl text-slate-400">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold">No projects found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting search or add a new project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#13141B] border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-white/20 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400 tracking-wider">
                    #{project.number || "01"}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white">{project.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags
                    .split(",")
                    .map((tag: string) => tag.trim())
                    .filter(Boolean)
                    .map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-semibold text-slate-500">{project.category} · {project.year}</span>

                <div className="flex items-center gap-2">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                      title="Live URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 transition-all"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13141B] border border-rose-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            </div>
            <p className="text-sm text-slate-300">
              Are you sure you want to delete <strong className="text-white">"{deleteTarget.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
