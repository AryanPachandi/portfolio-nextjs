"use client";

import { useState, useRef, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type LineType = "output" | "ok" | "err" | "info" | "head" | "prompt";

interface Line {
  text: string;
  type: LineType;
  promptCmd?: string; // if type === "prompt", the command text
}
 const BOOT_LINES: { text: string; type: LineType; delay: number }[] = [
  { text: "──────────────────────────────────────", type: "output", delay: 0 },
  { text: "  Welcome to my portfolio terminal! 👋", type: "head",   delay: 120 },
  { text: "──────────────────────────────────────", type: "output", delay: 240 },
  { text: "",                                        type: "output", delay: 360 },
  { text: "  I'd love to hear from you.",            type: "output", delay: 480 },
  { text: "  Fill in your details to get in touch.", type: "output", delay: 600 },
  { text: "",                                        type: "output", delay: 720 },
  { text: "  Step 1 →  name    Your Name",           type: "info",   delay: 900 },
  { text: "  Step 2 →  email   your@email.com",      type: "info",   delay: 1060 },
  { text: "  Step 3 →  message Your message here",   type: "info",   delay: 1220 },
  { text: "  Step 4 →  send",                        type: "info",   delay: 1380 },
  { text: "",                                        type: "output", delay: 1500 },
  { text: "  Type 'help' anytime for all commands.", type: "ok",     delay: 1620 },
  { text: "",                                        type: "output", delay: 1740 },
];


export default function TerminalContact() {
      const [ready, setReady] = useState(false);
  
useEffect(() => {
    const timers = BOOT_LINES.map(({ text, type, delay }, i) =>
      setTimeout(() => {
        setLines((prev) => [...prev, { text, type }]);
        if (i === BOOT_LINES.length - 1) {
          setReady(true);
        //   setTimeout(() => inputRef.current?.focus(), 50);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);
//   const [lines, setLines] = useState<Line[]>([
//     { text: "Welcome to portfolio — contact terminal", type: "head" },
//     { text: 'Type "help" to get started.', type: "output" },
//     { text: "", type: "output" },
//   ]);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const histRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
          push('❌ Fill in name, email, and message first.', "err");
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

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleCommand(input);
      setInput("");
    }
  };

  const colorMap: Record<LineType, string> = {
    output:  "text-[#a6adc8]",
    ok:      "text-[#a6e3a1]",
    err:     "text-[#f38ba8]",
    info:    "text-[#fab387]",
    head:    "text-[#cba6f7] font-medium",
    prompt:  "",
  };

  return (
    <>
      {/* JetBrains Mono */}
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <div
        className="w-[95vw] sm:w-full max-w-[640px] mx-auto rounded-xl overflow-hidden border border-[#313244]"
        style={{ background: "#010101", fontFamily: "'JetBrains Mono', monospace" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center h-[38px] px-3.5 gap-2.5 border-b border-[#313244]"
          style={{ background: "#181825" }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] cursor-pointer" />
          {/* flex-1 text-center text-[12px] text-[#6c7086] */}
          <span className="text-[11px] sm:text-[13px] leading-[1.65] text-[#6c7086]">
            guest@portfolio — bash
          </span>
        </div>

        {/* ── History ── */}
        <div
          ref={histRef}
          className="px-[18px] pt-4 pb-2 overflow-y-auto no-scrollbar"
          style={{ maxHeight: "340px" }}
        >
          {lines.map((line, i) =>
            line.type === "prompt" ? (
              <div key={i} className="text-[13px] leading-[1.65]">
                <span className="text-[#89b4fa]">guest</span>
                <span className="text-[#a6e3a1]">@portfolio</span>
                <span className="text-[#cdd6f4]">:~$</span>
                <span className="text-[#cdd6f4]"> {line.text}</span>
              </div>
            ) : (
              <div
                key={i}
                className={`text-[13px] leading-[1.65] whitespace-pre-wrap break-all ${colorMap[line.type]}`}
              >
                {line.text || "\u00A0"}
              </div>
            )
          )}
        </div>

        {/* ── Input row ── */}
        <div className="flex items-center px-[18px] pb-3.5 pt-2.5 border-t border-[#313244] mt-1.5">
          <span className="text-[13px] text-[#89b4fa]">guest</span>
          <span className="text-[13px] text-[#a6e3a1]">@portfolio</span>
          <span className="text-[13px] text-[#cdd6f4]">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            // flex-1 bg-transparent border-none outline-none text-[13px] text-[#cdd6f4] pl-1.5
            className="text-[11px] sm:text-[13px] leading-[1.65] text-[#cdd6f4] bg-transparent border-none outline-none pl-1.5 flex-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", caretColor: "#f5c2e7" }}
          />
        </div>
      </div>
    </>
  );
}