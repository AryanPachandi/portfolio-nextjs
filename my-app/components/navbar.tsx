"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        :root {
          --white: #FFFFFF;
          --ink: #0A0A0A;
          --ink-soft: #4A4A4A;
          --accent: #4F3FF0;
          --accent-light: #EBE9FD;
        }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.6rem 6vw;
          z-index: 100;
          font-family: 'Inter', sans-serif;

          /* color blend instead of flat white */
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.92) 0%,
            rgba(244,243,253,0.85) 100%
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          border-bottom: 1px solid transparent;
          box-shadow: 0 1px 0 rgba(79,63,240,0.06);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }

        /* Shadow deepens once the page scrolls, instead of a static border */
        .nav.is-scrolled {
          box-shadow:
            0 1px 0 rgba(79,63,240,0.08),
            0 12px 30px -10px rgba(79,63,240,0.18);
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.97) 0%,
            rgba(238,236,252,0.9) 100%
          );
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
          position: relative;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--ink-soft);
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 1.5px;
          background: var(--accent);
          transition: width 0.25s ease;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-links a:hover::after { width: 100%; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          aryan<span>.</span>Pachandi
        </a>

        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </>
  );
}