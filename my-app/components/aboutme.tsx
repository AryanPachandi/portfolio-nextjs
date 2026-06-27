"use client";

import { useEffect, useRef, useState } from "react";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PostgreSQL", "Prisma", "REST APIs"]
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"]
  },
  {
    category: "Tooling",
    items: ["Git", "Docker", "Vercel", "CI/CD", "Linux"]
  }
];

const timeline = [
  {
    year: "2026",
    role: "Backend Developer Intern",
    place: "Atorix : Onsite", 
    current: true,
  },
  {
    year: "2025",
    role: "Full-Stack Projects",
    place: "Next.js • Express • PostgreSQL",
  },
  {
    year: "2024",
    role: "Started MERN Development",
    place: "Personal Projects",
  },
  {
    year: "2023",
    role: "Started BTech",
    place: "Pimpri Chinchwad University",
  },
];

export default function AboutSection() {
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

  return (
    <>
      <style>{`
        /* Inherits :root vars from HeroSection — redefine here if used standalone */

        .about {
          position: relative;
          padding: 9rem 6vw 8rem;
          background: var(--white);
          overflow: hidden;
        }

        /* Ghost watermark */
        .about-ghost {
          position: absolute;
          top: 50%;
          right: -4vw;
          transform: translateY(-50%);
           font-size: clamp(90px, 15vw, 200px);
          opacity: 0.6  ;
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

        /* Top eyebrow */
        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .about-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .eyebrow-line {
          width: 36px;
          height: 1px;
          background: var(--brand-accent);
        }
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

        /* Main grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5vw;
          position: relative;
          z-index: 1;
        }

        /* Left col */
        .about-left {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease;
        }
        .about-left.vis { opacity: 1; transform: translateY(0); }

        .about-heading {
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1;
          color: var(--ink);
          margin-bottom: 2rem;
        }
        .about-heading em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--ink);
        }

        .about-body {
          font-size: clamp(0.9rem, 1.15vw, 1.05rem);
          line-height: 1.8;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 420px;
        }
        .about-body p + p { margin-top: 1.2rem; }
        .about-body strong {
          font-weight: 500;
          color: var(--ink);
        }

        /* Download CV */
        .cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2.4rem;
          border: 1px solid var(--ink);
          color: var(--ink);
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          width: fit-content;
        }
        .cv-btn:hover {
          background: var(--ink);
          color: var(--white);
        }

        /* Right col */
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease;
        }
        .about-right.vis { opacity: 1; transform: translateY(0); }

        /* Skills */
        .skills-block {}
        .block-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #BBBBBB;
          margin-bottom: 1.2rem;
        }

        .skill-categories {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .skill-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding-bottom: 0.9rem;
          border-bottom: 1px solid #F0F0F0;
        }
        .skill-cat-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink);
          min-width: 72px;
          letter-spacing: 0.01em;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .skill-tag {
          font-size: 0.72rem;
          font-weight: 400;
          color: var(--ink-soft);
          padding: 0.22rem 0.65rem;
          border-radius: 100px;
          border: 1px solid #E8E8E8;
          cursor: default;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .skill-tag:hover,
        .skill-tag.active {
          background: var(--brand-accent-light);
          color: var(--brand-accent);
          border-color: var(--brand-accent-light);
        }

        /* Timeline */
        .timeline-block {}
        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .timeline-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 1rem;
          padding: 1rem 0;
          position: relative;
          cursor: default;
        }
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 55px;
          top: 2.2rem;
          bottom: -0.1rem;
          width: 1px;
          background: #EBEBEB;
        }

        .tl-year {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          // color: #666 
          letter-spacing: 0.04em;
          padding-top: 0.15rem;
        }
        .tl-dot {
          position: absolute;
          left: 50px;
          top: 1.35rem;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #DDDDDD;
          border: 2px solid var(--white);
          z-index: 1;
          transition: background 0.2s;
        }
        .timeline-item.current .tl-dot {
          background: var(--brand-accent);
          box-shadow: 0 0 0 3px var(--brand-accent-light);
        }
        .tl-body {
          padding-left: 1rem;
        }
        .tl-role {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .tl-place {
          font-size: 0.78rem;
          color: var(--ink-soft);
          font-weight: 300;
          margin-top: 0.15rem;
        }
        .tl-current-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 500;
          background: var(--brand-accent-light);
          color: var(--brand-accent);
          padding: 0.1rem 0.5rem;
          border-radius: 100px;
          margin-left: 0.5rem;
          letter-spacing: 0.04em;
          vertical-align: middle;
        }

        /* Divider between grid and bottom strip */
        .about-divider {
          height: 1px;
          background: #F0F0F0;
          margin: 5rem 0 3.5rem;
          position: relative;
          z-index: 1;
        }

        /* Bottom values strip */
        .about-values {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s 0.5s ease, transform 0.8s 0.5s ease;
        }
        .about-values.vis { opacity: 1; transform: translateY(0); }

        .value-item {
          flex: 1;
          min-width: 160px;
        }
        .value-icon {
          width: 36px;
          height: 36px;
          background: var(--off);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.9rem;
          color: var(--brand-accent);
        }
        .value-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.35rem;
          letter-spacing: -0.01em;
        }
        .value-desc {
          font-size: 0.78rem;
          line-height: 1.6;
          color: var(--ink-soft);
          font-weight: 300;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-ghost { display: none; }
          .about-values { gap: 2rem; }
          .eyebrow-num { display: none; }
        }
      `}</style>

      <section className="about" id="about" ref={sectionRef}>
        {/* Ghost watermark */}
        <div className="about-ghost">ABOUT</div>

        {/* Eyebrow */}
        <div className={`about-eyebrow ${visible ? "vis" : ""}`}>
          <span className="eyebrow-line" />
          <span className="eyebrow-label">About me</span>
          <span className="eyebrow-num">02</span>
        </div>

        {/* Main grid */}
        <div className="about-grid">

          {/* Left — copy */}
          <div className={`about-left ${visible ? "vis" : ""}`}>
            <h2 className="about-heading">
              Crafting the<br />
              <em>invisible</em><br />
              details.
            </h2>

           <div className="about-body">
  <p>
    I'm a <strong>Full-Stack Developer</strong> who enjoys building software that balances performance, scalability, and user experience. I believe great products are created through attention to detail and strong engineering fundamentals.
  </p>

  <p>
    Over the past few years, I've worked with <strong>Next.js, React, Node.js, Express, PostgreSQL, MongoDB, and Prisma</strong>, building everything from backend APIs and CRM systems to full-stack web applications.
  </p>

  <p>
    When I'm not coding, you'll usually find me exploring new technologies, improving my understanding of system design, contributing to personal projects, or learning skills that make me a better engineer.
  </p>
</div>

            <a
  href="/Resume%20(5).pdf"
  download
  className="cv-btn"
>
              Download CV
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1v8M3 6.5l3.5 3.5 3.5-3.5M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Right — skills + timeline */}
          <div className={`about-right ${visible ? "vis" : ""}`}>

            {/* Skills */}
            <div className="skills-block">
              <p className="block-label">Tech stack</p>
              <div className="skill-categories">
                {skills.map((group) => (
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

            {/* Timeline */}
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

        {/* Divider */}
        <div className="about-divider" />

        {/* Values strip */}
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