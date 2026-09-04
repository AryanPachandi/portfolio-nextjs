"use client";

import { useEffect, useRef, useState } from "react";

interface ProjectsScrollProps {
  projects?: any[];
}

export default function ProjectsScroll({ projects: initialProjects }: ProjectsScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [hovered, setHovered] = useState<string | number | null>(null);

  const projects = initialProjects && initialProjects.length > 0
    ? initialProjects.map((p) => ({
        id: p.id,
        number: p.number || "01",
        title: p.title,
        category: p.category || "Web App",
        year: p.year || "2026",
        tags: typeof p.tags === "string" ? p.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : p.tags,
        description: p.description,
        link: p.liveUrl || p.githubUrl || "#",
        code: p.githubUrl || "#",
        gradient: p.gradient || "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)",
      }))
    : [
        {
          id: "1",
          number: "01",
          title: "Pac Wallet",
          category: "FinTech Backend",
          year: "2026",
          tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
          description:
            "A digital wallet backend featuring secure authentication, account management, transaction tracking, and cookie-based JWT authorization.",
          link: "https://github.com/AryanPachandi/Pac-Wallet",
          code: "https://github.com/AryanPachandi/Pac-Wallet",
          gradient: "linear-gradient(135deg, #4F3FF0 0%, #8B7FF7 100%)",
        },
        {
          id: "2",
          number: "02",
          title: "APT Authentication System",
          category: "Backend",
          year: "2025",
          tags: ["Node.js", "Express.js", "JWT", "REST API"],
          description:
            "Built a complete authentication system with registration, login, protected routes, role-based access, and secure token handling.",
          link: "https://www.npmjs.com/package/pachanditoken",
          code: "#",
          gradient: "linear-gradient(135deg, #0A0A0A 0%, #4A4A4A 100%)",
        },
        {
          id: "3",
          number: "03",
          title: "CritIndia CRM Backend",
          category: "Internship Project",
          year: "2026",
          tags: ["Node.js", "PostgreSQL", "Prisma", "REST API"],
          description:
            "Developed and maintained backend services for CritIndia, creating APIs, fixing production issues, and improving CRM workflows during my internship at Atorix.",
          link: "https://critindia.com",
          code: "#",
          gradient: "linear-gradient(135deg, #DDD9FC 0%, #4F3FF0 100%)",
        },
        {
          id: "4",
          number: "04",
          title: "ConnectingDots ERP",
          category: "Enterprise Software",
          year: "2026",
          tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
          description:
            "Contributed to ERP modules, backend routes, bug fixes, and feature development for a business management platform used by organizations.",
          link: "https://connectingdotserp.com",
          code: "#",
          gradient: "linear-gradient(135deg, #2B2640 0%, #4F3FF0 100%)",
        },
      ];

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Cursor-following preview
  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;

    const handleMove = (e: MouseEvent) => {
      preview.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 160}px)`;
    };
    list.addEventListener("mousemove", handleMove);
    return () => list.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <style>{`
        .projects {
          position: relative;
          padding: 9rem 6vw 8rem;
          background: var(--white);
          overflow: hidden;
        }

        .projects-ghost {
          position: absolute;
          top: 50%;
          left: -3vw;
          transform: translateY(-50%);
          font-size: clamp(100px, 18vw, 260px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px #312e2e;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }

        .projects-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          position: relative;
          z-index: 1;
        }
        .projects-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .eyebrow-line { width: 36px; height: 1px; background: var(--brand-accent); }
        .eyebrow-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--brand-accent);
        }
        .eyebrow-num {
          margin-left: auto;
          font-size: 0.7rem;
          color: #CCCCCC;
          letter-spacing: 0.05em;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 3rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease;
        }
        .projects-header.vis { opacity: 1; transform: translateY(0); }

        .projects-heading {
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1;
          color: var(--ink);
          max-width: 560px;
        }
        .projects-heading em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--ink);
        }

        .projects-intro {
          max-width: 360px;
          font-size: clamp(0.85rem, 1.1vw, 0.98rem);
          line-height: 1.75;
          color: var(--ink-soft);
          font-weight: 300;
        }

        .filter-tabs {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease;
        }
        .filter-tabs.vis { opacity: 1; transform: translateY(0); }

        .filter-tab {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--ink-soft);
          background: transparent;
          border: 1px solid #E8E8E8;
          padding: 0.45rem 1.1rem;
          border-radius: 100px;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          font-family: inherit;
        }
        .filter-tab:hover { color: var(--ink); border-color: #D8D8D8; }
        .filter-tab.active {
          background: var(--brand-accent-light);
          color: var(--brand-accent);
          border-color: var(--brand-accent-light);
        }

        .project-list {
          position: relative;
          z-index: 1;
          border-top: 1px solid #EFEFEF;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease;
        }
        .project-list.vis { opacity: 1; transform: translateY(0); }

        .project-row {
          display: grid;
          grid-template-columns: 56px 1fr auto auto 24px;
          align-items: center;
          gap: 1.5rem;
          padding: 1.9rem 0.5rem;
          border-bottom: 1px solid #EFEFEF;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: background 0.25s ease, padding-left 0.25s ease;
        }
        .project-row:hover {
          background: var(--off);
          padding-left: 1.1rem;
        }

        .project-number {
          font-size: 0.78rem;
          font-weight: 500;
          color: #CCCCCC;
          letter-spacing: 0.04em;
          transition: color 0.25s ease;
        }
        .project-row:hover .project-number { color: var(--brand-accent); }

        .project-main { min-width: 0; }
        .project-title {
          font-size: clamp(1.3rem, 2.4vw, 1.9rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          transition: color 0.25s ease;
        }
        .project-row:hover .project-title { color: var(--brand-accent); }
        .project-desc {
          margin-top: 0.3rem;
          font-size: 0.82rem;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 460px;
          line-height: 1.5;
        }

        .project-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .project-tag {
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--ink-soft);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          border: 1px solid #E8E8E8;
          white-space: nowrap;
        }

        .project-meta {
          font-size: 0.72rem;
          color: #BBBBBB;
          text-align: right;
          letter-spacing: 0.03em;
          white-space: nowrap;
        }

        .project-arrow {
          color: var(--ink-soft);
          transform: rotate(45deg);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .project-row:hover .project-arrow {
          transform: rotate(90deg);
          color: var(--brand-accent);
        }

        .project-preview {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 200px;
          border-radius: 16px;
          overflow: hidden;
          pointer-events: none;
          z-index: 50;
          opacity: 0;
          transform: translate(-9999px, -9999px);
          transition: opacity 0.25s ease, transform 0.08s linear;
          box-shadow: 0 30px 60px -10px rgba(10,10,10,0.25);
        }
        .project-preview.show { opacity: 1; }
        .preview-fill {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-letter {
          font-size: 6rem;
          font-weight: 800;
          color: rgba(255,255,255,0.18);
          letter-spacing: -0.04em;
        }

        .projects-footer-text {
          font-size: 0.85rem;
          color: var(--ink-soft);
          font-weight: 300;
          margin-top: 2.5rem;
        }

        @media (max-width: 768px) {
          .projects-ghost { display: none; }
          .project-preview { display: none; }
          .project-row {
            grid-template-columns: 32px 1fr;
            grid-template-rows: auto auto;
            row-gap: 0.5rem;
          }
          .project-meta, .project-tags, .project-arrow { display: none; }
          .projects-header { align-items: flex-start; }
        }
      `}</style>

      <section className="projects" id="work" ref={sectionRef}>
        <div className="projects-ghost">WORK</div>

        <div className={`projects-eyebrow ${visible ? "vis" : ""}`}>
          <span className="eyebrow-line" />
          <span className="eyebrow-label">Selected work</span>
          <span className="eyebrow-num">03</span>
        </div>

        <div className={`projects-header ${visible ? "vis" : ""}`}>
          <h2 className="projects-heading">
            Things I've<br />
            <em>shipped</em>.
          </h2>
          <p className="projects-intro">
            A handful of products and interfaces I've designed, built, and shipped — spanning dashboards, platforms, and brand systems.
          </p>
        </div>

        <div className={`filter-tabs ${visible ? "vis" : ""}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`project-list ${visible ? "vis" : ""}`} ref={listRef}>
          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row"
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="project-number">{p.number}</span>
              <div className="project-main">
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.description}</div>
              </div>
              <div className="project-tags">
                {Array.isArray(p.tags) && p.tags.map((t: string) => (
                  <span className="project-tag" key={t}>{t}</span>
                ))}
              </div>
              <span className="project-meta">{p.category} · {p.year}</span>
              <svg className="project-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
        <p className="projects-footer-text">Have something in mind that's not on this list?</p>

        <div className={`project-preview ${hovered !== null ? "show" : ""}`} ref={previewRef}>
          {(() => {
            const active = projects.find((p) => p.id === hovered);
            if (!active) return null;
            return (
              <div className="preview-fill" style={{ background: active.gradient }}>
                <span className="preview-letter">{active.title.charAt(0)}</span>
              </div>
            );
          })()}
        </div>
      </section>
    </>
  );
}