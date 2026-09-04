"use client";

import { useState, useEffect, useTransition } from "react";
import { updateSiteSettingsAction } from "@/lib/actions/adminActions";
import { User, Save, Upload, Loader2, CheckCircle2, AlertCircle, Sparkles, FileText, Download } from "lucide-react";

export default function AdminProfilePage() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    name: "Aryan Pachandi",
    headline: "Aryan Pachandi .",
    bio: "I build fast, thoughtful digital experiences — from pixel-perfect interfaces to scalable backend systems. Based in India, working globally.",
    aboutHeadline: "Crafting the invisible details.",
    aboutBioP1: "I'm a Full-Stack Developer who enjoys building software that balances performance, scalability, and user experience. I believe great products are created through attention to detail and strong engineering fundamentals.",
    aboutBioP2: "Over the past few years, I've worked with Next.js, React, Node.js, Express, PostgreSQL, MongoDB, and Prisma, building everything from backend APIs and CRM systems to full-stack web applications.",
    aboutBioP3: "When I'm not coding, you'll usually find me exploring new technologies, improving my understanding of system design, contributing to personal projects, or learning skills that make me a better engineer.",
    profileImage: "IMG_0310-dithered_bbfelu",
    location: "Pune, India",
    email: "givemejob@aryanpachandi.space",
    phone: "+91 8468913733",
    resumeUrl: "/Resume%20(5).pdf",
    status: "Available for work",
    graduationYear: "2027",
    projectsBuiltLabel: "20+",
    internshipsLabel: "1",
    seoTitle: "Aryan Pachandi | Full Stack Developer",
    seoDescription: "Portfolio of Aryan Pachandi, Full Stack Developer specializing in React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript and modern web technologies.",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data) setForm((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, profileImage: data.url }));
        setMessage({ type: "success", text: "Image uploaded successfully! Remember to click Save Changes." });
      } else {
        setMessage({ type: "error", text: data.error || "Image upload failed" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Upload error" });
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev) => ({ ...prev, resumeUrl: data.url }));
        setMessage({ type: "success", text: "Resume PDF uploaded successfully! Remember to click Save Changes." });
      } else {
        setMessage({ type: "error", text: data.error || "Resume upload failed" });
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error?.message || "Upload error" });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const res = await updateSiteSettingsAction(form);
      if (res.success) {
        setMessage({ type: "success", text: "Profile & site settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to save settings" });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <User className="w-7 h-7 text-indigo-400" />
            <span>Profile & Site Settings</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update personal info, bio text, profile image, resume PDF, and SEO settings.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending || uploading || uploadingResume}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isPending ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-sm font-medium flex items-center gap-3 ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image & Status Card */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Profile Picture & Status</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-800 border-2 border-indigo-500/30 shrink-0">
              {form.profileImage ? (
                <img
                  src={
                    form.profileImage.startsWith("http") || form.profileImage.startsWith("data:")
                      ? form.profileImage
                      : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "drdhwfp4o"}/image/upload/${form.profileImage}`
                  }
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                </div>
              )}
            </div>

            <div className="space-y-3 w-full">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Upload New Image (Phone / Desktop)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-300 hover:file:bg-indigo-600/30 cursor-pointer"
              />
              <div className="text-xs text-slate-500">Or manually specify Cloudinary ID / Image URL:</div>
              <input
                type="text"
                value={form.profileImage}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Availability / Status Badge
              </label>
              <input
                type="text"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder="Available for work"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Pune, India"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Resume & Documents Card */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Resume & CV File</span>
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#1A1B23] border border-white/5 space-y-3">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Upload Resume (PDF / Document)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  disabled={uploadingResume}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-300 hover:file:bg-indigo-600/30 cursor-pointer"
                />
                {uploadingResume && <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />}
              </div>
              <div className="text-xs text-slate-500">
                Supported formats: PDF, DOC, DOCX. The uploaded file will be linked to your website's resume button.
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Active Resume URL / Download Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.resumeUrl}
                  onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                  className="flex-1 bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
                />
                {form.resumeUrl && (
                  <a
                    href={form.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white transition-all shrink-0 flex items-center gap-1.5 text-xs font-semibold"
                    title="Preview current resume"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview Resume</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal & Contact Details */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Basic Info & Contact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero & About Bio */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Hero & About Bio Text</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Hero Bio Text
            </label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              About Section Heading
            </label>
            <input
              type="text"
              value={form.aboutHeadline}
              onChange={(e) => setForm({ ...form, aboutHeadline: e.target.value })}
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                About Bio - Paragraph 1
              </label>
              <textarea
                rows={3}
                value={form.aboutBioP1}
                onChange={(e) => setForm({ ...form, aboutBioP1: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                About Bio - Paragraph 2
              </label>
              <textarea
                rows={3}
                value={form.aboutBioP2}
                onChange={(e) => setForm({ ...form, aboutBioP2: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                About Bio - Paragraph 3
              </label>
              <textarea
                rows={3}
                value={form.aboutBioP3}
                onChange={(e) => setForm({ ...form, aboutBioP3: e.target.value })}
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">Hero Section Stat Badges</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Graduation Year
              </label>
              <input
                type="text"
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                placeholder="2027"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Projects Built Label
              </label>
              <input
                type="text"
                value={form.projectsBuiltLabel}
                onChange={(e) => setForm({ ...form, projectsBuiltLabel: e.target.value })}
                placeholder="20+"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Internships Count Label
              </label>
              <input
                type="text"
                value={form.internshipsLabel}
                onChange={(e) => setForm({ ...form, internshipsLabel: e.target.value })}
                placeholder="1"
                className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-[#13141B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white">SEO & Meta Data</h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              SEO Page Title
            </label>
            <input
              type="text"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              SEO Description
            </label>
            <textarea
              rows={3}
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              className="w-full bg-[#1A1B23] border border-white/10 rounded-xl p-3 text-slate-100 text-sm focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending || uploading || uploadingResume}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{isPending ? "Saving Profile..." : "Save Profile Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
