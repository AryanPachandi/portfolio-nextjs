"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction, updateProjectAction } from "@/lib/actions/adminActions";
import { FolderGit2, Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle, Upload, Sparkles } from "lucide-react";

export default function ProjectFormClient({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(initialData?.id);

  const [form, setForm] = useState({
    number: initialData?.number || "01",
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Web App",
    year: initialData?.year || new Date().getFullYear().toString(),
    tags: initialData?.tags || "",
    description: initialData?.description || "",
    longDescription: initialData?.longDescription || "",
    projectImage: initialData?.projectImage || "",
    githubUrl: initialData?.githubUrl || "#",
    liveUrl: initialData?.liveUrl || "#",
    featured: initialData?.featured ?? true,
    published: initialData?.published ?? true,
    displayOrder: initialData?.displayOrder || 0,
    gradient: initialData?.gradient || "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)",
  });

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: !isEditing ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : prev.slug,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, projectImage: data.url }));
      } else {
        setError(data.error || "Image upload failed");
      }
    } catch (err: any) {
      setError(err?.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const payload = {
        ...form,
        displayOrder: Number(form.displayOrder),
      };

      const res = isEditing
        ? await updateProjectAction(initialData.id, payload)
        : await createProjectAction(payload);

      if (res.success) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(res.error || "Failed to save project");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {isEditing ? `Edit: ${initialData.title}` : "Create New Project"}
            </h1>
            <p className="text-xs text-slate-400">Fill in project details and save changes</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending || uploading}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isEditing ? "Save Changes" : "Create Project"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Pac Wallet"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="pac-wallet"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Category *
              </label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="FinTech Backend / Web App"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Year *
              </label>
              <input
                type="text"
                required
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2026"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Tech Stack Tags (Comma separated)
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Node.js, Express.js, MongoDB, JWT"
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief summary of what this project accomplishes..."
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Media & Links */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Media & Links</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Live Demo URL
              </label>
              <input
                type="text"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://myproject.com"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Project Image (Cloudinary Upload / URL)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-300 cursor-pointer"
              />
              {uploading && <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />}
            </div>
            {form.projectImage && (
              <div className="mt-3 w-40 h-24 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                <img src={form.projectImage} alt="Project Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Display Settings & Gradient */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Display & Status Settings</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#1A1B23] border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <div>
                <div className="text-sm font-bold text-white">Published</div>
                <div className="text-xs text-slate-400">Visible on homepage</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#1A1B23] border border-white/10 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <div>
                <div className="text-sm font-bold text-white">Featured</div>
                <div className="text-xs text-slate-400">Highlight in work section</div>
              </div>
            </label>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending || uploading}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{isEditing ? "Save Changes" : "Create Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
