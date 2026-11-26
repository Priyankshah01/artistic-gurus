import { skills } from "@/lib/data";

/* ----------------------------------------------------------------- Skills */
export function Skills() {
  return (
    <section id="skills" className="skills-section" data-fade>
      <div className="wrap">
        <div className="skills-heading">
          <h2>Tech Stack</h2>
          <p>
            The tools behind
            <br /> my work.
          </p>
        </div>

        <div className="skills-specimens">
          {skills.map((g) => {
            const hid = `skills-${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <article key={g.title} className="skills-specimen" aria-labelledby={hid}>
                <h3 id={hid}>{g.title}</h3>
                <p className="skills-specimen-note">{g.subtitle}</p>
                <ul className="skills-type-mosaic">
                  {g.items.map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
