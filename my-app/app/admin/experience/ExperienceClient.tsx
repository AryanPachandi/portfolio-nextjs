"use client";

import { useState, useTransition } from "react";
import { createExperienceAction, updateExperienceAction, deleteExperienceAction } from "@/lib/actions/adminActions";
import { Plus, Edit3, Trash2, Save, X, Loader2, Briefcase, CheckCircle2, AlertCircle } from "lucide-react";

export default function ExperienceClient({ initialExperiences }: { initialExperiences: any[] }) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [isPending, startTransition] = useTransition();
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emptyForm = {
    year: "2026",
    role: "",
    company: "",
    location: "",
    employmentType: "",
    current: false,
    description: "",
    technologies: "",
    displayOrder: experiences.length + 1,
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({ ...emptyForm, displayOrder: experiences.length + 1 });
    setIsCreating(true);
    setError(null);
  };

  const handleOpenEdit = (item: any) => {
    setIsCreating(false);
    setEditingItem(item);
    setForm({
      year: item.year || "2026",
      role: item.role || "",
      company: item.company || "",
      location: item.location || "",
      employmentType: item.employmentType || "",
      current: item.current || false,
      description: item.description || "",
      technologies: item.technologies || "",
      displayOrder: item.displayOrder || 0,
    });
    setError(null);
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setEditingItem(null);
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

      const res = editingItem
        ? await updateExperienceAction(editingItem.id, payload)
        : await createExperienceAction(payload);

      if (res.success && res.data) {
        if (editingItem) {
          setExperiences((prev) => prev.map((e) => (e.id === editingItem.id ? res.data : e)));
        } else {
          setExperiences((prev) => [...prev, res.data]);
        }
        handleCloseModal();
      } else {
        setError(res.error || "Failed to save experience entry");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;

    startTransition(async () => {
      const res = await deleteExperienceAction(id);
      if (res.success) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-purple-600/25 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-[#13141B] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  {exp.year}
                </span>
                {exp.current && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    Now
                  </span>
                )}
                <span className="text-xs text-slate-500">Order: {exp.displayOrder}</span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
              <p className="text-xs text-slate-400 font-medium">{exp.company}</p>

              {exp.description && <p className="text-xs text-slate-400 mt-2 leading-relaxed">{exp.description}</p>}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(exp)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
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
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {editingItem ? "Edit Experience" : "Add Experience"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Web Developer Intern"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Company / Place *
                </label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Bee Creatives"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-purple-500 outline-none"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1B23] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.current}
                  onChange={(e) => setForm({ ...form, current: e.target.checked })}
                  className="w-4 h-4 accent-purple-600 rounded"
                />
                <span className="text-xs font-semibold text-slate-200">Current Position (Shows "Now" badge)</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of work done..."
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-purple-500 outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/25 flex items-center gap-2"
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
