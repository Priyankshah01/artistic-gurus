import React from "react";
import "./ProjectCard.css";

function ProjectCard({ tag, title, description, image, link }) {
  return (
    <div className="work-tile" data-aos="fade-up" data-aos-duration="800">
      <div className="tile-header">
        <span className="tile-tag">{tag}</span>
        <a href={link} className="tile-arrow">→</a>
      </div>

      <h3 className="tile-title">{title}</h3>
      <p className="tile-description">{description}</p>

      <div className="tile-image">
        <div className="tile-img-wrapper">
          <img src={image} alt={`${title} preview`} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
