"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import styles from "@/components/navbar.module.css"

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
      <header
  className={`${styles.navshell} ${
    scrolled ? styles.scrolled : ""
  } ${dmSans.className}`}
>
        <nav className={styles.navinner}>

          {/* Status */}
          <div className={styles.status}>
            <span className={styles.dot} />
            <span className={styles.statuslabel}>Available</span>
          </div>

          {/* Desktop links */}
          <ul className={styles.links}>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className={styles.right}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
            >
              Resume <span>↗</span>
            </a>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
           <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
           <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
           <span className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
    <div
  className={`${styles.mobileMenu} ${
    menuOpen ? styles.visible : ""
  }`}
>
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className={styles.mobileLink} onClick={handleLinkClick}>
              {label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileResume}
            onClick={handleLinkClick}
          >
            View Resume ↗
          </a>
        </div>
      </header>

    </>
  );
}

