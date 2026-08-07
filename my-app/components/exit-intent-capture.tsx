"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "portfolio-email-capture-dismissed-at";
const LAST_SEEN_KEY = "portfolio-email-capture-last-seen";
const MIN_DELAY_MS = 90_000;
const MIN_SCROLL_PERCENT = 0.65;
const REOPEN_AFTER_DAYS = 30;

function getDismissedAt() {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : null;
}

function shouldShow() {
  if (typeof window === "undefined") return false;
  const dismissedAt = getDismissedAt();
  if (!dismissedAt) return true;
  return Date.now() - dismissedAt > REOPEN_AFTER_DAYS * 24 * 60 * 60 * 1000;
}

export default function ExitIntentCapture() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);

  // Portal target must be created after mount — document isn't available
  // during SSR, and this also sidesteps hydration mismatches.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while the modal is open, and stop Lenis from
  // hijacking scroll/wheel events that happen inside the modal itself.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const dismiss = useCallback(() => {
    setOpen(false);
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (open || !shouldShow()) return;
      if (event.clientY <= 0) setOpen(true);
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (!open && shouldShow() && docHeight > 0 && scrollTop / docHeight >= MIN_SCROLL_PERCENT) {
        setOpen(true);
      }
    };

    const onTimer = window.setTimeout(() => {
      if (!open && shouldShow()) setOpen(true);
    }, MIN_DELAY_MS);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(onTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target?.dataset?.overlay === "true") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClickOutside);
    };
  }, [open, dismiss]);

  // Magnetic button — same feel as the hero's primary CTA.
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || prefersReducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      btn.style.transform = `translate(${(e.clientX - cx) * 0.15}px, ${(e.clientY - cy) * 0.25}px)`;
    };
    const handleLeave = () => {
      btn.style.transform = "translate(0,0)";
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Visitor" }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Unable to save your email right now.");
      }

      setStatus("success");
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      window.localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
      window.setTimeout(() => setOpen(false), 2600);
    } catch (submissionError) {
      setStatus("idle");
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong.");
    }
  };

  const cardMotion = useMemo(
    () => ({
      initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 },
      animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 },
      exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 },
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    }),
    [prefersReducedMotion]
  );

  if (!mounted) return null;

  return createPortal(
    <>
      <style>{`
        .eic-overlay {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(8, 8, 12, 0.7);
          backdrop-filter: blur(6px);
        }

        .eic-card {
          position: relative;
          width: 100%;
          max-width: 30rem;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: var(--white);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.02) inset;
          padding: 2.25rem 2rem 2rem;
        }

        @media (min-width: 640px) {
          .eic-card { padding: 2.75rem 2.5rem 2.25rem; }
        }

        .eic-glow {
          position: absolute;
          top: -30%;
          left: 50%;
          width: 340px;
          height: 340px;
          transform: translateX(-50%);
          background: radial-gradient(circle, var(--brand-accent-glow) 0%, transparent 70%);
          filter: blur(50px);
          opacity: 0.6;
          pointer-events: none;
        }

        .eic-topline {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
        }

        .eic-mark {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--brand-accent);
        }
        .eic-mark::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-accent);
          box-shadow: 0 0 0 3px var(--brand-accent-light);
        }

        .eic-close {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          color: var(--ink-soft);
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .eic-close:hover {
          color: var(--ink);
          border-color: rgba(0, 0, 0, 0.25);
          transform: rotate(90deg);
        }

        .eic-heading {
          position: relative;
          z-index: 1;
          font-size: clamp(1.6rem, 3.5vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--ink);
        }
        .eic-heading em {
          font-style: normal;
          color: var(--brand-accent);
        }

        .eic-copy {
          position: relative;
          z-index: 1;
          margin-top: 0.9rem;
          max-width: 26rem;
          font-size: 0.92rem;
          line-height: 1.7;
          font-weight: 300;
          color: var(--ink-soft);
        }

        .eic-form {
          position: relative;
          z-index: 1;
          margin-top: 2rem;
        }

        .eic-field {
          position: relative;
        }

        .eic-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
          background: transparent;
          padding: 0.75rem 0.1rem;
          font-size: 1rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.25s;
        }
        .eic-input::placeholder { color: var(--ink-soft); opacity: 0.55; }
        .eic-input:focus { border-color: rgba(0, 0, 0, 0.14); }

        .eic-field-line {
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 1px;
          width: 100%;
          background: var(--brand-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .eic-input:focus ~ .eic-field-line { transform: scaleX(1); }

        .eic-actions {
          margin-top: 1.6rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .eic-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          border-radius: 100px;
          background: var(--brand-accent);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          padding: 0.85rem 1.7rem;
          transition: background 0.2s, opacity 0.2s;
          will-change: transform;
        }
        .eic-submit:hover { background: var(--brand-accent-soft); }
        .eic-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .eic-skip {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--ink-soft);
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .eic-skip:hover {
          color: var(--ink);
          border-color: rgba(0, 0, 0, 0.25);
        }

        .eic-error {
          margin-top: 0.85rem;
          font-size: 0.82rem;
          color: #fca5a5;
        }

        .eic-success {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0.5rem 0 0.25rem;
        }
        .eic-success-mark {
          margin: 0 auto 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--brand-accent-light);
          color: var(--brand-accent);
        }
        .eic-success h3 {
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .eic-success p {
          margin-top: 0.6rem;
          font-size: 0.9rem;
          line-height: 1.7;
          font-weight: 300;
          color: var(--ink-soft);
        }

        @media (prefers-reduced-motion: reduce) {
          .eic-close { transition: none; }
        }
                  .eic-copy {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.7;
}


      `}</style>

      <AnimatePresence>
        {open ? (
          <motion.div
            data-overlay="true"
            className="eic-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="presentation"
            data-lenis-prevent
          >
            <motion.div
              {...cardMotion}
              className="eic-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="eic-heading"
            >
              <div className="eic-glow" />

              <div className="eic-topline">
                <span className="eic-mark">Before you go</span>
                <button type="button" onClick={dismiss} aria-label="Close" className="eic-close">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {status !== "success" ? (
                <>
              <h2 id="eic-heading" className="eic-heading">
  Every great connection starts with a <em>hello.</em>
</h2>

<p className="eic-copy">
  <span>Maybe you're hiring.</span>
  <span>Maybe you're building something ambitious.</span>
  <span>Maybe you're just curious.</span>
  <span>Whatever brought you here, I'd love to stay connected.</span>
</p>

                  <form onSubmit={handleSubmit} className="eic-form">
                    <div className="eic-field">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="eic-input"
                        autoFocus
                        aria-label="Email address"
                      />
                      <span className="eic-field-line" />
                    </div>

                    <div className="eic-actions">
                      <button ref={btnRef} type="submit" disabled={status === "loading"} className="eic-submit">
                        {status === "loading" ? "Sending..." : "Keep me posted"}
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button type="button" onClick={dismiss} className="eic-skip">
                        Not now
                      </button>
                    </div>

                    {error ? <p className="eic-error">{error}</p> : null}
                  </form>
                </>
              ) : (
                <motion.div
                  className="eic-success"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="eic-success-mark">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 11.5l5 5L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>You&apos;re on the list.</h3>
                  <p>Thanks for sticking around — I&apos;ll be in touch soon.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    document.body
  );
}