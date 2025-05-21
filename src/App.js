import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section id="hey">
          <Hero />
        </section>

        <section id="work">
          <Projects />
        </section>

        <section id="story">
          <About />
        </section>

        <section id="chat">
          <ConnectSection />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
