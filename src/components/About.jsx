import React from "react";
import "./About.css";
import image1 from "../images/giftelle-ui.jpg";
import image2 from "../images/giftelle-ui.jpg";
import image3 from "../images/giftelle-ui.jpg";
import logos from "./logos";
function About() {
    return (
        <section className="about-grid">
            <h2 className="about-title">
                I DON'T HAVE DARK SECRETS,<br />ONLY BRIGHT ONES
            </h2>

            <div className="about-block">
                <div className="about-card text">
                    <p>
                        I grew up loving both art and tech — sketching in notebooks while exploring early websites. Design felt like home: part logic, part emotion.
                        <br /><br />
                        Today, I bring that blend into every project — combining intuitive user experience with sleek interface visuals.
                    </p>
                </div>

                <div className="slideshow-container">
                    <div className="slideshow-track">
                        <img src={image1} alt="Project 1" />
                        <img src={image2} alt="Project 2" />
                        <img src={image3} alt="Project 3" />

                        
                        <img src={image1} alt="Project 1 repeat" />
                        <img src={image2} alt="Project 2 repeat" />
                        <img src={image3} alt="Project 3 repeat" />
                    </div>
                </div>

            </div>
            <div className="card-stack">
                <div className="about-card stack-icons">
                    <h4>Tech Stack</h4>
                    <div className="tech-icons">
                        {Object.entries(logos).map(([name, logo]) => (
                            <div className="tech-icon-wrapper" key={name}>
                                <img src={logo} alt={name} data-tooltip={name} />
                                <span className="tech-tooltip">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="about-card text">
                    <p>
                        I partner with startups and teams who believe in clarity, speed, and design that communicates.
                        <br /><br />
                        My tools: Figma, React, Illustrator, and most importantly — questions. Great design starts with listening.
                    </p>
                </div>
            </div>
        </section >
    );
}

export default About;
