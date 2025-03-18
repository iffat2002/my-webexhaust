import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import projects from "../data/projects";

import Footer from "../components/Footer";
import Header from "../components/Header";

import EcoHousing from "../assets/pngs/EcoHousing.png";
import ArrowRight from "../assets/svgs/ArrowRight";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const Portfolio = () => {
  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);
  const [searchParams] = useSearchParams(); 
  const projectId = searchParams.get("id");
  const projectName = searchParams.get("project");

  const project = projects.find(
    (p) => p.id.toString() === projectId && p.title.toLowerCase() === projectName.toLowerCase()
  );

  const [activeTab, setActiveTab] = useState("overview");

  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const smootherRef = useRef(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      smoothTouch: 2,
      normalizeScroll: true,
      wheelSpeed: 2,
    });
    return () => smootherRef.current?.kill();
  }, []);

  const tabRef = useRef(null);

  useEffect(() => {
    if (tabRef.current) {
      gsap.fromTo(
        tabRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  
  if (!project) {
    return <div>Project not found!</div>; 
  }

  return (
    <div id="smooth-wrapperas">
      <div id="smooth-contentcd">
        <div className="webexhaust">
          <Header />
          <section className="portfolio">
            <div className="box">
              <div className="portfolio-content">
                <div className="portfolio-content-left">
                  <h2 className="gruppo">{project.title}</h2>
                  <div className="tabs">
                    <h5
                      className={activeTab === "overview" ? "active" : ""}
                      onClick={() => setActiveTab("overview")}
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      Overview
                    </h5>
                    <h5
                      className={activeTab === "project-goals" ? "active" : ""}
                      onClick={() => setActiveTab("project-goals")}
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      Project Goals
                    </h5>
                    <h5
                      className={activeTab === "design" ? "active" : ""}
                      onClick={() => setActiveTab("design")}
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      Design
                    </h5>
                    <h5
                      className={activeTab === "development" ? "active" : ""}
                      onClick={() => setActiveTab("development")}
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      Development
                    </h5>
                    <h5
                      className={activeTab === "feedback" ? "active" : ""}
                      onClick={() => setActiveTab("feedback")}
                      style={{ cursor: "pointer", userSelect: "none" }}
                    >
                      Feedback
                    </h5>
                  </div>
                  {activeTab === "overview" && (
                    <div className="overview active-tab" ref={tabRef}>
                      <div className="chips-container">
                        <h6>{project.overview.chips[0]}</h6>
                        <h6>{project.overview.chips[1]}</h6>
                        <h6>{project.overview.chips[2]}</h6>
                      </div>
                      <p>
                        {project.overview.description}
                      </p>
                      <div className="btns">
                        <button className="btn-icon-round-filled">
                          WEBSITE <ArrowRight color="#000000" />
                        </button>
                        <button className="btn-icon-round-outlined">
                          BEHANCE <ArrowRight color="#FFFFFF" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "project-goals" && (
                    <div className="project-goals active-tab" ref={tabRef}>
                      <h4 className="gruppo">{project.projectGoals.heading}</h4>
                      <ul>
                        <li>
                          {project.projectGoals.goals[0]}
                        </li>
                        <li>
                          {project.projectGoals.goals[1]}
                        </li>
                        <li>
                          {project.projectGoals.goals[2]}
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "design" && (
                    <div className="design active-tab" ref={tabRef}>
                      <h4 className="gruppo">{project.design.heading}</h4>
                      <p>
                        {project.design.description}
                      </p>
                    </div>
                  )}

                  {activeTab === "development" && (
                    <div className="development active-tab" ref={tabRef}>
                      <h4 className="gruppo">{project.development.heading}</h4>
                      <p>
                        {project.development.description}
                      </p>
                      <div className="chips-container">
                        <h6>{project.development.chips[0]}</h6>
                        <h6>{project.development.chips[1]}</h6>
                        <h6>{project.development.chips[2]}</h6>
                        <h6>{project.development.chips[3]}</h6>
                        <h6>{project.development.chips[4]}</h6>
                        <h6>{project.development.chips[5]}</h6>
                        <h6>{project.development.chips[6]}</h6>
                      </div>
                    </div>
                  )}

                  {activeTab === "feedback" && (
                    <div className="feedback active-tab" ref={tabRef}>
                      <h4 className="gruppo">Feedback</h4>
                      <div className="feedback-item">
                        <h6>{project.feedback[0].feedbackItem.subHeading}</h6>
                        <p>
                          {project.feedback[0].feedbackItem.feedbackText}
                        </p>
                      </div>
                      <div className="feedback-item">
                        <h6>{project.feedback[1].feedbackItem.subHeading}</h6>
                        <p>
                         {project.feedback[1].feedbackItem.feedbackText}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="portfolio-content-right">
                <img src={project.image} alt="" loading="lazy" />
                </div>
              </div>

              <div className="next">
                <h2 className="gruppo">
                  Next <br /> Project
                </h2>
                <ArrowRight />
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
