"use client";

import { useEffect, useRef, useState } from "react";

interface AboutSectionProps {
  settings?: any;
  experiences?: any[];
  skills?: any[];
  education?: any[];
}

export default function AboutSection({ settings, experiences, skills: rawSkills }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Format skills grouped by category
  const groupedSkills = rawSkills && rawSkills.length > 0
    ? Array.from(new Set(rawSkills.map((s: any) => s.category))).map((cat) => ({
        category: cat,
        items: rawSkills.filter((s: any) => s.category === cat).map((s: any) => s.name),
      }))
    : [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "REST APIs"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
        { category: "Tooling", items: ["Git", "Docker", "Vercel", "CI/CD", "Linux"] },
      ];

  const timeline = experiences && experiences.length > 0
    ? experiences.map((exp: any) => ({
        year: exp.year,
        role: exp.role,
        place: exp.company,
        current: exp.current,
      }))
    : [
        { year: "2026", role: "Web Developer Intern", place: "Bee Creatives", current: true },
        { year: "2026", role: "Backend Developer (Contributor)", place: "Atorix" },
        { year: "2025", role: "Full-Stack Projects", place: "Next.js • Express • PostgreSQL" },
        { year: "2024", role: "Started MERN Development", place: "Personal Projects" },
        { year: "2023", role: "Started BTech", place: "Pimpri Chinchwad University" },
      ];

  return (
    <>
      <style>{`
        .about {
          position: relative;
          padding: 9rem 6vw 8rem;
          background: var(--white);
          overflow: hidden;
        }

        .about-ghost {
          position: absolute;
          top: 50%;
          right: -4vw;
          transform: translateY(-50%);
          font-size: clamp(90px, 15vw, 200px);
          opacity: 0.6;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px #434040;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }

        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 5rem;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .about-eyebrow.vis {
          opacity: 1;
          transform: translateY(0);
        }
        .eyebrow-line {
          width: 32px;
          height: 1px;
          background: var(--brand-accent);
        }
        .eyebrow-label {
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--brand-accent);
        }
        .eyebrow-num {
          font-size: 0.75rem;
          color: var(--ink-soft);
          font-weight: 400;
          margin-left: auto;
        }

        .about-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7vw;
          align-items: start;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 4rem; }
        }

        .about-left {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s 0.15s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.15s cubic-bezier(0.16,1,0.3,1);
        }
        .about-left.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .about-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin-bottom: 2.2rem;
        }
        .about-heading em {
          font-style: normal;
          color: var(--brand-accent);
        }

        .about-body {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          font-size: clamp(0.92rem, 1.2vw, 1.05rem);
          line-height: 1.8;
          color: var(--ink-soft);
          font-weight: 300;
          margin-bottom: 3rem;
        }
        .about-body p strong {
          color: var(--ink);
          font-weight: 600;
        }

        .cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          padding: 0.8rem 1.6rem;
          border: 1px solid var(--border-subtle);
          border-radius: 100px;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .cv-btn:hover {
          background: var(--brand-accent);
          border-color: var(--brand-accent);
          color: #fff;
          transform: translateY(-2px);
        }

        .about-right {
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .about-right.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .block-label {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--ink-soft);
          margin-bottom: 1.6rem;
        }

        .skill-categories {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .skill-row {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .skill-cat-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .skill-tag {
          font-size: 0.78rem;
          font-weight: 400;
          padding: 0.32rem 0.75rem;
          border-radius: 6px;
          background: var(--tag-bg);
          color: var(--ink-soft);
          border: 1px solid var(--border-subtle);
          cursor: default;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .skill-tag:hover, .skill-tag.active {
          background: var(--brand-accent-glow);
          color: var(--brand-accent);
          border-color: var(--brand-accent);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .timeline-list::before {
          content: '';
          position: absolute;
          left: 5.5rem;
          top: 0.6rem;
          bottom: 0.6rem;
          width: 1px;
          background: var(--border-subtle);
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 1.1rem 0;
          position: relative;
        }
        .tl-year {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--ink-soft);
          width: 4rem;
          flex-shrink: 0;
          letter-spacing: 0.02em;
          padding-top: 0.1rem;
        }
        .tl-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--border-subtle);
          border: 2px solid var(--white);
          outline: 1px solid var(--border-subtle);
          margin-top: 0.35rem;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: background 0.2s, outline-color 0.2s;
        }
        .timeline-item.current .tl-dot {
          background: var(--brand-accent);
          outline-color: var(--brand-accent);
        }
        .tl-body {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .tl-role {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tl-current-badge {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--brand-accent);
          background: var(--brand-accent-glow);
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
          border: 1px solid var(--brand-accent);
        }
        .tl-place {
          font-size: 0.8rem;
          color: var(--ink-soft);
          font-weight: 300;
        }

        .about-divider {
          position: relative;
          z-index: 1;
          height: 1px;
          background: var(--border-subtle);
          margin: 7rem 0 6rem;
        }

        .about-values {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .about-values.vis {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .about-values { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 550px) {
          .about-values { grid-template-columns: 1fr; }
        }

        .value-item {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .value-icon {
          color: var(--brand-accent);
          display: flex;
          align-items: center;
        }
        .value-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .value-desc {
          font-size: 0.82rem;
          line-height: 1.65;
          color: var(--ink-soft);
          font-weight: 300;
        }
      `}</style>

      <section className="about" ref={sectionRef}>
        <div className="about-ghost">ABOUT</div>

        <div className={`about-eyebrow ${visible ? "vis" : ""}`}>
          <span className="eyebrow-line" />
          <span className="eyebrow-label">About me</span>
          <span className="eyebrow-num">02</span>
        </div>

        <div className="about-grid">
          <div className={`about-left ${visible ? "vis" : ""}`}>
            <h2 className="about-heading">
              {settings?.aboutHeadline || "Crafting the invisible details."}
            </h2>

            <div className="about-body">
              <p>{settings?.aboutBioP1 || "I'm a Full-Stack Developer who enjoys building software that balances performance, scalability, and user experience. I believe great products are created through attention to detail and strong engineering fundamentals."}</p>
              <p>{settings?.aboutBioP2 || "Over the past few years, I've worked with Next.js, React, Node.js, Express, PostgreSQL, MongoDB, and Prisma, building everything from backend APIs and CRM systems to full-stack web applications."}</p>
              <p>{settings?.aboutBioP3 || "When I'm not coding, you'll usually find me exploring new technologies, improving my understanding of system design, contributing to personal projects, or learning skills that make me a better engineer."}</p>
            </div>

            <a
              href={settings?.resumeUrl || "/Resume%20(5).pdf"}
              download
              className="cv-btn"
            >
              Download CV
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className={`about-right ${visible ? "vis" : ""}`}>
            <div className="skills-block">
              <p className="block-label">Tech stack</p>
              <div className="skill-categories">
                {groupedSkills.map((group) => (
                  <div className="skill-row" key={group.category}>
                    <span className="skill-cat-name">{group.category}</span>
                    <div className="skill-tags">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className={`skill-tag ${activeSkill === item ? "active" : ""}`}
                          onMouseEnter={() => setActiveSkill(item)}
                          onMouseLeave={() => setActiveSkill(null)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="timeline-block">
              <p className="block-label">Journey</p>
              <div className="timeline-list">
                {timeline.map((t, i) => (
                  <div className={`timeline-item ${t.current ? "current" : ""}`} key={i}>
                    <span className="tl-year">{t.year}</span>
                    <span className="tl-dot" />
                    <div className="tl-body">
                      <div className="tl-role">
                        {t.role}
                        {t.current && <span className="tl-current-badge">Now</span>}
                      </div>
                      <div className="tl-place">{t.place}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-divider" />

        <div className={`about-values ${visible ? "vis" : ""}`}>
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l2 4.5H15l-3.5 2.5 1.3 4.5L8 10l-4.8 2.5 1.3-4.5L1 5.5h5L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
              ),
              title: "Quality-first",
              desc: "I'd rather ship one thing that feels right than ten things that feel okay.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              ),
              title: "Ship fast",
              desc: "Speed and quality aren't opposites. Good process makes both possible.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h3l2-5 2 9 2-4h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "Data-driven",
              desc: "Opinions are good. Opinions backed by metrics are better.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "Simple over clever",
              desc: "The best code is the code nobody has to think about twice.",
            },
          ].map((v) => (
            <div className="value-item" key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}