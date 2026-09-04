import { prisma } from "@/lib/db";

// Fallback site settings if database hasn't been seeded yet
const defaultSiteSettings = {
  id: "default",
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
};

const defaultSocialLinks = [
  { id: "1", name: "GitHub", url: "https://github.com/AryanPachandi", enabled: true, displayOrder: 1 },
  { id: "2", name: "LinkedIn", url: "https://www.linkedin.com/in/aryan-pachandi-bb7b6822a/", enabled: true, displayOrder: 2 },
  { id: "3", name: "Twitter", url: "https://x.com/AryanPachandi", enabled: true, displayOrder: 3 },
];

const defaultProjects = [
  {
    id: "1",
    number: "01",
    title: "Pac Wallet",
    category: "FinTech Backend",
    year: "2026",
    tags: "Node.js, Express.js, MongoDB, JWT",
    description: "A digital wallet backend featuring secure authentication, account management, transaction tracking, and cookie-based JWT authorization.",
    githubUrl: "https://github.com/AryanPachandi/Pac-Wallet",
    liveUrl: "https://github.com/AryanPachandi/Pac-Wallet",
    gradient: "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)",
    displayOrder: 1,
  },
  {
    id: "2",
    number: "02",
    title: "APT Authentication System",
    category: "Backend",
    year: "2025",
    tags: "Node.js, Express.js, JWT, REST API",
    description: "Built a complete authentication system with registration, login, protected routes, role-based access, and secure token handling.",
    githubUrl: "https://www.npmjs.com/package/pachanditoken",
    liveUrl: "https://www.npmjs.com/package/pachanditoken",
    gradient: "linear-gradient(135deg, #0A0A0A 0%, #4A4A4A 100%)",
    displayOrder: 2,
  },
  {
    id: "3",
    number: "03",
    title: "CritIndia CRM Backend",
    category: "Internship Project",
    year: "2026",
    tags: "Node.js, PostgreSQL, Prisma, REST API",
    description: "Developed and maintained backend services for CritIndia, creating APIs, fixing production issues, and improving CRM workflows during my internship at Atorix.",
    githubUrl: "#",
    liveUrl: "https://critindia.com",
    gradient: "linear-gradient(135deg, #DDD9FC 0%, #4F3FF0 100%)",
    displayOrder: 3,
  },
  {
    id: "4",
    number: "04",
    title: "ConnectingDots ERP",
    category: "Enterprise Software",
    year: "2026",
    tags: "Next.js, Node.js, PostgreSQL, Prisma",
    description: "Contributed to ERP modules, backend routes, bug fixes, and feature development for a business management platform used by organizations.",
    githubUrl: "#",
    liveUrl: "https://connectingdotserp.com",
    gradient: "linear-gradient(135deg, #2B2640 0%, #4F3FF0 100%)",
    displayOrder: 4,
  },
];

const defaultExperiences = [
  { id: "1", year: "2026", role: "Web Developer Intern", company: "Bee Creatives", current: true, displayOrder: 1 },
  { id: "2", year: "2026", role: "Backend Developer (Contributor)", company: "Atorix", current: false, displayOrder: 2 },
  { id: "3", year: "2025", role: "Full-Stack Projects", company: "Next.js • Express • PostgreSQL", current: false, displayOrder: 3 },
  { id: "4", year: "2024", role: "Started MERN Development", company: "Personal Projects", current: false, displayOrder: 4 },
  { id: "5", year: "2023", role: "Started BTech", company: "Pimpri Chinchwad University", current: false, displayOrder: 5 },
];

const defaultSkills = [
  { id: "1", category: "Frontend", name: "React", displayOrder: 1 },
  { id: "2", category: "Frontend", name: "Next.js", displayOrder: 2 },
  { id: "3", category: "Frontend", name: "TypeScript", displayOrder: 3 },
  { id: "4", category: "Frontend", name: "Tailwind CSS", displayOrder: 4 },
  { id: "5", category: "Frontend", name: "Framer Motion", displayOrder: 5 },

  { id: "6", category: "Backend", name: "Node.js", displayOrder: 6 },
  { id: "7", category: "Backend", name: "Express.js", displayOrder: 7 },
  { id: "8", category: "Backend", name: "PostgreSQL", displayOrder: 8 },
  { id: "9", category: "Backend", name: "Prisma", displayOrder: 9 },
  { id: "10", category: "Backend", name: "REST APIs", displayOrder: 10 },

  { id: "11", category: "Database", name: "PostgreSQL", displayOrder: 11 },
  { id: "12", category: "Database", name: "MongoDB", displayOrder: 12 },
  { id: "13", category: "Database", name: "Redis", displayOrder: 13 },
  { id: "14", category: "Database", name: "Supabase", displayOrder: 14 },

  { id: "15", category: "Tooling", name: "Git", displayOrder: 15 },
  { id: "16", category: "Tooling", name: "Docker", displayOrder: 16 },
  { id: "17", category: "Tooling", name: "Vercel", displayOrder: 18 },
  { id: "18", category: "Tooling", name: "CI/CD", displayOrder: 19 },
  { id: "19", category: "Tooling", name: "Linux", displayOrder: 20 },
];

export async function getPortfolioData() {
  try {
    const [settings, socials, projects, experiences, education, skills] =
      await Promise.all([
        prisma.siteSettings.findUnique({ where: { id: "default" } }),
        prisma.socialLink.findMany({ where: { enabled: true }, orderBy: { displayOrder: "asc" } }),
        prisma.project.findMany({ orderBy: { displayOrder: "asc" } }),
        prisma.experience.findMany({ orderBy: { displayOrder: "asc" } }),
        prisma.education.findMany({ orderBy: { displayOrder: "asc" } }),
        prisma.skill.findMany({ orderBy: { displayOrder: "asc" } }),
      ]);

    return {
      settings: settings || defaultSiteSettings,
      socials: socials.length > 0 ? socials : defaultSocialLinks,
      projects: projects.length > 0 ? projects : defaultProjects,
      experiences: experiences.length > 0 ? experiences : defaultExperiences,
      education,
      skills: skills.length > 0 ? skills : defaultSkills,
    };
  } catch (error) {
    console.warn("Prisma query failed, falling back to default data:", error);
    return {
      settings: defaultSiteSettings,
      socials: defaultSocialLinks,
      projects: defaultProjects,
      experiences: defaultExperiences,
      education: [],
      skills: defaultSkills,
    };
  }
}
