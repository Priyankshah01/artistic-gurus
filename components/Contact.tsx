"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/lib/data";
import { ArrowUpRight, Check, Copy, socialIcon } from "./Icons";
import WaveText, { WaveIcon } from "./WaveText";

type CopyState = "idle" | "copied" | "failed";

export default function Contact() {
  const [copy, setCopy] = useState<CopyState>("idle");
  const [draft, setDraft] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 3000);
  };

  // No backend: build a mailto draft and offer a link that opens it in the visitor's mail app.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form?.reportValidity()) return;
    const f = new FormData(form);
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\n\n${f.get("project")}`;
    setDraft(
      `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio inquiry")}&body=${encodeURIComponent(body)}`,
    );
  };

  return (
    <section id="contact" className="contact-section" data-fade>
      <div className="wrap">
        <div className="contact-layout">
          <div className="contact-opening">
            <h2>Let&rsquo;s talk.</h2>
            <p>{profile.availability}</p>

            <div className="contact-details">
              <div className="email-block">
                <a className="email-link wave-target" href={`mailto:${profile.email}`}>
                  <WaveText>{profile.email}</WaveText>
                  <ArrowUpRight size={20} />
                </a>
                <button
                  type="button"
                  className="wave-target icon-button copy-email"
                  onClick={copyEmail}
                  aria-label={copy === "copied" ? "Email copied" : "Copy email address"}
                >
                  <WaveIcon>{copy === "copied" ? <Check size={18} /> : <Copy size={18} />}</WaveIcon>
                </button>
              </div>
              <span className="copy-status" role="status">
                {copy === "copied" ? "Email copied" : copy === "failed" ? "Please use the email link" : ""}
              </span>
            </div>

            <div className="social-links">
              {socials.map((s) => (
                <a key={s.label} className="wave-target" href={s.href} target="_blank" rel="noopener noreferrer">
                  <span className="platform-logo">{socialIcon(s.icon, 18)}</span>
                  <WaveText>{s.label}</WaveText>
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            className="contact-form"
            action={`mailto:${profile.email}`}
            method="post"
            encType="text/plain"
            onSubmit={onSubmit}
            onChange={() => setDraft("")}
          >
            <div className="contact-field">
              <label htmlFor="inquiry-name">Your name</label>
              <input id="inquiry-name" name="name" placeholder="What should I call you?" autoComplete="name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="inquiry-email">Email address</label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="contact-field contact-message">
              <label htmlFor="inquiry-project">What do you have in mind?</label>
              <textarea
                id="inquiry-project"
                name="project"
                placeholder="A little about your role, project or idea…"
                rows={4}
                required
              />
            </div>
            <div className="contact-submit">
              <button className="button draft-button wave-target" type="submit">
                <WaveText>Create email draft</WaveText>
                <ArrowUpRight size={22} />
              </button>
            </div>
            {draft && (
              <div className="draft-ready" role="status">
                <p>Your draft is ready.</p>
                <a className="draft-link wave-target" href={draft}>
                  <WaveText>Open in email app</WaveText>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
