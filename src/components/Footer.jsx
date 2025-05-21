import React from "react";
import "./Footer.css";
import { FaEnvelope, FaXTwitter, FaInstagram, FaDribbble, FaThreads, FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <FaEnvelope className="icon" />
          <a href="mailto:priyank@example.com">priyank@example.com</a>
        </div>

        <div className="footer-right">
          <a href="https://x.com" target="_blank" rel="noreferrer"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://dribbble.com" target="_blank" rel="noreferrer"><FaDribbble /></a>
          <a href="https://threads.net" target="_blank" rel="noreferrer"><FaThreads /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
