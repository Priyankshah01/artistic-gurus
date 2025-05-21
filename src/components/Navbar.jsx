import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [activeSection, setActiveSection] = useState("hey");

  const sections = [
    { id: "hey", label: "Hey" },
    { id: "work", label: "Work" },
    { id: "story", label: "Story" },
    { id: "chat", label: "Chat" },
  ];

  useEffect(() => {
    const sections = [
      { id: "hey", label: "Hey" },
      { id: "work", label: "Work" },
      { id: "story", label: "Story" },
      { id: "chat", label: "Chat" },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;

      for (let { id } of sections) {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (
            scrollY >= offsetTop - 120 &&
            scrollY < offsetTop + offsetHeight - 120
          ) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="main-nav">
      <ul>
        {sections.map(({ id, label }) => (
          <li
            key={id}
            className={activeSection === id ? "active" : ""}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
