import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/navbar";
import { AudioProvider } from "@/contexts/audio-context";
import WelcomeGate from "@/components/welcome-gate";
import MusicPlayer from "@/components/musicplayer";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryanpachandi.space"),

  title: {
    default: "Aryan Pachandi | Full Stack Developer",
    template: "%s | Aryan Pachandi",
  },

  description:
    "Portfolio of Aryan Pachandi, Full Stack Developer specializing in React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, TypeScript and modern web technologies.",

  applicationName: "Aryan Pachandi",

  keywords: [
    "Aryan Pachandi",
    "Aryan",
    "Pachandi",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Software Engineer",
    "Web Developer",
  ],

  authors: [
    {
      name: "Aryan Pachandi",
      url: "https://aryanpachandi.space",
    },
  ],

  creator: "Aryan Pachandi",
  publisher: "Aryan Pachandi",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: "/icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryanpachandi.space",
    siteName: "Aryan Pachandi",
    title: "Aryan Pachandi | Full Stack Developer",
    description:
      "Portfolio of Aryan Pachandi showcasing projects, skills, experience, and modern web development expertise.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aryan Pachandi Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aryan Pachandi | Full Stack Developer",
    description:
      "Portfolio of Aryan Pachandi showcasing projects, skills, and modern web development.",

    creator: "@AryanPachandi", // remove if you don't have one

    images: ["/og-image.png"],
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "scroll-smooth",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body>
        <SmoothScroll />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AudioProvider>
            <Navbar />
            <WelcomeGate>{children}</WelcomeGate>
            <MusicPlayer />
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}