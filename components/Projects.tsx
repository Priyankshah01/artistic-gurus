"use client";

import { useEffect, useRef, useState } from "react";
import { projects, socials, type CaseStudy, type Project } from "@/lib/data";
import { ArrowRight, ArrowUpRight, Close, FileText } from "./Icons";
import WaveText, { WaveIcon } from "./WaveText";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------ folder card */
function Folder({ p, selected, onOpen }: { p: Project; selected: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="project-folder"
      data-folder-id={p.id}
      aria-expanded={selected}
      aria-controls="project-details-panel"
      onClick={onOpen}
      // tilt toward the cursor
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--folder-lean", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
      }}
      onPointerLeave={(e) => e.currentTarget.style.setProperty("--folder-lean", "0deg")}
    >
      <span className="sr-only">{p.title}</span>
      <span className="folder-scene" aria-hidden>
        <span className="folder-back" />
        <span className="folder-paper folder-paper-back">
          <FileText size={18} />
          <span>Case study overview</span>
          <span className="folder-paper-lines" />
        </span>
        <span className="folder-paper folder-paper-preview">
          <span className="folder-case-preview">
            <span>{p.preview.eyebrow}</span>
            <strong>
              {p.preview.headline[0]}
              <br />
              {p.preview.headline[1]}
            </strong>
            <span>{p.preview.footnote}</span>
          </span>
          <span>{p.title}</span>
        </span>
        <span className="folder-paper folder-paper-front">
          <FileText size={18} />
          <span>Role, process & impact</span>
          <span className="folder-paper-lines" />
        </span>
        <span className="folder-front">
          <span className="folder-front-title">{p.title}</span>
          <span className="folder-open-icon">
            <ArrowUpRight size={20} />
          </span>
        </span>
      </span>
      <span className="folder-caption">
        <span>{p.category}</span>
        <span className="folder-caption-action">
          Read case study <ArrowUpRight size={14} />
        </span>
      </span>
    </button>
  );
}

/* ---------------------------------------------------- case study layout */
function CaseStudyView({ c, active }: { c: CaseStudy; active: boolean }) {
  return (
    <article hidden={!active} className="project-study case-study" aria-labelledby={`${c.id}-title`}>
      <div className="case-study-overview study-content">
        <h3 id={`${c.id}-title`}>{c.title}</h3>
        <p className="project-category">{c.category}</p>
        <p className="case-study-summary">{c.summary}</p>
        <dl className="case-study-facts">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="case-study-privacy">{c.note}</p>
      </div>

      <div className="case-study-narrative">
        <section className="case-study-section" aria-labelledby={`${c.id}-challenge`}>
          <h4 id={`${c.id}-challenge`}>The challenge</h4>
          <p>{c.challenge}</p>
        </section>
        <section className="case-study-section" aria-labelledby={`${c.id}-approach`}>
          <h4 id={`${c.id}-approach`}>My approach</h4>
          <ol className="case-study-delivery">
            {c.approach.map((s) => (
              <li key={s.title}>
                <h5>{s.title}</h5>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="case-study-section" aria-labelledby={`${c.id}-impact`}>
          <h4 id={`${c.id}-impact`}>The impact</h4>
          <p>{c.impact}</p>
          {c.stats && (
            <div className="case-study-impact" role="group" aria-label="Key numbers">
              {c.stats.map((s, i) => (
                <div key={s.label} style={{ display: "contents" }}>
                  {i > 0 && <ArrowRight size={22} />}
                  <dl>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </dl>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- section */
export default function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const behance = socials.find((s) => s.icon === "behance")!;

  const reveal = () => {
    panelRef.current?.focus({ preventScroll: true });
    panelRef.current?.scrollIntoView({ behavior: reduceMotion() ? "instant" : "smooth", block: "start" });
  };

  // when a project opens: expand its details and bring the panel into view
  useEffect(() => {
    if (!open || !panelRef.current) return;
    panelRef.current.querySelectorAll<HTMLDetailsElement>("article:not([hidden]) details").forEach((d) => (d.open = true));
    reveal();
  }, [open]);

  const close = () => {
    const btn = sectionRef.current?.querySelector<HTMLButtonElement>(`[data-folder-id="${open}"]`);
    setOpen(null);
    btn?.focus();
  };

  const current = projects.find((p) => p.id === open);

  return (
    <section ref={sectionRef} id="projects" className="projects-section wrap" data-fade>
      <div className="section-heading">
        <h2>
          Featured <br />
          Projects
        </h2>
        <a href={behance.href} target="_blank" rel="noopener noreferrer" className="text-link wave-target">
          <WaveText>Behance</WaveText> <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="projects-intro">
        Shipped products and self-initiated work. Open a folder to explore a project or case study.
      </p>

      <div className="project-folder-grid">
        {projects.map((p) => (
          <Folder
            key={p.id}
            p={p}
            selected={open === p.id}
            onOpen={() => {
              setOpen(p.id);
              if (p.id === open) reveal();
            }}
          />
        ))}
      </div>

      <div
        ref={panelRef}
        id="project-details-panel"
        className="project-details-panel"
        hidden={!open}
        tabIndex={-1}
        role="region"
        aria-labelledby={open ? `${open}-title` : undefined}
      >
        <div className="project-panel-toolbar">
          <span>{current?.professional ? "Professional case study" : "Project case study"}</span>
          <button type="button" className="wave-target icon-button" onClick={close} aria-label="Close project details">
            <WaveIcon>
              <Close size={20} />
            </WaveIcon>
          </button>
        </div>
        <div className="project-studies">
          {projects.map((p) => (
            <CaseStudyView key={p.id} c={p} active={open === p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
