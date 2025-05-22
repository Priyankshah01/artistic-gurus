import React from "react";
import "./Project.css";
import giftelleLogo from "../images/schoolsys-ui.jpg";
import giftelleUI from "../images/giftelle-ui.jpg";
import schoolLogo from "../images/schoolsys-ui.jpg";
import schoolUI from "../images/giftelle-ui.jpg";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <section className="projects">
      <div className="projects-header">
        <span className="timeline-note">from 2020 ’til today</span>
        <h2>MY LATEST WORK</h2>
      </div>

      <ProjectCard
        tag="🎁 GIFTELLE"
        title="Smart Gifting Platform"
        description="Personalizing the gifting experience through curated choices, intelligent filters, and a smooth vendor-to-user journey."
        image1={giftelleLogo}
        image2={giftelleUI}
        link="/projects/giftelle"
      />

      <ProjectCard
        tag="🎓 SCHOOLSYS"
        title="School Registration System"
        description="A streamlined admin/student platform for digital course registration."
        image1={schoolLogo}
        image2={schoolUI}
        link="/projects/schoolsys"
      />
    </section>
  );
}

export default Projects;
