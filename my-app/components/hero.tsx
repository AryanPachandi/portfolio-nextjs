"use client";

import { useEffect, useRef, useState } from "react";
import DitherShaderDemo from "@/components/dither-shader-demo";
import { CldImage } from "next-cloudinary";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorRole, setCursorRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const roles = ["Full-Stack Developer", "UI/UX Designer", "Creative Coder"];

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        :root {
          --white: #FFFFFF;
          --off: #F4F4F3;
          --ink: #0A0A0A;
          --ink-soft: #4A4A4A;
          --accent: #4F3FF0;
          --accent-light: #EBE9FD;
        }

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

        /* Ghost name in background */
        .ghost-name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(80px, 16vw, 220px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1.5px #504242;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          transition: transform 0.12s ease-out;
          font-family: 'Inter', sans-serif;
          z-index: 0;
        }

        /* Floating accent blob */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }
        .blob-2 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #F0EEF9 0%, transparent 70%);
          bottom: 14%; left: 8%;
          transition: transform 0.18s ease-out;
        }

        /* Nav */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.6rem 6vw;
          z-index: 100;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }

        .nav-logo {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-logo span { color: var(--accent); }

        .nav-links {
          display: flex;
          gap: 2.2rem;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--ink-soft);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--ink); }

        /* Main content */
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 620px;
          flex-shrink: 1;
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent-light);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.35rem 0.9rem;
          border-radius: 100px;
          margin-bottom: 2rem;
          letter-spacing: 0.02em;
          animation: fadeUp 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .status-dot {
          width: 7px; height: 7px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero-name {
          font-size: clamp(48px, 7.5vw, 96px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 0.95;
          color: var(--ink);
          animation: fadeUp 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-name .accent-char { color: var(--accent); }

        .hero-role {
          margin-top: 1.4rem;
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          font-weight: 300;
          color: var(--ink-soft);
          min-height: 2rem;
          display: flex;
          align-items: center;
          gap: 0.15em;
          letter-spacing: -0.01em;
          animation: fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--accent);
          border-radius: 2px;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }

        .hero-bio {
          margin-top: 1.6rem;
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

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--ink);
          color: var(--white);
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.85rem 1.8rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: var(--accent); }

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

        /* Portrait, right side */
        .hero-visual {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          width: clamp(220px, 28vw, 400px);
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
          background: radial-gradient(circle, #DDD9FC 0%, transparent 70%);
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
        .portrait-img {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }

        /* Social strip */
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
        .social-link:hover { color: var(--accent); }

        /* Scroll cue */
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
          background: linear-gradient(to bottom, transparent, var(--accent));
          animation: scrollLine 2s ease-in-out infinite;
        }

        /* Stats row */
        .stats-row {
          position: absolute;
          bottom: 3rem;
          right: 6vw;
          display: flex;
          gap: 2.5rem;
          z-index: 2;
          animation: fadeUp 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .stat {
          text-align: right;
        }
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

        /* Keyframes */
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
          .nav-links { display: none; }
        }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          aryan<span>.</span>Pachandi
        </a>
        <ul className="nav-links">
          {["Work", "About", "Process", "Contact"].map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef}>

        {/* Ghost background name */}
        <div
          className="ghost-name"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 0.4}px), calc(-50% + ${mousePos.y * 0.4}px))`,
          }}
        >
          Aryan
        </div>
        {/* <DitherShaderDemo /> */}

        {/* Blob */}
        <div
          className="blob blob-2"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
        />

        {/* Main content */}
        <div className="hero-content">
          <div className="status-pill">
            <span className="status-dot" />
            Available for work
          </div>

          <h1 className="hero-name">
            Aryan<br />
            Pachandi <span className="accent-char">.</span>
          </h1>

          <p className="hero-role">
            {displayed}
            <span className="cursor-blink" />
          </p>

          <p className="hero-bio">
            I build fast, thoughtful digital experiences — from pixel-perfect interfaces to scalable backend systems. Based in India, working globally.
          </p>

          <div className="hero-actions">
            <a ref={btnRef} href="#work" className="btn-primary">
              View my work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn-secondary">
              Let's talk
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Portrait — right side */}
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
            <CldImage
              src="IMG_0310-dithered_bbfelu"
              width={450}
              height={550}
              alt="Aryan Pachandi"
              sizes="(max-width: 768px) 70vw, 28vw"
              className="portrait-img"
              style={{
                borderRadius: "40% 60% 55% 45% / 40% 40% 60% 60%",
                objectFit: "cover",
                boxShadow: "0 20px 60px rgba(79,63,240,0.25)",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { num: "3+", label: "Years exp." },
            { num: "20+", label: "Projects" },
            { num: "15+", label: "Clients" },
          ].map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Social strip */}
      <div className="social-strip">
        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
          <a key={s} href="#" className="social-link">{s}</a>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <span className="scroll-cue-text">Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </>
  );
}