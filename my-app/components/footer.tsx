"use client";

import { useEffect, useRef, useState } from "react";

const sitemap = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface FooterProps {
  settings?: any;
  socials?: any[];
}

export default function Footer({ settings, socials: rawSocials }: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState("");

  const socials = rawSocials && rawSocials.length > 0
    ? rawSocials.map((s) => ({ label: s.name, href: s.url }))
    : [
        { label: "GitHub", href: "https://github.com/AryanPachandi/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-pachandi-bb7b6822a/" },
        { label: "Twitter", href: "https://x.com/AryanPachandi" },
      ];

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

  // Live local time (IST)
  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Magnetic CTA button
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const handleEnter = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const handleLeave = () => {
      btn.style.transform = "translate(0,0)";
    };
    btn.addEventListener("mousemove", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const email = settings?.email || "givemejob@aryanpachandi.space";
  const phone = settings?.phone || "+91 8468913733";
  const location = settings?.location || "Pune, India";
  const status = settings?.status || "Available for work";

  return (
    <>
      <style>{`
        .footer {
          position: relative;
          padding: 9rem 6vw 0;
          background: var(--off);
          overflow: hidden;
        }

        .footer-ghost {
          position: absolute;
          bottom: -6%;
          left: 50%;
          transform: translateX(-50%);
          font-size: clamp(90px, 17vw, 240px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1.5px #d8d6d3;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          font-family: 'Inter', sans-serif;
        }

        .footer-eyebrow {
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
        .footer-eyebrow.vis { opacity: 1; transform: translateY(0); }

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
          color: #A8A6A2;
          letter-spacing: 0.05em;
        }

        .footer-cta-block {
          position: relative;
          z-index: 1;
          margin-bottom: 7rem;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease;
        }
        .footer-cta-block.vis { opacity: 1; transform: translateY(0); }

        .footer-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--ink-soft);
          background: #EBE9E4;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
          margin-bottom: 2rem;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          animation: pulse 2s infinite;
        }

        .footer-heading {
          font-size: clamp(40px, 7vw, 96px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 0.98;
          color: var(--ink);
          margin-bottom: 3rem;
        }
        .footer-heading em {
          font-style: normal;
          color: var(--brand-accent);
        }

        .footer-cta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .footer-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          font-size: clamp(1.1rem, 2.2vw, 1.7rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
          text-decoration: none;
          padding: 1.1rem 2.2rem;
          background: var(--white);
          border-radius: 100px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: background 0.25s, color 0.25s, transform 0.15s ease-out;
        }
        .footer-cta-link:hover {
          background: var(--brand-accent);
          color: #fff;
        }
        .footer-cta-link svg {
          width: 22px;
          height: 22px;
          transition: transform 0.25s ease;
        }
        .footer-cta-link:hover svg {
          transform: translate(3px, -3px);
        }

        .footer-local-time {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: var(--ink-soft);
          font-weight: 400;
        }
        .time-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--ink-soft);
        }
        .footer-local-time strong {
          color: var(--ink);
          font-weight: 600;
        }

        .footer-columns {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.2fr;
          gap: 3rem;
          padding-bottom: 5rem;
          border-bottom: 1px solid #E3E1DD;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease;
        }
        .footer-columns.vis { opacity: 1; transform: translateY(0); }

        .footer-brand-name {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 0.8rem;
        }
        .footer-brand-name span { color: var(--brand-accent); }

        .footer-brand-desc {
          font-size: 0.82rem;
          line-height: 1.7;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 280px;
        }

        .footer-col-label {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--ink-soft);
          margin-bottom: 1.2rem;
        }

        .footer-col-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-col-list a {
          font-size: 0.84rem;
          color: var(--ink);
          text-decoration: none;
          font-weight: 400;
          transition: color 0.18s;
        }
        .footer-col-list a:hover { color: var(--brand-accent); }

        .footer-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.2rem 0;
          border-top: 1px solid #E3E1DD;
        }
        .footer-copyright {
          font-size: 0.76rem;
          color: #A8A6A2;
          letter-spacing: 0.01em;
        }

        .back-to-top {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: none;
          border: none;
          font-family: inherit;
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--ink-soft);
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: color 0.2s;
        }

        .back-to-top:hover { color: var(--brand-accent); }
        .back-to-top svg { transition: transform 0.2s; }
        .back-to-top:hover svg { transform: translateY(-2px); }

        @media (max-width: 768px) {
          .footer-ghost { display: none; }
          .footer-columns { grid-template-columns: 1fr 1fr; row-gap: 2.4rem; }
          .footer-cta-row { flex-direction: column; align-items: flex-start; }
          .eyebrow-num { display: none; }
        }
      `}</style>

      <footer className="footer" id="contact" ref={sectionRef}>
        <div className="footer-ghost">Aryan</div>

        <div className={`footer-eyebrow ${visible ? "vis" : ""}`}>
          <span className="eyebrow-line" />
          <span className="eyebrow-label">Get in touch</span>
          <span className="eyebrow-num">04</span>
        </div>

        <div className={`footer-cta-block ${visible ? "vis" : ""}`}>
          <div className="footer-status-pill">
            <span className="status-dot" />
            {status}
          </div>

          <h2 className="footer-heading">
            Let's build<br />
            something <em>great</em>.
          </h2>

          <div className="footer-cta-row">
            <a ref={ctaRef} href={`mailto:${email}`} className="footer-cta-link">
              {email}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H10M17 7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="footer-local-time">
              <span>{location}</span>
              <span className="time-dot" />
              <span>Local time <strong>{time}</strong></span>
            </div>
          </div>
        </div>

        <div className={`footer-columns ${visible ? "vis" : ""}`}>
          <div>
            <div className="footer-brand-name">aryan<span>.</span>Pachandi</div>
            <p className="footer-brand-desc">
              Full-stack developer & designer building fast, thoughtful digital experiences from India, for clients worldwide.
            </p>
          </div>

          <div>
            <p className="footer-col-label">Sitemap</p>
            <div className="footer-col-list">
              {sitemap.map((s) => (
                <a key={s.label} href={s.href}>{s.label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-col-label">Connect</p>
            <div className="footer-col-list">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-col-label">Direct</p>
            <div className="footer-col-list">
              <a href={`mailto:${email}`} title={email}>Email me</a>
              <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">© {new Date().getFullYear()} Aryan Pachandi. All rights reserved.</span>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}