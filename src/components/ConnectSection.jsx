import React, { useState } from "react";
import ConnectModal from "./ConnectModal"; // ✅ Make sure this import exists
import "./ConnectSection.css";

function ConnectSection() {
  const [isOpen, setIsOpen] = useState(false); // ✅ Add this state

  return (
    <section className="connect-section">
      <p className="connect-caption">
        Tap this 'tiny' button to<br />highlight your product =)
      </p>

      <button className="connect-button" onClick={() => setIsOpen(true)}>
        Connect
      </button>

      {/* ✅ Render modal conditionally based on state */}
      <ConnectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}

export default ConnectSection;
