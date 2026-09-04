import { getPortfolioData } from "@/lib/data";
import Hero from "@/components/hero";
import ProjectsScroll from "@/components/ProjectsScroll";
import Footer from "@/components/footer";
import AboutSection from "@/components/aboutme";
import TerminalContact from "@/components/terminal";
import ExitIntentCapture from "@/components/exit-intent-capture";

export const revalidate = 0; // Ensure live updates on portfolio changes

export default async function Home() {
  const { settings, socials, projects, experiences, skills, education } = await getPortfolioData();

  return (
    <>
      <ExitIntentCapture />

      <section id="hero">
        <Hero settings={settings} socials={socials} />
      </section>

      <section id="about">
        <AboutSection
          settings={settings}
          experiences={experiences}
          skills={skills}
          education={education}
        />
      </section>

      <section id="work">
        <ProjectsScroll projects={projects} />
      </section>

      <section id="contact">
        <TerminalContact />
      </section>

      <Footer settings={settings} socials={socials} />
    </>
  );
}
