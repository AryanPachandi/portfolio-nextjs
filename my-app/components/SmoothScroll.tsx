"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Re-measure scroll height whenever the document's size changes
    // (images loading, fonts swapping, sections mounting, etc.)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    // Catch the "everything has fully loaded" moment too
    const onLoad = () => lenis.resize();
    window.addEventListener("load", onLoad);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", onLoad);
      lenis.destroy();
    };
  }, []);

  return null;
}