import React from "react";
import "./Project.css";
import giftelleImg from "../images/giftelle-ui.jpg";
import schoolSysImg from "../images/giftelle-ui.jpg";
import ProjectCards from "./ProjectCard";

function Projects() {
  return (
    <section className="projects">
      <div className="projects-header">
                  <span className="timeline-note">from 2020 ’til today</span>

        <h2>
          MY LATEST WORK
        </h2>
      </div>

      <ProjectCards
        tag="🎁 GIFTELLE"
        title="Smart Gifting Platform"
        description="Personalizing the gifting experience through curated choices, intelligent filters, and a smooth vendor-to-user journey."
        image={giftelleImg}
        link="/projects/giftelle"
      />

      {/* You can add more project cards like this 👇 */}
      {/* <ProjectCard ... /> */}

      <ProjectCards
        tag="🎓 SCHOOLSYS"
        title="School Registration System"
        description="A streamlined admin/student platform for digital course registration."
        image={schoolSysImg}
        link="/projects/schoolsys"
      />

    </section>
  );
}

export default Projects;
