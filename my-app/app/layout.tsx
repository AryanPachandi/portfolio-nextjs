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

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Aryan Pachandi | Full Stack Developer",
  description:
    "Portfolio of Aryan Pachandi, a Full Stack Developer specializing in React, Next.js, Node.js, Express, MongoDB, PostgreSQL, and modern web applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <SmoothScroll />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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