import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { ProjectsScroll } from "@/components/ProjectsScroll";
import Footer from "@/components/footer";

import Form from "@/components/from";
import ContactForm from "@/components/from";
import LightNavbar from "@/components/LigthNavbar";
import Skills from "@/components/skills";
import ContactDivider from "@/components/split";

import TerminalContact from "@/components/terminal";
import TerminalFooterDivider from "@/components/TerminalFooterDivider";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <LightNavbar />

      <Hero />
      
      <section id="about">
        <Projects />
      </section>

      <section id="work">
        <ProjectsScroll />
      </section>
      <Skills />
      <ContactDivider />
      <section id="contact">
        <TerminalContact />
      </section>
      <TerminalFooterDivider />
      <Footer />
    </>
  
  );
}

