import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectNavbar.css";

function ProjectNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="project-nav">
      <button className="close-btn" onClick={() => navigate("/")}>×</button>
      <div className="cta-pill">
        <span>Start new project</span>
      </div>
    </nav>
  );
}

export default ProjectNavbar;
