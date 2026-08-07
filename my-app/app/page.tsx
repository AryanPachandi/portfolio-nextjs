import Hero from "@/components/hero";

import  ProjectsScroll  from "@/components/ProjectsScroll";
import Footer from "@/components/footer";

import AboutSection from "@/components/aboutme"

import TerminalContact from "@/components/terminal";
import ExitIntentCapture from "@/components/exit-intent-capture";
import MusicPlayer from "@/components/musicplayer";

export default function Home() {
  return (
    <>
      {/* <MusicPlayer /> */}
      <ExitIntentCapture />
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="work">
        <ProjectsScroll />
      </section>

      <section id="contact">
        <TerminalContact />
      </section>

      <Footer />
    </>
  );
}
