"use client";

import { useState, useTransition } from "react";
import { createSocialLinkAction, updateSocialLinkAction, deleteSocialLinkAction } from "@/lib/actions/adminActions";
import { Plus, Edit3, Trash2, Save, X, Loader2, Share2, ExternalLink, AlertCircle } from "lucide-react";

export default function SocialClient({ initialLinks }: { initialLinks: any[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [isPending, startTransition] = useTransition();
  const [editingLink, setEditingLink] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emptyForm = {
    name: "",
    url: "",
    enabled: true,
    displayOrder: links.length + 1,
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenCreate = () => {
    setEditingLink(null);
    setForm({ ...emptyForm, displayOrder: links.length + 1 });
    setIsCreating(true);
    setError(null);
  };

  const handleOpenEdit = (link: any) => {
    setIsCreating(false);
    setEditingLink(link);
    setForm({
      name: link.name || "",
      url: link.url || "",
      enabled: link.enabled ?? true,
      displayOrder: link.displayOrder || 0,
    });
    setError(null);
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setEditingLink(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const payload = {
        ...form,
        displayOrder: Number(form.displayOrder),
      };

      const res = editingLink
        ? await updateSocialLinkAction(editingLink.id, payload)
        : await createSocialLinkAction(payload);

      if (res.success && res.data) {
        if (editingLink) {
          setLinks((prev) => prev.map((l) => (l.id === editingLink.id ? res.data : l)));
        } else {
          setLinks((prev) => [...prev, res.data]);
        }
        handleCloseModal();
      } else {
        setError(res.error || "Failed to save social link");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;

    startTransition(async () => {
      const res = await deleteSocialLinkAction(id);
      if (res.success) {
        setLinks((prev) => prev.filter((l) => l.id !== id));
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Social Platform</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Social Links Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-[#13141B] border border-white/10 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{link.name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    link.enabled
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                  }`}
                >
                  {link.enabled ? "Active" : "Disabled"}
                </span>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 truncate flex items-center gap-1"
              >
                <span className="truncate">{link.url}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(link)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                disabled={isPending}
                className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {(isCreating || editingLink) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {editingLink ? "Edit Social Link" : "Add Social Platform"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Platform Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="GitHub / LinkedIn / Twitter"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B23] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <span className="text-xs font-semibold text-slate-200">Enabled (Show on public website)</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.displayOrder}
                  onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 flex items-center gap-2"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
