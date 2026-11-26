import Image from "next/image";
import { profile } from "@/lib/data";
import Hero from "./Hero";
import { ArrowUpRight } from "./Icons";
import PortraitJourney from "./PortraitJourney";
import WaveText, { WaveIcon } from "./WaveText";

/**
 * Hero + biography share one section so a single photo card can travel
 * from the hero portrait into the biography portrait while scrolling.
 */
export default function About() {
  return (
    <section id="about" className="about-section" aria-label="About">
      <PortraitJourney />
      <Hero />

      <div className="biography wrap">
        <div className="bio-introduction" data-fade>
          <h2>
            Hi, I&rsquo;m
            <br /> {profile.shortName}.
          </h2>
          <p className="bio-role">
            <span>{profile.role[0]}</span>
            <span>{profile.role[1]}</span>
          </p>
          <div className="bio-current">
            <span>Currently at</span>
            <p>
              <strong>{profile.current.company}</strong>
              <br />
              {profile.current.role}
              <br />
              <span>{profile.location}</span>
            </p>
          </div>
        </div>

        <figure className="bio-portrait">
          <Image src={profile.photo} alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 700px) 100vw, 440px" />
        </figure>

        <div className="bio-description" data-fade>
          <p className="bio-lead">
            I <strong>design products</strong> and <strong>ship them in React</strong>, from user research to
            production, across commerce and healthcare.
          </p>
          <div className="bio-actions">
            <a href="#projects" className="bio-projects wave-target">
              <WaveText>Explore projects</WaveText>
              <WaveIcon>
                <ArrowUpRight size={18} />
              </WaveIcon>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
