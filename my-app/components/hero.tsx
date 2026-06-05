"use client";
// import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
import Herotext from "@/components/herotext";
// import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
// import {GithubIcon}  from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

const WebcamPixelGrid = dynamic(
  () =>
    import("@/components/ui/webcam-pixel-grid").then(
      (mod) => mod.WebcamPixelGrid
    ),
  {
    ssr: false,
  }
);
export default function Hero() {
 const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  return (

    <div className="relative h-screen w-screen bg-black overflow-hidden">
     

      {/* Webcam pixel grid background */}
      <div className="absolute inset-0">
      {mounted ? (
    <WebcamPixelGrid
      gridCols={60}
      gridRows={40}
      maxElevation={50}
      motionSensitivity={0.25}
      elevationSmoothing={0.2}
      colorMode="webcam"
      backgroundColor="#030303"
      mirror={true}
      gapRatio={0.05}
      invertColors={false}
      darken={0.6}
      borderColor="#ffffff"
      borderOpacity={0.06}
      className="w-full h-full"
      onWebcamReady={() => console.log("Webcam ready!")}
      onWebcamError={(err) => console.error("Webcam error:", err)}
    />
  ) : (
    <div className="w-full h-full bg-black" />
  )}
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
            Portfolio &rarr;
          </div>

          {/* Title */}
          {/* <h1 className="mb-6 text-xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
          
          
          </h1> */}
          <Herotext />

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 sm:text-xl">
          Explore my journey as a Full Stack Developer, featuring projects, technical skills, and experiences that turn ideas into scalable applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button  onClick={() => window.open("/Resume (5).pdf", "_blank")} className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-medium text-black transition-all hover:bg-white/90 hover:scale-105">
              Download Resume
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
       
            <a
  href="https://github.com/AryanPachandi"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
>
  <IconBrandGithub size={18} />
  View Projects
</a>
          </div>
        </div>

        {/* Scroll indicator */}
        
      </div>
      
    </div>
    

  );
}
