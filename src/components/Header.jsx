import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../assets/pngs/Hamberguer.svg";
import closeMenu from "../assets/svgs/closeMenu.svg";
import Cta from "../assets/videos/cta.mp4";


import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const Header = () => {
  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);

  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("");

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


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const closeMobileMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    setIsMobileMenuOpen(false);
  };

  const scrollToPortfolio = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".portfolio-section", true);
    setActiveSection("portfolio");
  };
  const scrollToHero = () => {
    closeMobileMenu();
    if (location.pathname !== "/") {
      navigate("/", { replace: true });  // 
    } else if(smootherRef.current) {
      smootherRef.current.scrollTo(".hero-section", true);
    };
  };

  const scrollToTeam = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".team-section", true);
    setActiveSection("team");
  };

  const scrollToServices = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".services-section", true);
    setActiveSection("services");
  };

  const scrollToTestimonials = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".testimonials-section", true);
    setActiveSection("testimonials");
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    smootherRef.current?.scrollTo(".order-section", true);
    setActiveSection("contact");
    closeMobileMenu();
  };

  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (
      !mobileMenuRef.current ||
      linksRef.current.length === 0 ||
      !buttonRef.current
    )
      return;

    const mobHeaderAnim = gsap.timeline({ paused: true });

    mobHeaderAnim
      .fromTo(
        mobileMenuRef.current,
        { height: "0" },
        { height: "100vh", duration: 1, ease: "power3.inOut" }
      )
      .fromTo(
        linksRef.current.filter(Boolean), // Ensure non-null elements
        { y: "1rem", opacity: 0 },
        {
          y: "0",
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.inOut",
        },
        "<0.5"
      )
      .fromTo(
        buttonRef.current,
        { y: "1rem", opacity: 0 },
        {
          y: "0",
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "<0.5"
      );

    if (isMobileMenuOpen) {
      mobHeaderAnim.play();
    } else {
      mobHeaderAnim.reverse();
    }
  }, [isMobileMenuOpen]);

  return (
    <header
            className={isMobileMenuOpen ? "mobile-menu-open" : ""}
            ref={mobileMenuRef}
          >
            <div className="box">
              <div className="header-content">
                <div onClick={scrollToHero} className="logo">
                  <div className="logo-box logo-box-1"></div>
                  <div className="logo-box logo-box-2"></div>
                  <div className="logo-box logo-box-3"></div>
                </div>
                <nav className="nav-box">
                  <p
                    onClick={scrollToPortfolio}
                    className={`${
                      activeSection === "portfolio" ? "active" : ""
                    }`}
                  >
                    PORTFOLIO
                  </p>
                  <p
                    onClick={scrollToTeam}
                    className={`${
                      activeSection === "team" ? "active" : ""
                    }`}
                  >
                    TEAM
                  </p>
                  <p
                    onClick={scrollToServices}
                    className={`${
                      activeSection === "services" ? "active" : ""
                    }`}
                  >
                    SERVICES
                  </p>
                  <p
                    onClick={scrollToTestimonials}
                    className={`${
                      activeSection === "testimonials" ? "active" : ""
                    }`}
                     
                  >
                    TESTIMONIALS
                  </p>
                  <p
                    onClick={scrollToContact}
                    className={`${
                      activeSection === "contact" ? "active" : ""
                    }`}
                     
                  >
                    CONTACT
                  </p>

                  {/* <a
                    href="#contact"
                    onClick={scrollToContact}
                    className={`${
                      activeSection === "contact" ? "active" : ""
                    }`}
                  >
                    CONTACT
                  </a> */}
                </nav>
                <div className="video-button-container">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-background"
                  >
                    <source src={Cta} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="btn-white-round-sm-outlined video-btn"
                    onClick={() =>
                      window.open(
                        "https://calendly.com/webexhaust/webexhaust",
                        "_blank"
                      )
                    }
                  >
                    BOOK A CALL
                  </button>
                </div>
                <div onClick={toggleMobileMenu} className="hamburger-menu">
                  {isMobileMenuOpen ? (
                    <img src={closeMenu} alt="Close Menu" />
                  ) : (
                    <img src={Menu} alt="Menu" />
                  )}
                </div>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="mobile-menu">
                <div className="box">
                  <div className="mobile-menu-grid">
                    <div className="mobile-menu-bottom">
                      <nav className="nav-box">
                        <p
                          ref={(el) => (linksRef.current[0] = el)}
                          onClick={scrollToPortfolio}
                          className={`${
                            activeSection === "portfolio" ? "active" : ""
                          } gruppo`}
                        >
                          PORTFOLIO
                        </p>
                        <p
                          ref={(el) => (linksRef.current[1] = el)}
                          onClick={scrollToTeam}
                          className={`${
                            activeSection === "team" ? "active" : ""
                          } gruppo`}
                        >
                          TEAM
                        </p>
                        <p
                          ref={(el) => (linksRef.current[2] = el)}
                          onClick={scrollToServices}
                          className={`${
                            activeSection === "services" ? "active" : ""
                          } gruppo`}
                        >
                          SERVICES
                        </p>
                        <p
                          ref={(el) => (linksRef.current[3] = el)}
                          onClick={scrollToTestimonials}
                          className={`${
                            activeSection === "testimonials" ? "active" : ""
                          } gruppo`}
                        >
                          TESTIMONIALS
                        </p>
                        <p
                          ref={(el) => (linksRef.current[4] = el)}
                          onClick={scrollToContact}
                          className="gruppo"
                        >
                          CONTACT
                        </p>
                        {/* <a
                          ref={(el) => (linksRef.current[4] = el)}
                          href="#contact"
                          onClick={scrollToContact}
                          className="gruppo"
                        >
                          CONTACT
                        </a> */}
                        <div className="video-button-container" ref={buttonRef}>
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="video-background"
                          >
                            <source src={Cta} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <button
                            className="btn-white-round-lg-outlined video-btn"
                            onClick={() =>
                              window.open(
                                "https://calendly.com/webexhaust/webexhaust",
                                "_blank"
                              )
                            }
                          >
                            BOOK A CALL
                          </button>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
  )
}

export default Header
