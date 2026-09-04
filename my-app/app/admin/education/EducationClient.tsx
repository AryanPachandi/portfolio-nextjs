"use client";

import { useState, useTransition } from "react";
import { createEducationAction, updateEducationAction, deleteEducationAction } from "@/lib/actions/adminActions";
import { Plus, Edit3, Trash2, Save, X, Loader2, GraduationCap, AlertCircle } from "lucide-react";

export default function EducationClient({ initialList }: { initialList: any[] }) {
  const [list, setList] = useState(initialList);
  const [isPending, startTransition] = useTransition();
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emptyForm = {
    institution: "",
    degree: "",
    field: "",
    startDate: "2023",
    endDate: "2027",
    description: "",
    displayOrder: list.length + 1,
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({ ...emptyForm, displayOrder: list.length + 1 });
    setIsCreating(true);
    setError(null);
  };

  const handleOpenEdit = (item: any) => {
    setIsCreating(false);
    setEditingItem(item);
    setForm({
      institution: item.institution || "",
      degree: item.degree || "",
      field: item.field || "",
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      description: item.description || "",
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
        ? await updateEducationAction(editingItem.id, payload)
        : await createEducationAction(payload);

      if (res.success && res.data) {
        if (editingItem) {
          setList((prev) => prev.map((e) => (e.id === editingItem.id ? res.data : e)));
        } else {
          setList((prev) => [...prev, res.data]);
        }
        handleCloseModal();
      } else {
        setError(res.error || "Failed to save education entry");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    startTransition(async () => {
      const res = await deleteEducationAction(id);
      if (res.success) {
        setList((prev) => prev.filter((e) => e.id !== id));
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-cyan-600/25 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Education</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-[#13141B] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  {item.startDate} — {item.endDate || "Present"}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">{item.degree}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.institution}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
          <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {editingItem ? "Edit Education" : "Add Education"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Institution *
                </label>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  placeholder="Pimpri Chinchwad University"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Degree *
                </label>
                <input
                  type="text"
                  required
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  placeholder="BTech in Computer Science"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    placeholder="2023"
                    className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    placeholder="2027"
                    className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-cyan-500 outline-none"
                  />
                </div>
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
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/25 flex items-center gap-2"
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
