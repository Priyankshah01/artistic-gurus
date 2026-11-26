import { profile } from "@/lib/data";
import { ArrowUp, ArrowUpRight } from "./Icons";
import WaveText from "./WaveText";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: profile.resume },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap" data-fade>
        <div className="footer-identity">
          <h2>{profile.shortName}.</h2>
          <p>
            {profile.role[0]}
            <br />
            {profile.role[1]}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p>Explore</p>
          <div>
            {links.map((l) => (
              <a
                key={l.href}
                className="wave-target"
                href={l.href}
                {...(l.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <WaveText>{l.label}</WaveText>
              </a>
            ))}
          </div>
        </nav>
        <div className="footer-contact">
          <p>Get in touch</p>
          <a className="wave-target" href={`mailto:${profile.email}`}>
            <WaveText>{profile.email}</WaveText>
            <ArrowUpRight size={16} />
          </a>
          <span>
            © {profile.year} {profile.name}
          </span>
        </div>
      </div>

      <div className="footer-finale">
        <div className="footer-finale-heading wrap">
          <p>See you around.</p>
          <a href="#top">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
        <div className="footer-name-band" aria-hidden>
          <span className="footer-name">{profile.shortName.toUpperCase()}.</span>
        </div>
        <div className="footer-scene-bottom wrap">
          <small>Designed with intention. Built with precision.</small>
          <small>{profile.location}</small>
        </div>
      </div>
    </footer>
  );
}
