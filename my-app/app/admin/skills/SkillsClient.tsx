"use client";

import { useState, useTransition } from "react";
import { createSkillAction, updateSkillAction, deleteSkillAction } from "@/lib/actions/adminActions";
import { Plus, Edit3, Trash2, Save, X, Loader2, Wrench, AlertCircle } from "lucide-react";

export default function SkillsClient({ initialSkills }: { initialSkills: any[] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [isPending, startTransition] = useTransition();
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "Database", "Tooling"];

  const emptyForm = {
    name: "",
    category: "Frontend",
    displayOrder: skills.length + 1,
  };

  const [form, setForm] = useState(emptyForm);

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setForm({ ...emptyForm, displayOrder: skills.length + 1 });
    setIsCreating(true);
    setError(null);
  };

  const handleOpenEdit = (skill: any) => {
    setIsCreating(false);
    setEditingSkill(skill);
    setForm({
      name: skill.name || "",
      category: skill.category || "Frontend",
      displayOrder: skill.displayOrder || 0,
    });
    setError(null);
  };

  const handleCloseModal = () => {
    setIsCreating(false);
    setEditingSkill(null);
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

      const res = editingSkill
        ? await updateSkillAction(editingSkill.id, payload)
        : await createSkillAction(payload);

      if (res.success && res.data) {
        if (editingSkill) {
          setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? res.data : s)));
        } else {
          setSkills((prev) => [...prev, res.data]);
        }
        handleCloseModal();
      } else {
        setError(res.error || "Failed to save skill");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this skill tag?")) return;

    startTransition(async () => {
      const res = await deleteSkillAction(id);
      if (res.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
      }
    });
  };

  // Group skills by category
  const groupedCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-600/25 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Skill</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Skills Grouped by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groupedCategories.map((cat) => (
          <div key={cat} className="bg-[#13141B] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white tracking-tight uppercase">{cat}</h3>
              <span className="text-xs font-semibold text-slate-500">
                {skills.filter((s) => s.category === cat).length} skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1B23] border border-white/10 text-xs font-medium text-slate-200 hover:border-amber-500/50 transition-all"
                  >
                    <span>{skill.name}</span>
                    <button
                      onClick={() => handleOpenEdit(skill)}
                      className="text-slate-500 hover:text-amber-300 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {(isCreating || editingSkill) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-extrabold text-white">
                {editingSkill ? "Edit Skill Tag" : "Add New Skill"}
              </h2>
              <button onClick={handleCloseModal} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="React / Next.js / Docker"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Frontend / Backend / Database / Tooling"
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-amber-500 outline-none"
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
                  className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-amber-500 outline-none"
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
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/25 flex items-center gap-2"
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
