"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; resize: () => void; destroy: () => void } | null = null;
    let rafId = 0;
    let idleId = 0;
    let cancelled = false;

    function raf(time: number) {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    let resizeObserver: ResizeObserver | null = null;
    const loadLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis();
      rafId = requestAnimationFrame(raf);

      resizeObserver = new ResizeObserver(() => {
        lenis?.resize();
      });
      resizeObserver.observe(document.body);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(loadLenis, { timeout: 1800 });
    } else {
      idleId = window.setTimeout(loadLenis, 1200);
    }

    const onLoad = () => lenis?.resize();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener("load", onLoad);
      lenis?.destroy();
    };
  }, []);

  return null;
}
