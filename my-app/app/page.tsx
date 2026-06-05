import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { ProjectsScroll } from "@/components/ProjectsScroll";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Form from "@/components/from";
import ContactForm from "@/components/from";
import LightNavbar from "@/components/LigthNavbar";

import TerminalContact from "@/components/terminal";
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
      <TerminalContact />
      <Footer />
    </>
  
  );
}

