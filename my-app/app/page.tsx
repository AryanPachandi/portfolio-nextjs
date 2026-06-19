import Hero from "@/components/hero";

import  ProjectsScroll  from "@/components/ProjectsScroll";
import Footer from "@/components/footer";

import AboutSection from "@/components/aboutme"

import TerminalContact from "@/components/terminal";
import MusicPlayer from "@/components/musicplayer";

export default function Home() {
  return (
    <>
      {/* <MusicPlayer /> */}
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
