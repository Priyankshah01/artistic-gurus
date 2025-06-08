import React from "react";
import "./Footer.css";
import { FaEnvelope, FaBehance, FaDribbble, FaLinkedin, FaPaperPlane } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <FaEnvelope className="icon" />
          <a href="mailto:priyankshah0101@gmail.com">Priyank Shah</a>
        </div>

        <div className="footer-right">
          <a href="https://priyankshah0101.wixstudio.com/portfolio" target="_blank" rel="noreferrer"><FaPaperPlane /></a>
          <a href="https://www.behance.net/priyankshah0101" target="_blank" rel="noreferrer"><FaBehance /></a>
          {/* <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a> */}
          <a href="https://dribbble.com/Priyank7" target="_blank" rel="noreferrer"><FaDribbble /></a>
          {/* <a href="https://threads.net" target="_blank" rel="noreferrer"><FaThreads /></a> */}
          <a href="https://www.linkedin.com/in/shah-priyank/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
