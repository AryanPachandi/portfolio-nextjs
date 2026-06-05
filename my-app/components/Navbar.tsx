// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DM_Sans } from "next/font/google";

const navLinks = [
  { label: "Home", href: "#home" },
   { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
 
  { label: "Contact", href: "#contact" },
];
const dmSans = DM_Sans({
  subsets: ["latin"],
});

export default function Navbar() {


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
        rel="stylesheet"
      />

      <header className="navbar-wrapper">
        <nav className="navbar">

          {/* ── Logo + status ── */}
          <div className="brand">
        
            <div className="status">
              <span className="status-text">Available for work</span>
              <span className="status-dot" />
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="divider" />

          {/* ── Nav links ── */}
          <ul className="nav-links">
            {navLinks.map(({ label, href }) => {
              
              return (
                <li key={href}>
                  <Link
                    href={href}
                   
                  >
                    {label}
                  
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Divider ── */}
          <div className="divider" />

          {/* ── CTA ── */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            View Resume
            <span className="arrow">↗</span>
          </a>

        </nav>
      </header>

      <style jsx>{`
        /* ─────────────────────────────────────────
           iOS 26-style liquid glass navbar
        ───────────────────────────────────────── */

        .navbar-wrapper {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 48px);
          max-width: 880px;
          /* outer glow ring */
          filter: drop-shadow(0 8px 32px rgba(0,0,0,0.18))
                  drop-shadow(0 2px 6px rgba(0,0,0,0.10));
          font-family: "DM Sans", sans-serif;
        }

        .navbar {
          display: flex;
          align-items: center;
          gap: 0;
          border-radius: 999px;
          padding: 8px 10px 8px 16px;
          overflow: hidden;

          /* ── iOS 26 liquid glass ── */
          background:
            /* White specular layer on top */
            linear-gradient(
              175deg,
              rgba(255,255,255,0.38) 0%,
              rgba(255,255,255,0.10) 40%,
              rgba(255,255,255,0.04) 100%
            );
          backdrop-filter: blur(40px) saturate(180%) brightness(1.08);
          -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(1.08);

          /* Glass border: bright top edge, dim bottom */
          border: 1px solid transparent;
          border-image: none;
          outline: 1px solid rgba(255,255,255,0.45);
          outline-offset: -1px;

          box-shadow:
            /* Inner top glare */
            inset 0 1.5px 0 rgba(255,255,255,0.65),
            /* Inner bottom shadow */
            inset 0 -1px 0 rgba(0,0,0,0.08),
            /* Inner left shimmer */
            inset 1px 0 0 rgba(255,255,255,0.25),
            /* Soft outer shadow */
            0 4px 24px rgba(0,0,0,0.12),
            0 1px 4px rgba(0,0,0,0.08);
        }

        /* ── Brand ── */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          padding-right: 4px;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          color: rgba(30,30,30,0.85);
          background: rgba(255,255,255,0.28);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.7),
            0 1px 4px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .status-text {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(20,20,20,0.82);
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #16a34a;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(22,163,74,0.25), 0 0 8px rgba(22,163,74,0.5);
          animation: pulse 2.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(22,163,74,0.2), 0 0 6px rgba(22,163,74,0.4); }
          50%       { box-shadow: 0 0 0 3px rgba(22,163,74,0.35), 0 0 12px rgba(22,163,74,0.6); }
        }

        /* ── Glass divider ── */
        .divider {
          width: 1px;
          height: 22px;
          margin: 0 16px;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.6),
            rgba(180,180,180,0.25),
            rgba(255,255,255,0.0)
          );
          flex-shrink: 0;
        }

        /* ── Nav links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .nav-link {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 18px;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(20,20,20,0.6);
          text-decoration: none;
          border-radius: 999px;
          letter-spacing: -0.01em;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: rgba(20,20,20,0.9);
          background: rgba(255,255,255,0.35);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .nav-link.active {
          color: rgba(10,10,10,0.92);
          font-weight: 600;
          background: rgba(255,255,255,0.42);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.8),
            0 1px 4px rgba(0,0,0,0.06);
        }

        // .active-pip {
        //   display: block;
        //   width: 4px;
        //   height: 4px;
        //   background: rgba(10,10,10,0.55);
        //   border-radius: 50%;
        //   margin-top: 4px;
        // }

        /* ── Resume CTA ── */
        .resume-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: "DM Sans", sans-serif;
          text-decoration: none;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: -0.01em;
          color: rgba(20,20,20,0.88);

          /* Warm cream glass pill */
          background: linear-gradient(
            160deg,
            rgba(255,248,220,0.85) 0%,
            rgba(255,235,160,0.65) 100%
          );
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.85),
            inset 0 -1px 0 rgba(180,140,0,0.1),
            0 2px 8px rgba(0,0,0,0.08);

          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
        }

        .resume-btn:hover {
          transform: translateY(-1px);
          background: linear-gradient(
            160deg,
            rgba(255,252,230,0.95) 0%,
            rgba(255,240,170,0.75) 100%
          );
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.9),
            0 4px 16px rgba(0,0,0,0.12);
        }

        .arrow {
          font-size: 0.95rem;
          line-height: 1;
          opacity: 0.7;
        }

        /* ── Responsive ── */
        @media (max-width: 680px) {
          .navbar-wrapper {
            width: calc(100% - 24px);
            top: 12px;
          }

          .status-text { display: none; }
          .divider { margin: 0 10px; }

          .nav-link {
            padding: 6px 12px;
            font-size: 0.82rem;
          }

          .resume-btn {
            padding: 8px 14px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}