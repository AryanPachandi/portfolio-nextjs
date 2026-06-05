// components/TerminalFooterDivider.tsx
// Place this between <TerminalContact /> and your <Footer />

export default function TerminalFooterDivider() {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-12 px-4">

      {/* Fading vertical line */}
      <div
        className="w-px h-16"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(120,120,120,0.25), transparent)",
        }}
      />

      {/* Center dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />

      {/* Fading horizontal rule */}
      <div
        className="w-full max-w-2xl h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(120,120,120,0.2) 30%, rgba(120,120,120,0.2) 70%, transparent)",
        }}
      />

    </div>
  );
}