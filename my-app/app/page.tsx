import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { ProjectsScroll } from "@/components/ProjectsScroll";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Form from "@/components/from";
import ContactForm from "@/components/from";
export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      
      <section id="about">
        <Projects />
      </section>

      <section id="work">
        <ProjectsScroll />
      </section>

       <section  id="contact" className="flex min-h-screen items-center justify-center px-6 py-20">
         <ContactForm />
       </section>
      <Footer />
    </>
  
  );
}

