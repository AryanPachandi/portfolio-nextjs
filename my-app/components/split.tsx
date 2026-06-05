// components/ContactDivider.tsx
// Place this between your Skills section and <TerminalContact />

export default function ContactDivider() {
  return (
    <section className="w-full flex flex-col items-center gap-8 py-16 px-4">

      {/* ── Divider with badge ── */}
      <div className="flex items-center gap-4 w-full max-w-3xl">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <span className="w-[7px] h-[7px] rounded-full bg-green-500 shadow-[0_0_0_2px_rgba(22,163,74,0.2)]" />
          <span className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            Let's work together
          </span>
        </div>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* ── Headline ── */}
      <div className="text-center flex flex-col gap-3 max-w-lg">
        <h2 className="text-[32px] font-medium leading-snug text-neutral-900 dark:text-neutral-100 m-0">
          Got a project in mind?
        </h2>
        <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed m-0">
          Drop me a message right here — no forms, no emails, just a terminal.
        </p>
      </div>

      {/* ── Info pills ── */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          { icon: "⏱", label: "Replies within 24h" },
          { icon: "📍", label: "Based in Pune, India" },
          { icon: "💻", label: "Open to remote work" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
          >
            <span className="text-[14px]">{icon}</span>
            <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
              {label}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}