import AboutSection from '@/components/About';
import Hero from '@/components/Hero';
// import Marquee from '@/components/Marquee';
import ProjectShowcase from '@/components/ProjectShowcase';
import Services from '@/components/Services';
import SkillsSection from '@/components/SkillsSection';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectShowcase />
      <AboutSection />
      <Services />
      <SkillsSection />
    </main>
  );
}
