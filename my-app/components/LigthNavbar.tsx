"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav-shell ${scrolled ? "scrolled" : ""} ${dmSans.className}`}>
        <nav className="nav-inner">

          {/* Status */}
          <div className="status">
            <span className="dot" />
            <span className="status-label">Available</span>
          </div>

          {/* Desktop links */}
          <ul className="links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="link">{label}</Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="right">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              Resume <span>↗</span>
            </a>

            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`bar ${menuOpen ? "open" : ""}`} />
              <span className={`bar ${menuOpen ? "open" : ""}`} />
              <span className={`bar ${menuOpen ? "open" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`mobile-menu ${menuOpen ? "visible" : ""}`}>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="mobile-link" onClick={handleLinkClick}>
              {label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-resume"
            onClick={handleLinkClick}
          >
            View Resume ↗
          </a>
        </div>
      </header>

      <style jsx>{`
        /* ── Shell ── */
        .nav-shell {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 40px);
          max-width: 860px;
          border-radius: 18px;
          /* Single, cheap backdrop blur — no drop-shadow filter */
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.25s ease, background 0.25s ease;
          font-family: "DM Sans", sans-serif;
        }

        .nav-shell.scrolled {
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        }

        /* ── Inner row ── */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          gap: 12px;
        }

        /* ── Status ── */
        .status {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.22);
          animation: pulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(22,163,74,0.2); }
          50%       { box-shadow: 0 0 0 3.5px rgba(22,163,74,0.38); }
        }

        .status-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(20, 20, 20, 0.7);
          white-space: nowrap;
        }

        /* ── Desktop nav links ── */
        .links {
          display: flex;
          align-items: center;
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .link {
          display: block;
          padding: 5px 14px;
          font-size: 0.86rem;
          font-weight: 500;
          color: rgba(20, 20, 20, 0.6);
          text-decoration: none;
          border-radius: 999px;
          letter-spacing: -0.01em;
          transition: color 0.18s, background 0.18s;
        }

        .link:hover {
          color: rgba(10, 10, 10, 0.9);
          background: rgba(0, 0, 0, 0.055);
        }

        /* ── Right side ── */
        .right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* ── Resume CTA ── */
        .resume-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 18px;
          font-size: 0.83rem;
          font-weight: 600;
          font-family: inherit;
          text-decoration: none;
          border-radius: 999px;
          color: rgba(20, 20, 20, 0.88);
          background: rgba(255, 244, 180, 0.82);
          border: 1px solid rgba(200, 160, 0, 0.18);
          box-shadow: 0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7);
          white-space: nowrap;
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }

        .resume-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .resume-btn span {
          opacity: 0.65;
          font-size: 0.9rem;
        }

        /* ── Hamburger ── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 34px;
          height: 34px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .hamburger:hover {
          background: rgba(0,0,0,0.05);
        }

        .bar {
          display: block;
          width: 100%;
          height: 1.75px;
          background: rgba(20, 20, 20, 0.7);
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease;
          transform-origin: center;
        }

        /* Animate to X */
        .bar.open:nth-child(1) { transform: translateY(5.75px) rotate(45deg); }
        .bar.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .bar.open:nth-child(3) { transform: translateY(-5.75px) rotate(-45deg); }

        /* ── Mobile dropdown ── */
        .mobile-menu {
          display: none;
          flex-direction: column;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.28s ease, opacity 0.22s ease;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          padding: 0 14px;
        }

        .mobile-menu.visible {
          max-height: 280px;
          opacity: 1;
          padding: 8px 14px 12px;
        }

        .mobile-link {
          display: block;
          padding: 9px 6px;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(20, 20, 20, 0.7);
          text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: color 0.15s;
        }

        .mobile-link:hover { color: rgba(10,10,10,0.95); }

        .mobile-resume {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 999px;
          color: rgba(20, 20, 20, 0.88);
          background: rgba(255, 244, 180, 0.82);
          border: 1px solid rgba(200, 160, 0, 0.18);
          align-self: flex-start;
        }

        /* ── Breakpoints ── */

        /* Tablet: hide status label */
        @media (max-width: 720px) {
          .status-label { display: none; }
          .link { padding: 5px 10px; font-size: 0.82rem; }
        }

        /* Mobile: hide desktop links, show hamburger */
        @media (max-width: 560px) {
          .nav-shell {
            top: 10px;
            width: calc(100% - 24px);
            border-radius: 16px;
          }

          .links { display: none; }
          .resume-btn { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </>
  );
}