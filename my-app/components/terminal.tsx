"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type LineType = "output" | "ok" | "err" | "info" | "head" | "prompt";

interface Line {
  text: string;
  type: LineType;
}

const BOOT_LINES: { text: string; type: LineType; delay: number }[] = [
  { text: "──────────────────────────────────────", type: "output", delay: 0 },
  { text: "  Welcome to my portfolio terminal! 👋", type: "head", delay: 120 },
  { text: "──────────────────────────────────────", type: "output", delay: 240 },
  { text: "", type: "output", delay: 360 },
  { text: "  I'd love to hear from you.", type: "output", delay: 480 },
  { text: "  Fill in your details to get in touch.", type: "output", delay: 600 },
  { text: "", type: "output", delay: 720 },
  { text: "  Step 1 →  name    Your Name", type: "info", delay: 900 },
  { text: "  Step 2 →  email   your@email.com", type: "info", delay: 1060 },
  { text: "  Step 3 →  message Your message here", type: "info", delay: 1220 },
  { text: "  Step 4 →  send", type: "info", delay: 1380 },
  { text: "", type: "output", delay: 1500 },
  { text: "  Type 'help' anytime for all commands.", type: "ok", delay: 1620 },
  { text: "", type: "output", delay: 1740 },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const booted = useRef(false);

  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Boot sequence — plays once, the first time the terminal scrolls into view
  useEffect(() => {
    if (!visible || booted.current) return;
    booted.current = true;

    const timers = BOOT_LINES.map(({ text, type, delay }, i) =>
      setTimeout(() => {
        setLines((prev) => [...prev, { text, type }]);
        if (i === BOOT_LINES.length - 1) {
          setReady(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  useEffect(() => {
    if (histRef.current) {
      histRef.current.scrollTop = histRef.current.scrollHeight;
    }
  }, [lines]);

  const push = (text: string, type: LineType = "output") => {
    setLines((prev) => [...prev, { text, type }]);
  };

  const blank = () => push("", "output");

  const handleCommand = async (raw: string) => {
    const cmd = raw.trim();
    setLines((prev) => [...prev, { text: cmd, type: "prompt" }]);

    const [verb, ...rest] = cmd.split(/\s+/);
    const val = rest.join(" ");

    switch (verb.toLowerCase()) {
      case "help":
        blank();
        push("Available commands", "head");
        push("──────────────────────────────");
        push("  name    <your name>");
        push("  email   <your email>");
        push("  message <your message>");
        push("  show    — preview your details");
        push("  send    — submit the form");
        push("  clear   — clear the terminal");
        blank();
        break;

      case "name":
        if (!val) { push("Usage: name <your name>", "err"); break; }
        setFormData((p) => ({ ...p, name: val }));
        push(`✔ Name saved: ${val}`, "ok");
        break;

      case "email":
        if (!val) { push("Usage: email <your email>", "err"); break; }
        setFormData((p) => ({ ...p, email: val }));
        push(`✔ Email saved: ${val}`, "ok");
        break;

      case "message":
        if (!val) { push("Usage: message <text>", "err"); break; }
        setFormData((p) => ({ ...p, message: val }));
        push("✔ Message saved", "ok");
        break;

      case "show":
        blank();
        push("─── Form preview ───────────────", "info");
        push(`  name     ${formData.name || "(empty)"}`);
        push(`  email    ${formData.email || "(empty)"}`);
        push(`  message  ${formData.message || "(empty)"}`);
        blank();
        break;

      case "send":
        if (!formData.name || !formData.email || !formData.message) {
          push("❌ Fill in name, email, and message first.", "err");
          push('   Run "show" to check your fields.', "err");
          break;
        }
        push("⏳ Sending...", "info");
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (res.ok) {
            push("✅ Message sent successfully!", "ok");
            push("   Thanks — I'll get back to you soon.", "ok");
            setFormData({ name: "", email: "", message: "" });
          } else {
            push("❌ Server returned an error.", "err");
          }
        } catch {
          push("❌ Network error. Please try again.", "err");
        }
        break;

      case "clear":
        setLines([]);
        break;

      case "":
        break;

      default:
        push(`command not found: ${verb}`, "err");
        push('Type "help" to see available commands.');
    }
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleCommand(input);
      setInput("");
    }
  };

  return (
    <>
      <style>{`
        :root {
          --white: #FFFFFF;
          --off: #F4F4F3;
          --ink: #0A0A0A;
          --ink-soft: #4A4A4A;
          --accent: #4F3FF0;
          --accent-soft: #8B7FF7;
          --accent-light: #EBE9FD;
        }

        .contact-form {
          position: relative;
          padding: 9rem 6vw 8rem;
          background: var(--white);
          overflow: hidden;
        }

        .contact-form-ghost {
          position: absolute;
          top: 4%;
          right: -3vw;
          font-size: clamp(90px, 16vw, 220px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px #312e2e;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }

        .contact-form-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 3.5rem;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .contact-form-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .eyebrow-line { width: 36px; height: 1px; background: var(--accent); }
        .eyebrow-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .eyebrow-num {
          margin-left: auto;
          font-size: 0.7rem;
          color: #CCCCCC;
          letter-spacing: 0.05em;
        }

        .contact-form-header {
          position: relative;
          z-index: 1;
          max-width: 640px;
          margin: 0 auto 3.5rem;
          text-align: center;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease;
        }
        .contact-form-header.vis { opacity: 1; transform: translateY(0); }

        .contact-form-heading {
          font-size: clamp(34px, 5vw, 60px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: var(--ink);
        }
        .contact-form-heading em {
          font-style: normal;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--ink);
        }

        .contact-form-intro {
          margin-top: 1.2rem;
          font-size: clamp(0.88rem, 1.2vw, 1rem);
          line-height: 1.75;
          color: var(--ink-soft);
          font-weight: 300;
        }

        /* Terminal card */
        .terminal-wrap {
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease;
        }
        .terminal-wrap.vis { opacity: 1; transform: translateY(0); }

        .terminal {
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          background: var(--ink);
          box-shadow: 0 40px 80px -20px rgba(10,10,10,0.35);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .terminal-bar {
          display: flex;
          align-items: center;
          height: 42px;
          padding: 0 1rem;
          gap: 0.6rem;
          background: #141414;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .terminal-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .terminal-dot.red { background: #E0746A; }
        .terminal-dot.yellow { background: #E0B860; }
        .terminal-dot.green { background: #6FBF80; }
        .terminal-bar-label {
          font-size: 0.72rem;
          color: #7A7A7A;
          font-family: 'JetBrains Mono', monospace;
          margin-left: 0.3rem;
        }

        .terminal-history {
          padding: 1.2rem 1.2rem 0.5rem;
          overflow-y: auto;
          max-height: 320px;
          scrollbar-width: none;
        }
        .terminal-history::-webkit-scrollbar { display: none; }

        .terminal-line {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .terminal-line.output { color: #B8B8B8; }
        .terminal-line.ok { color: #8FCB9C; }
        .terminal-line.err { color: #E08A8A; }
        .terminal-line.info { color: var(--accent-light); }
        .terminal-line.head { color: #FFFFFF; font-weight: 500; }

        .terminal-prompt-user { color: var(--accent-soft); }
        .terminal-prompt-host { color: #8FCB9C; }
        .terminal-prompt-path { color: #C9C9C9; }

        .terminal-input-row {
          display: flex;
          align-items: center;
          padding: 0.8rem 1.2rem 1.1rem;
          margin-top: 0.4rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
        }
        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding-left: 0.5rem;
          color: #EDEDED;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          caret-color: var(--accent);
        }
        .terminal-input::placeholder { color: #5A5A5A; }

        @media (max-width: 768px) {
          .contact-form-ghost { display: none; }
          .contact-form { padding: 7rem 6vw 6rem; }
          .terminal-history { max-height: 280px; }
        }
      `}</style>

      {/* JetBrains Mono — used only inside the terminal for that authentic monospace feel */}
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <section className="contact-form" id="contact-form" ref={sectionRef}>
        <div className="contact-form-ghost">HELLO</div>

        <div className={`contact-form-eyebrow ${visible ? "vis" : ""}`}>
          <span className="eyebrow-line" />
          <span className="eyebrow-label">Send a message</span>
          <span className="eyebrow-num">04</span>
        </div>

         
        <div className={`contact-form-header ${visible ? "vis" : ""}`}>
          <h2 className="contact-form-heading">
            Say it in the <em>terminal</em>.
          </h2>
          <p className="contact-form-intro">
            Skip the form fields — type a few commands below and send your message straight from here.
          </p>
        </div>

        <div className={`terminal-wrap ${visible ? "vis" : ""}`}>
          <div className="terminal" onClick={() => inputRef.current?.focus()}>
            <div className="terminal-bar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-bar-label">guest@aryanpachandi — contact</span>
            </div>

            <div ref={histRef} className="terminal-history">
              {lines.map((line, i) =>
                line.type === "prompt" ? (
                  <div className="terminal-line" key={i}>
                    <span className="terminal-prompt-user">guest</span>
                    <span className="terminal-prompt-host">@aryan</span>
                    <span className="terminal-prompt-path">:~$</span> {line.text}
                  </div>
                ) : (
                  <div className={`terminal-line ${line.type}`} key={i}>
                    {line.text || "\u00A0"}
                  </div>
                )
              )}
            </div>

            <div className="terminal-input-row">
              <span className="terminal-prompt-user">guest</span>
              <span className="terminal-prompt-host">@aryan</span>
              <span className="terminal-prompt-path">:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                disabled={!ready}
                placeholder={ready ? "name your_name" : "booting..."}
                className="terminal-input"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}