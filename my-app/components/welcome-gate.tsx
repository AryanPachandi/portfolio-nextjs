"use client";

import { useState } from "react";
import { useAudio } from "@/contexts/audio-context";
import { GLSLHills } from "@/components/GLSLHills";

export default function WelcomeGate({ children }: { children: React.ReactNode }) {
  const { startAudio } = useAudio();
  const [entering, setEntering] = useState(false);
  const [entered, setEntered] = useState(false);

  const handleEnter = async () => {
    // This runs inside a real click handler — play() is guaranteed to succeed.
    await startAudio();
    setEntering(true);
    setTimeout(() => setEntered(true), 1000);
  };

  return (
    <>
      <style>{`
        .welcome-gate {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F4F4F3;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                      transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .welcome-gate.is-leaving {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        .welcome-glow {
          position: absolute;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, #EBE9FD 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .welcome-content {
          position: relative;
          z-index: 1;
          text-align: center;
          animation: fadeUpGate 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        .welcome-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4F3FF0;
          margin-bottom: 1.4rem;
        }

        .welcome-title {
          font-size: clamp(40px, 7vw, 80px);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0A0A0A;
          line-height: 1;
        }

        .welcome-sub {
          margin-top: 0.9rem;
          font-size: clamp(0.9rem, 1.4vw, 1.1rem);
          font-weight: 500;
          color: #101baf;
        }

        .enter-btn {
          margin-top: 2.6rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #0A0A0A;
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.95rem 2.2rem;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s;
        }
        .enter-btn:hover {
          background: #4F3FF0;
          transform: translateY(-2px);
        }
        .enter-btn:active {
          transform: translateY(0) scale(0.97);
        }
        .enter-btn svg {
          transition: transform 0.2s;
        }
        .enter-btn:hover svg {
          transform: translateX(3px);
        }

        .welcome-hint {
          margin-top: 1.2rem;
          font-size: 0.72rem;
          color: #4A4A4A;
          letter-spacing: 0.04em;
        }

        @keyframes fadeUpGate {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .portfolio-wrap {
          opacity: 0;
          transform: translateY(14px) scale(0.99);
          transition: opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s,
                      transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .portfolio-wrap.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      {!entered && (
        <div className={`welcome-gate ${entering ? "is-leaving" : ""}`}>
            <GLSLHills />
          <div className="welcome-glow" />
          <div className="welcome-content">
            <span className="welcome-tag">Portfolio</span>
            <h1 className="welcome-title">Only a slave quantifies its existence through productivity</h1>
            <p className="welcome-sub">Sadly I am One of them</p>
            <button className="enter-btn" onClick={handleEnter}>
              Enter
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="welcome-hint">Includes sound — best with audio on</p>
          </div>
        </div>
      )}

      <div className={`portfolio-wrap ${entered ? "is-visible" : ""}`}>
        {children}
      </div>
    </>
  );
}