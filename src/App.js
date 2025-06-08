import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProjectNavbar from "./components/ProjectNavbar";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";
// import Connect from "./components/ConnectModal";
import ExperienceTimeline from "./components/ExperienceTimeline";


import ProjectDetail from "./pages/ProjectDetail";

function AppWrapper() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/projects/");

  return (
    <>
      {isProjectPage ? <ProjectNavbar /> : <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section id="hey"><Hero /></section>
              <section id="work"><Projects /></section>
              <section id="story"><About /></section>
              <section id="experience"><ExperienceTimeline /></section>
              <section id="chat"><ConnectSection /></section>
              <Footer />
            </>
          }
        />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
