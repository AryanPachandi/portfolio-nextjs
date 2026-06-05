"use client";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import globeImage from "@/components/utils/about/3d-globe.jpg";
import hero1Image from "@/components/utils/about/hero-1.jpg";
import hero2Image from "@/components/utils/about/hero-2.jpg";
import hero3Image from "@/components/utils/about/hero-3.jpg";
import heroSectionImage from "@/components/utils/about/hero-section-with-mesh-gradient.jpg";
import keyboardImage from "@/components/utils/about/keyboard-2.jpg";

export default function Projects() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <ParallaxHeroImages images={images} />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Hi, I&apos;m Aryan
        </h1>
        <p className="max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          I'm a B.Tech student and Full Stack Developer passionate about building scalable web applications and solving real-world problems through technology. I enjoy working across the stack, from creating intuitive user interfaces to designing robust backend systems, while continuously exploring cloud, DevOps, and emerging technologies.
        </p>
      </div>
    </div>
  );
}

const images = [
  heroSectionImage.src,
  globeImage.src,
  keyboardImage.src,
  hero1Image.src,
  hero2Image.src,
  hero3Image.src,
];
