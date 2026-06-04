'use client'

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Blue dot decoration */}
      <div className="dot" />

      {/* Left: Headline + updated date */}
      <div className="left">
        <h2 className="headline">
          Thank you
          <br />
          for your curiosity!
        </h2>
        <span className="updated">Updated May 2026</span>
      </div>

      {/* Right: Nav columns */}
      <nav className="nav">
        <div className="nav-col">
          <span className="nav-label">MAIN</span>
          <Link href="/work">Work</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="nav-col">
          <span className="nav-label">CONNECT</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn&nbsp;↗
          </a>
          <a href="mailto:hello@example.com">Email&nbsp;↗</a>
         
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram&nbsp;↗
          </a>
        </div>
      </nav>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500&display=swap");

        .footer {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: #ffffff;
          color: #111111;
          padding: 80px 48px 48px;
          min-height: 260px;
          border-top: 1px solid #e5e5e5;
          font-family: "DM Sans", sans-serif;
          overflow: hidden;
        }

        /* Blue dot — centred horizontally, vertically mid-footer */
        .dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          background: #2a4fff;
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Left column ── */
        .left {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .headline {
          font-family: "DM Serif Display", Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0;
          color: #111111;
          letter-spacing: -0.01em;
        }

        .updated {
          font-size: 0.78rem;
          color: #888888;
          letter-spacing: 0.02em;
        }

        /* ── Right nav ── */
        .nav {
          display: flex;
          gap: 64px;
          align-items: flex-start;
        }

        .nav-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-label {
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: #999999;
          font-weight: 500;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .nav-col a {
          font-size: 1rem;
          color: #111111;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-col a:hover {
          color: #2a4fff;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 48px;
            padding: 60px 24px 36px;
          }

          .dot {
            left: 50%;
            top: 40%;
          }

          .nav {
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
}