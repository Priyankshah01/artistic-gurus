import React from "react";
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";

function ProjectCard({ tag, title, description, image1, image2, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      className="work-tile"
      data-aos="fade-up"
      data-aos-duration="800"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="tile-header">
        <span className="tile-tag">{tag}</span>
        <span className="tile-arrow">→</span>
      </div>

      <h3 className="tile-title">{title}</h3>
      <p className="tile-description">{description}</p>

      <div className="tile-image double-image">
        <div className="tile-img-wrapper tilt-right right">
          <img src={image1} alt={`${title} logo`} />
        </div>
        <div className="tile-img-wrapper tilt-left left">
          <img src={image2} alt={`${title} mockup`} />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
