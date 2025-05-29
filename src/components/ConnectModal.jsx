import React, { useState } from "react";
import "./Connect.css";

function ConnectModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setStatus(`Error: ${data.message || "Failed to send message."}`);
      }
    } catch (err) {
      setStatus("Error: Could not send message.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Let’s build something together 🤝</h2>
        <p className="connect-subtext">
          I’m always open to new ideas, freelance work, or a coffee chat.
        </p>

        <form className="connect-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Tell me a bit about your project..."
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
}

export default ConnectModal;
