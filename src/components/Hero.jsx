import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" data-aos="fade-up" data-aos-duration="1000">
      <div className="hero-text">
        <p className="hero-greeting">
          Howdy! Meet a UI/UX developer who bridges creativity and logic.<br />
          I turn complex challenges into simple, measurable experiences.
        </p>
        <h1 className="hero-name">PRIYANK SHAH</h1>
      </div>
      {/* // Add this inside your Hero.jsx, just below the hero-name h1 */}
      <a href="/path-to-your-resume.pdf" download className="resume-download-btn">
        <span className="resume-text">Download</span>
        <span className="resume-subtext">Resume</span>
      </a>
    </section>
  );
}

export default Hero;
