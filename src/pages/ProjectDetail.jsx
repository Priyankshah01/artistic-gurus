import React from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetail.css";
import giftelleImg from "../images/giftelle-ui.jpg";

function ProjectDetail() {
    const { slug } = useParams();

    if (slug !== "giftelle") {
        return <div style={{ padding: "4rem", textAlign: "center" }}>Project not found.</div>;
    }

    return (
        <div className="project-detail-page">
            <header className="project-header">
                <h1>Giftelle — Smart Gifting Platform</h1>
                <p className="subtitle">UI/UX Designer · Frontend Developer · 2024</p>
                <p className="summary">
                    Giftelle is a personalized gifting experience connecting users with local vendors.
                    I led the UX and frontend efforts to create a seamless, human-centered journey
                    from browsing to checkout.
                </p>
            </header>

            <section className="project-image-full">
                <img src={giftelleImg} alt="Giftelle full UI preview" />
            </section>

            <section className="project-section">
                <h2>🔍 The Challenge</h2>
                <p>
                    Most gifting platforms are cluttered, impersonal, and hard to navigate — users get overwhelmed with too many options.
                    Giftelle needed to deliver a curated, delightful, and efficient gifting experience while supporting small business vendors.
                </p>
            </section>

            <section className="project-section">
                <h2>💡 My Approach</h2>
                <ul>
                    <li>Conducted user interviews to identify pain points in gift discovery and checkout.</li>
                    <li>Sketched and wireframed key user flows: browsing, filtering, product detail, checkout.</li>
                    <li>Built the UI using Figma with a focus on personalization and mobile-first design.</li>
                    <li>Developed interactive components using React, CSS Grid, and Firebase backend.</li>
                </ul>
            </section>
            <section className="project-section">
                <h2>🖼️ Design Showcase</h2>

                {/* Section 1: 40% / 60% */}
                <div className="mockup-pair">
                    <div className="w40">
                        <img src={giftelleImg} alt="Wireframe 1" />
                    </div>
                    <div className="w60">
                        <img src={giftelleImg} alt="Wireframe 2" />
                    </div>
                </div>

                {/* Section 2: 60% / 40% */}
                <div className="mockup-pair">
                    <div className="w60">
                        <img src={giftelleImg} alt="UI Mockup 1" />
                    </div>
                    <div className="w40">
                        <img src={giftelleImg} alt="UI Mockup 2" />
                    </div>
                </div>

                {/* Section 3: 50% / 50% */}
                <div className="mockup-pair">
                    <div className="w50">
                        <img src={giftelleImg} alt="Dashboard View 1" />
                    </div>
                    <div className="w50">
                        <img src={giftelleImg} alt="Dashboard View 2" />
                    </div>
                </div>
            </section>



            <section className="project-section">
                <h2>🛠️ Tools & Tech</h2>
                <div className="tool-badges">
                    <span>Figma</span>
                    <span>React</span>
                    <span>CSS</span>
                    <span>Firebase</span>
                    <span>VS Code</span>
                    <span>GitHub</span>
                </div>
            </section>

            <section className="project-section">
                <h2>📈 Impact</h2>
                <p>
                    Giftelle significantly improved the gift selection process by making it faster, more thoughtful, and intuitive.
                    The UI earned strong feedback during testing for clarity and ease-of-use.
                    Vendors appreciated the dashboard simplicity and product management flow.
                </p>
            </section>
        </div>
    );
}

export default ProjectDetail;
