"use client";

import { useEffect, useRef, useState } from "react";
import DitherShaderDemo from "@/components/dither-shader-demo";
import { CldImage } from "next-cloudinary";

interface HeroProps {
  settings?: any;
  socials?: any[];
}

export default function HeroSection({ settings, socials }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorRole, setCursorRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const roles = ["Full-Stack Developer", "Creative Coder", "Backend Developer"];

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = roles[cursorRole];
    let i = 0;
    setDisplayed("");
    const type = setInterval(() => {
      i++;
      setDisplayed(role.slice(0, i));
      if (i === role.length) {
        clearInterval(type);
        setTimeout(() => {
          const erase = setInterval(() => {
            i--;
            setDisplayed(role.slice(0, i));
            if (i === 0) {
              clearInterval(erase);
              setCursorRole((prev) => (prev + 1) % roles.length);
            }
          }, 40);
        }, 1800);
      }
    }, 65);
    return () => clearInterval(type);
  }, [cursorRole]);

  // Magnetic button
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const handleEnter = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
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

  const profileImg = settings?.profileImage || "IMG_0310-dithered_bbfelu";
  const isCloudinaryPublicId = !profileImg.startsWith("http") && !profileImg.startsWith("data:");

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--white);
          color: var(--ink);
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3vw;
          padding: 0 6vw;
          overflow: hidden;
        }

        .ghost-name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(120px, 22vw, 320px);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1px var(--ghost-stroke);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
          transition: transform 0.1s ease-out;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--brand-accent-glow) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }
        .blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
          bottom: -50px;
          left: -50px;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 620px;
          padding-top: 2rem;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: var(--pill-bg);
          border: 1px solid var(--pill-border);
          padding: 0.38rem 0.9rem;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--ink-soft);
          letter-spacing: 0.02em;
          margin-bottom: 2rem;
          animation: fadeUp 0.8s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          animation: pulse 2s infinite;
        }

        .hero-name {
          font-size: clamp(2.8rem, 6.2vw, 5.2rem);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: var(--ink);
          margin-bottom: 1.4rem;
          animation: fadeUp 0.9s 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }
        .accent-char {
          color: var(--brand-accent);
          display: inline-block;
        }

        .hero-role {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 400;
          color: var(--ink-soft);
          margin-bottom: 1.6rem;
          min-height: 2.2rem;
          letter-spacing: -0.01em;
          animation: fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: var(--brand-accent);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.8s infinite;
        }

        .hero-bio {
          max-width: 480px;
          font-size: clamp(0.88rem, 1.2vw, 1rem);
          line-height: 1.75;
          color: var(--ink-soft);
          font-weight: 300;
          animation: fadeUp 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }

        .hero-actions {
          margin-top: 2.8rem;
          display: flex;
          align-items: center;
          gap: 1.4rem;
          flex-wrap: wrap;
          animation: fadeUp 0.9s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @media (max-width: 768px) {
          .hero-actions { display: none; }
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--button-bg);
          color: var(--button-fg);
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.85rem 1.8rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: var(--brand-accent); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink-soft);
          font-size: 0.88rem;
          font-weight: 400;
          text-decoration: none;
          letter-spacing: 0.01em;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          padding-bottom: 1px;
        }
        .btn-secondary:hover {
          color: var(--ink);
          border-color: var(--ink);
        }

        .hero-visual {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          width: clamp(280px, 34vw, 540px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeUp 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .portrait-glow {
          position: absolute;
          width: 130%;
          height: 130%;
          border-radius: 50%;
          background: radial-gradient(circle, var(--brand-accent-glow) 0%, transparent 70%);
          filter: blur(50px);
          z-index: 0;
          pointer-events: none;
          transition: transform 0.18s ease-out;
        }
        .portrait-frame {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 450 / 550;
          transition: transform 0.15s ease-out;
        }

        .social-strip {
          position: fixed;
          left: 2rem;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          z-index: 10;
          animation: fadeUp 1s 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        .social-strip::after {
          content: '';
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--ink-soft), transparent);
          display: block;
        }
        .social-link {
          color: var(--ink-soft);
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 500;
          writing-mode: vertical-rl;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .social-link:hover { color: var(--brand-accent); }

        .scroll-cue {
          position: fixed;
          right: 2rem;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 10;
          animation: fadeUp 1s 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        .scroll-cue-text {
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
          writing-mode: vertical-rl;
        }
        .scroll-arrow {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, var(--ink-soft));
          position: relative;
          overflow: hidden;
        }
        .scroll-arrow::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--brand-accent));
          animation: scrollLine 2s ease-in-out infinite;
        }

        .stats-row {
          position: absolute;
          bottom: 3rem;
          right: 6vw;
          display: flex;
          gap: 2.5rem;
          z-index: 2;
          animation: fadeUp 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .stat { text-align: right; }
        .stat-num {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 0.7rem;
          color: var(--ink-soft);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 0.1rem;
        }
        .portrait-img {
          width: 100%;
          max-width: 450px;
          height: auto;
          border-radius: 40% 60% 55% 45% / 40% 40% 60% 60%;
          object-fit: cover;
          box-shadow: 0 20px 60px var(--brand-accent-glow);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 100%; }
        }

        @media (max-width: 768px) {
          .social-strip, .scroll-cue, .stats-row { display: none; }
          .hero {
            flex-direction: column;
            justify-content: flex-start;
            padding: 7rem 6vw 3rem;
            gap: 2.5rem;
          }
          .hero-content { max-width: 100%; }
          .hero-visual { width: min(70vw, 300px); }
          .ghost-name { font-size: 22vw; }
        }
      `}</style>

      <section className="hero" ref={heroRef}>
        <div
          className="ghost-name"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 0.4}px), calc(-50% + ${mousePos.y * 0.4}px))`,
          }}
        >
          {settings?.name?.split(" ")[0] || "Aryan"}
        </div>

        <div
          className="blob blob-2"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
        />

        <div className="hero-content">
          <div className="status-pill">
            <span className="status-dot" />
            {settings?.status || "Available for work"}
          </div>

          <h1 className="hero-name">
            {settings?.headline?.split(" ")[0] || "Aryan"}<br />
            {settings?.headline?.split(" ").slice(1).join(" ") || "Pachandi ."}
          </h1>

          <p className="hero-role">
            {displayed}
            <span className="cursor-blink" />
          </p>

          <p className="hero-bio">
            {settings?.bio ||
              "I build fast, thoughtful digital experiences — from pixel-perfect interfaces to scalable backend systems. Based in India, working globally."}
          </p>

          <div className="hero-actions">
            <a ref={btnRef} href="#work" className="btn-primary hidden md:flex hero-actions">
              View my work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn-secondary hidden md:flex hero-actions">
              Let's talk
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="portrait-glow"
            style={{
              transform: `translate(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px)`,
            }}
          />
          <div
            className="portrait-frame"
            style={{
              transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px) rotate(${mousePos.x * 0.04}deg)`,
            }}
          >
            {isCloudinaryPublicId ? (
              <CldImage
                src={profileImg}
                width={900}
                height={900}
                sizes="(max-width: 768px) 70vw, 34vw"
                alt={settings?.name || "Aryan Pachandi"}
                className="portrait-img"
              />
            ) : (
              <img
                src={profileImg}
                alt={settings?.name || "Aryan Pachandi"}
                className="portrait-img"
              />
            )}
          </div>
        </div>

        <div className="stats-row">
          {[
            { num: settings?.graduationYear || "2027", label: "Graduating" },
            { num: settings?.projectsBuiltLabel || "20+", label: "Projects Built" },
            { num: settings?.internshipsLabel || "1", label: "Internships" },
          ].map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {socials && socials.length > 0 && (
        <div className="social-strip">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {social.name}
            </a>
          ))}
        </div>
      )}

      <div className="scroll-cue">
        <span className="scroll-cue-text">Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </>
  );
}
