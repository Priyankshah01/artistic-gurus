"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/data";

type Road = { d: string; width: number; height: number };

/* A dotted road through every stop marker, with an ink line drawn over it when the roadmap comes into view. */
export default function Experience() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [road, setRoad] = useState<Road>({ d: "", width: 1, height: 1 });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let dead = false;

    const measure = () => {
      if (dead) return;
      const box = map.getBoundingClientRect();
      const pts = [...map.querySelectorAll<HTMLElement>(".journey-stop-marker")].map((m) => {
        const r = m.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (pts.length < 2) return;
      const vertical = matchMedia("(max-width: 1000px)").matches;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        if (vertical) {
          const my = (a.y + b.y) / 2;
          d += ` C ${a.x + 28} ${my}, ${b.x - 20} ${my}, ${b.x} ${b.y}`;
        } else {
          const mx = (a.x + b.x) / 2;
          d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
        }
      }
      setRoad({ d, width: box.width, height: box.height });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(map);
    map.querySelectorAll(".journey-stop").forEach((s) => ro.observe(s));

    const io = new IntersectionObserver(
      ([e]) => {
        map.dataset.drawn = String(e.isIntersecting);
      },
      { threshold: 0.2 },
    );
    io.observe(map);

    measure();
    document.fonts.ready.then(measure);
    return () => {
      dead = true;
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="experience-section" data-fade>
      <div className="wrap">
        <div className="experience-heading">
          <h2>Experience.</h2>
          <p>
            Five years, from interfaces
            <br /> to whole products.
          </p>
        </div>

        <div ref={mapRef} className="journey-roadmap" data-drawn="false">
          <svg
            className="journey-road"
            viewBox={`0 0 ${road.width} ${road.height}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <path className="journey-road-base" d={road.d} />
            {/* keyed on the path so the draw animation restarts when the layout changes */}
            <path key={road.d} className="journey-road-ink" d={road.d} pathLength={1} />
          </svg>

          {experience.map((job, i) => {
            const id = `job-${job.org.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <article
                key={job.org}
                className={`journey-stop${i === 0 ? " journey-now" : ""}`}
                aria-labelledby={id}
              >
                <span className="journey-stop-marker" aria-hidden>
                  <span />
                </span>
                <div className="journey-stop-content">
                  <p className="journey-date">
                    {job.badge && <span className="journey-current">{job.badge}</span>}
                    {job.dates}
                  </p>
                  <h3 id={id}>{job.role}</h3>
                  <p className="journey-place">
                    {job.org}
                    {job.place && <span>{job.place}</span>}
                  </p>
                  <p className="journey-description">{job.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
