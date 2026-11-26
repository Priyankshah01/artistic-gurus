import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollEffects from "@/components/ScrollEffects";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import { Skills } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
