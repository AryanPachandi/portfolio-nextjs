import { z } from "zod";

export const siteSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  headline: z.string().min(1, "Headline is required"),
  subheadline: z.string().default("Full-Stack Developer & Creative Coder"),
  bio: z.string().min(1, "Bio is required"),
  status: z.string().min(1, "Status is required"),
  aboutHeadline: z.string().default("Crafting the invisible details."),
  aboutBioP1: z.string().min(1, "About paragraph 1 is required"),
  aboutBioP2: z.string().min(1, "About paragraph 2 is required"),
  aboutBioP3: z.string().min(1, "About paragraph 3 is required"),
  resumeUrl: z.string().min(1, "Resume URL is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  projectsBuiltLabel: z.string().min(1, "Projects label is required"),
  internshipsLabel: z.string().min(1, "Internships label is required"),
  profileImage: z.string().min(1, "Profile image is required"),
});

export const projectSchema = z.object({
  number: z.string().default("01"),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  year: z.string().min(1, "Year is required"),
  tags: z.string().default(""), // Comma-separated
  description: z.string().min(1, "Description is required"),
  liveUrl: z.string().optional().nullable(),
  githubUrl: z.string().optional().nullable(),
  gradient: z.string().default("linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)"),
  displayOrder: z.number().int().default(0),
});

export const experienceSchema = z.object({
  year: z.string().min(1, "Year is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company/Place is required"),
  current: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string().optional().nullable(),
  startDate: z.string().min(1, "Start year is required"),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  displayOrder: z.number().int().default(0),
});

export const socialLinkSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  url: z.string().url("Must be a valid URL"),
  icon: z.string().optional().nullable(),
  enabled: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});
