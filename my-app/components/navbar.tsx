"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.6rem 6vw;
          z-index: 100;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(
            180deg,
            var(--nav-bg-1) 0%,
            var(--nav-bg-2) 100%
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          box-shadow: 0 1px 0 var(--nav-shadow);
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .nav.is-scrolled {
          box-shadow:
            0 1px 0 var(--nav-shadow),
            0 12px 30px -10px var(--nav-shadow-scrolled);
          background: linear-gradient(
            180deg,
            var(--nav-bg-1-scrolled) 0%,
            var(--nav-bg-2-scrolled) 100%
          );
        }
        .nav-logo {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-logo span { color: var(--brand-accent); }
        .nav-links {
          display: flex;
          align-items: center;
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
          background: var(--brand-accent);
          transition: width 0.25s ease;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-links a:hover::after { width: 100%; }

        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border-soft, #E8E8E8);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .theme-toggle:hover {
          border-color: var(--brand-accent);
          color: var(--brand-accent);
        }
        .theme-toggle:active { transform: scale(0.92); }

        @media (max-width: 768px) {
          .nav-links li { display: none; }
          .nav-links { gap: 0; }
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
          <li>
            {mounted && (
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 1v3M12 20v3M4.2 4.2l2 2M17.8 17.8l2 2M1 12h3M20 12h3M4.2 19.8l2-2M17.8 6.2l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}