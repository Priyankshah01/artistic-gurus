import Image from "next/image";
import { experience, profile, projects, skills, socials } from "@/lib/data";
import GlyphBackground from "./GlyphBackground";
import Typed from "./Typed";

const q = (s: string) => JSON.stringify(s);
const id = profile.shortName.toLowerCase();

// The profile, written as code. It becomes the glowing hero background.
const heroCode = `const ${id} = {
  name: ${q(profile.name)},
  role: ${q(profile.role.join(" ").replace(".", ""))},
  based: ${q(profile.location)},
  focus: ["Product design", "Design systems", "Production React"],
  experience: [
${experience.map((j) => `    { role: ${q(j.role)},\n      company: ${q(j.org)}, dates: ${q(j.dates)} },`).join("\n")}
  ],
  projects: {
${projects.map((p) => `    ${q(p.title)}: ${q(p.category)},`).join("\n")}
  },
  skills: {
${skills.map((g) => `    ${q(g.title)}: [${g.items.map((i) => q(i.name)).join(", ")}],`).join("\n")}
  },
  email: ${q(profile.email)},
${socials
  .filter((s) => s.icon !== "resume")
  .map((s) => `  ${s.icon}: ${q(s.href)},`)
  .join("\n")}
};

export default function Portfolio() {
  return <main>
    <header><h1>{${id}.name}</h1><p>{${id}.role}</p></header>
    <section><h2>Selected work</h2>
      {Object.entries(${id}.projects).map(([name, detail]) =>
        <article key={name}><h3>{name}</h3><p>{detail}</p></article>)}
    </section>
    <section><h2>How I work</h2>
      <ol><li>Design: start with the problem, prove it with users</li>
        <li>Code: design systems in Figma and in React</li>
        <li>Bridge: what ships is what was designed</li></ol>
    </section>
    <section><h2>Experience</h2>
      {${id}.experience.map(job => <article key={job.role}>
        <h3>{job.role}</h3><p>{job.company}</p>
        <small>{job.dates}</small>
      </article>)}
    </section>
    <section><h2>Toolkit</h2>
      {Object.entries(${id}.skills).map(([group, tools]) =>
        <div key={group}><h3>{group}</h3><p>{tools.join(", ")}</p></div>)}
    </section>
    <footer><a href={"mailto:" + ${id}.email}>Let's talk.</a></footer>
  </main>;
}`;

function Letters({ text, from, offset = 0 }: { text: string; from: "below" | "above"; offset?: number }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="hero-letter-window">
          <span className={`hero-letter from-${from}`} style={{ "--i": i + offset } as React.CSSProperties}>
            {c}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [l1, l2] = profile.heroTitle;
  return (
    <div id="top" className="hero wrap">
      <GlyphBackground code={heroCode} />

      <a href="#about" className="hero-portrait" aria-label="About me">
        <Image src={profile.photo} alt={profile.name} fill priority sizes="320px" />
      </a>

      <div className="hero-heading">
        <h1 className="hero-title" aria-label={`${l1} ${l2}`}>
          <span className="title-line" aria-hidden>
            <span className="hero-word">
              <span className="hero-code-mark hero-code-open">
                <svg viewBox="20 0 110 160" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="square">
                  <path opacity=".16" d="M105 30 48 80 105 130" transform="translate(5 6)" />
                  <path d="M105 30 48 80 105 130" />
                </svg>
              </span>
              <Letters text={l1} from="below" />
            </span>
          </span>
          <span className="title-line" aria-hidden>
            <span className="hero-word">
              <Letters text={l2} from="above" offset={l1.length} />
              <span className="hero-code-mark hero-code-close">
                <svg viewBox="0 0 180 160" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="square">
                  <path opacity=".16" d="M65 30 25 130M100 30 157 80 100 130" transform="translate(5 6)" />
                  <path d="M65 30 25 130M100 30 157 80 100 130" />
                </svg>
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-footer">
        <span className="hero-year">©{profile.year}</span>
        <span className="hero-focus">
          {"{{ "}
          <Typed text={profile.heroTag} />
          {" }}"}
        </span>
      </div>
    </div>
  );
}
