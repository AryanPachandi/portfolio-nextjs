import Hero from "@/components/hero";

import  ProjectsScroll  from "@/components/ProjectsScroll";
import Footer from "@/components/footer";

import LightNavbar from "@/components/LigthNavbar";
import Skills from "@/components/skills";
import ContactDivider from "@/components/split";
import AboutSection from "@/components/aboutme"

import TerminalContact from "@/components/terminal";


export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <LightNavbar /> */}
      
      <Hero />
      <AboutSection/>
      <ProjectsScroll />
  
      {/* <Skills /> */}
      <ContactDivider />
      <section id="contact">
        <TerminalContact />
      </section>
      {/* <TerminalFooterDivider /> */}
      <Footer />
    </>
  
  );
}

