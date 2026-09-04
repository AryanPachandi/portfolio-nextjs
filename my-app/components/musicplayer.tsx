"use client";

import { useAudio } from "@/contexts/audio-context";
import { usePathname } from "next/navigation";

export default function MusicPlayer() {
  const pathname = usePathname();
  const { playing, toggleAudio } = useAudio();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <style>{`
        .music-player {
          position: fixed;
          bottom: 2.5rem;
          right: 6vw;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 100px;
          padding: 0.5rem 0.5rem 0.5rem 1rem;
          box-shadow: 0 10px 30px rgba(79,63,240,0.15);
          font-family: 'Inter', sans-serif;
          transition: box-shadow 0.2s;
        }
        .music-player:hover { box-shadow: 0 14px 36px rgba(79,63,240,0.25); }
        .music-label { font-size: 0.72rem; font-weight: 500; color: #4A4A4A; letter-spacing: 0.02em; white-space: nowrap; }
        .music-eq { display: flex; align-items: center; gap: 3px; height: 14px; }
        .music-eq span { width: 3px; background: #4F3FF0; border-radius: 2px; display: block; }
        .music-eq span:nth-child(1) { height: 6px; }
        .music-eq span:nth-child(2) { height: 12px; }
        .music-eq span:nth-child(3) { height: 8px; }
        .music-eq.is-playing span { animation: eqBounce 0.9s ease-in-out infinite; }
        .music-eq.is-playing span:nth-child(1) { animation-delay: 0s; }
        .music-eq.is-playing span:nth-child(2) { animation-delay: 0.15s; }
        .music-eq.is-playing span:nth-child(3) { animation-delay: 0.3s; }
        .music-btn { width: 38px; height: 38px; border-radius: 50%; background: #0A0A0A; color: #FFFFFF; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; flex-shrink: 0; transition: background 0.2s, transform 0.15s; }
        .music-btn:hover { background: #4F3FF0; transform: scale(1.06); }
        .music-btn:active { transform: scale(0.95); }
        @keyframes eqBounce { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
        @media (max-width: 768px) {
          .music-player { bottom: 1.4rem; right: 5vw; padding: 0.45rem; }
          .music-label { display: none; }
        }
      `}</style>

      <div className="music-player">
        <span className="music-label">{playing ? "Now playing" : "Play music"}</span>
        <span className={`music-eq ${playing ? "is-playing" : ""}`}>
          <span /><span /><span />
        </span>
        <button
          className="music-btn"
          onClick={toggleAudio}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}