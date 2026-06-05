
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer  className={styles.footer}>
      {/* Blue dot decoration */}
      <div className={styles.dot} />

      {/* Left: Headline + updated date */}
      <div className={styles.left}>
        <h2 className={styles.headline}>
          Thank you
          <br />
          for your curiosity!
        </h2>
        <span className={styles.updated}>Updated May 2026</span>
      </div>

      {/* Right: Nav columns */}
      <nav className={styles.nav}>
        <div className={styles.navCol}>
          <span className={styles.navLabel}>MAIN</span>
          <Link href="/work">Work</Link>
          <Link href="/archive">Archive</Link>
          <Link href="/about">About</Link>
        </div>

        <div className={styles.navCol}>
          <span className={styles.navLabel}>CONNECT</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn&nbsp;↗
          </a>
          <a href="mailto:hello@example.com">Email&nbsp;↗</a>
         
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram&nbsp;↗
          </a>
        </div>
      </nav>

     
    </footer>
  );
}