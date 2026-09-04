import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Initial Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "aryanpachandi@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPass123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: passwordHash },
    create: {
      email: adminEmail,
      password: passwordHash,
    },
  });
  console.log(`✓ Admin user created/updated: ${admin.email}`);

  // 2. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
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
    },
  });
  console.log("✓ Site settings seeded");

  // 3. Social Links
  const socialData = [
    { name: "GitHub", url: "https://github.com/AryanPachandi", displayOrder: 1 },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aryan-pachandi-bb7b6822a/", displayOrder: 2 },
    { name: "Twitter", url: "https://x.com/AryanPachandi", displayOrder: 3 },
  ];

  for (const s of socialData) {
    const existing = await prisma.socialLink.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.socialLink.create({ data: s });
    }
  }
  console.log("✓ Social links seeded");

  // 4. Projects
  const projectsData = [
    {
      number: "01",
      title: "Pac Wallet",
      category: "FinTech Backend",
      year: "2026",
      tags: "Node.js, Express.js, MongoDB, JWT",
      description: "A digital wallet backend featuring secure authentication, account management, transaction tracking, and cookie-based JWT authorization.",
      githubUrl: "https://github.com/AryanPachandi/Pac-Wallet",
      liveUrl: "https://github.com/AryanPachandi/Pac-Wallet",
      displayOrder: 1,
      gradient: "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)",
    },
    {
      number: "02",
      title: "APT Authentication System",
      category: "Backend",
      year: "2025",
      tags: "Node.js, Express.js, JWT, REST API",
      description: "Built a complete authentication system with registration, login, protected routes, role-based access, and secure token handling.",
      githubUrl: "https://www.npmjs.com/package/pachanditoken",
      liveUrl: "https://www.npmjs.com/package/pachanditoken",
      displayOrder: 2,
      gradient: "linear-gradient(135deg, #0A0A0A 0%, #4A4A4A 100%)",
    },
    {
      number: "03",
      title: "CritIndia CRM Backend",
      category: "Internship Project",
      year: "2026",
      tags: "Node.js, PostgreSQL, Prisma, REST API",
      description: "Developed and maintained backend services for CritIndia, creating APIs, fixing production issues, and improving CRM workflows during my internship at Atorix.",
      githubUrl: "#",
      liveUrl: "https://critindia.com",
      displayOrder: 3,
      gradient: "linear-gradient(135deg, #DDD9FC 0%, #4F3FF0 100%)",
    },
    {
      number: "04",
      title: "ConnectingDots ERP",
      category: "Enterprise Software",
      year: "2026",
      tags: "Next.js, Node.js, PostgreSQL, Prisma",
      description: "Contributed to ERP modules, backend routes, bug fixes, and feature development for a business management platform used by organizations.",
      githubUrl: "#",
      liveUrl: "https://connectingdotserp.com",
      displayOrder: 4,
      gradient: "linear-gradient(135deg, #2B2640 0%, #4F3FF0 100%)",
    },
  ];

  for (const p of projectsData) {
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.project.create({ data: p });
    }
  }
  console.log("✓ Projects seeded");

  // 5. Experience
  const expData = [
    {
      year: "2026",
      role: "Web Developer Intern",
      company: "Bee Creatives",
      current: true,
      displayOrder: 1,
    },
    {
      year: "2026",
      role: "Backend Developer (Contributor)",
      company: "Atorix",
      current: false,
      displayOrder: 2,
    },
    {
      year: "2025",
      role: "Full-Stack Projects",
      company: "Next.js • Express • PostgreSQL",
      current: false,
      displayOrder: 3,
    },
    {
      year: "2024",
      role: "Started MERN Development",
      company: "Personal Projects",
      current: false,
      displayOrder: 4,
    },
    {
      year: "2023",
      role: "Started BTech",
      company: "Pimpri Chinchwad University",
      current: false,
      displayOrder: 5,
    },
  ];

  const existingExp = await prisma.experience.count();
  if (existingExp === 0) {
    for (const e of expData) {
      await prisma.experience.create({ data: e });
    }
  }
  console.log("✓ Experience seeded");

  // 6. Education
  const existingEdu = await prisma.education.count();
  if (existingEdu === 0) {
    await prisma.education.create({
      data: {
        institution: "Pimpri Chinchwad University",
        degree: "BTech in Computer Science",
        startDate: "2023",
        endDate: "2027",
        displayOrder: 1,
      },
    });
  }
  console.log("✓ Education seeded");

  // 7. Skills
  const skillsData = [
    { category: "Frontend", name: "React", displayOrder: 1 },
    { category: "Frontend", name: "Next.js", displayOrder: 2 },
    { category: "Frontend", name: "TypeScript", displayOrder: 3 },
    { category: "Frontend", name: "Tailwind CSS", displayOrder: 4 },
    { category: "Frontend", name: "Framer Motion", displayOrder: 5 },

    { category: "Backend", name: "Node.js", displayOrder: 6 },
    { category: "Backend", name: "Express.js", displayOrder: 7 },
    { category: "Backend", name: "PostgreSQL", displayOrder: 8 },
    { category: "Backend", name: "Prisma", displayOrder: 9 },
    { category: "Backend", name: "REST APIs", displayOrder: 10 },

    { category: "Database", name: "PostgreSQL", displayOrder: 11 },
    { category: "Database", name: "MongoDB", displayOrder: 12 },
    { category: "Database", name: "Redis", displayOrder: 13 },
    { category: "Database", name: "Supabase", displayOrder: 14 },

    { category: "Tooling", name: "Git", displayOrder: 15 },
    { category: "Tooling", name: "Docker", displayOrder: 16 },
    { category: "Tooling", name: "Vercel", displayOrder: 17 },
    { category: "Tooling", name: "CI/CD", displayOrder: 18 },
    { category: "Tooling", name: "Linux", displayOrder: 19 },
  ];

  const existingSkills = await prisma.skill.count();
  if (existingSkills === 0) {
    for (const sk of skillsData) {
      await prisma.skill.create({ data: sk });
    }
  }
  console.log("✓ Skills seeded");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
