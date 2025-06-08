import React from "react";
import "./ExperienceTimeline.css";

import halo from "../logos/halo.png";
import heartbeat from "../logos/heartbeat.png";
import ooze from "../logos/ooze.png";
import oodesign from "../logos/oo-design.png";
import clerk from "../logos/clerk.png";

const companies = [
  { name: "Halo Lab", logo: halo },
  { name: "Heartbeat", logo: heartbeat },
  { name: "Ooze", logo: ooze },
  { name: "OO design", logo: oodesign },
  { name: "Clerk", logo: clerk },
];

function ExperienceTimeline() {
  return (
    <section className="timeline-section">
      <div className="timeline-track">
        {companies.map((company, index) => (
          <div key={index} className="timeline-point">
            <img src={company.logo} alt={company.name} />
            <p>{company.name}</p>
          </div>
        ))}
      </div>

      <div className="timeline-svg-wrapper">
        <svg
          className="timeline-svg"
          viewBox="0 0 1000 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
            </marker>
          </defs>

          {/* Curved timeline path */}
          <path
            d="M 50 100 Q 200 50, 350 100 T 650 100 T 950 100"
            fill="none"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
          />

          {/* Year labels */}
          <text x="10" y="130" fontSize="16" fontFamily="Comic Sans MS" fill="#444">
            2020
          </text>
          <text x="960" y="130" fontSize="16" fontFamily="Comic Sans MS" fill="#444">
            now
          </text>
        </svg>
      </div>
    </section>
  );
}

export default ExperienceTimeline;
