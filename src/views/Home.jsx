import React from "react";
import { useEffect, useRef, useState } from "react";
import LogoGif from "../assets/videos/LogoGif.mp4";
import Saim12 from "../assets/pngs/Saim121.jpg";
import Laib12 from "../assets/pngs/laiba12.png";
import TeamPic3 from "../assets/pngs/aiza-pp.png";
import TeamPic4 from "../assets/pngs/usama-pp.png";
import TeamPic5 from "../assets/pngs/shahram-pp.png";
import TeamPic6 from "../assets/pngs/Iffat.png";
import Menu from "../assets/pngs/Hamberguer.svg";
import InfinityImg from "../assets/pngs/Infinity-img.png";
import ArrowImg from "../assets/pngs/arrow-img.png";
import PortfolioImg4 from "../assets/pngs/portfolio-img-4.png";
import PortfolioImg7 from "../assets/pngs/portfolio-img-7.png";
import PortfolioImg8 from "../assets/pngs/portfolio-img-6.png";
import PortfolioImg10 from "../assets/pngs/portfolio-img-10.png";
import PortfolioVideo1 from "../assets/videos/portfolio-video-1.mp4";
import PortfolioVideo5 from "../assets/pngs/portfolio-img-8.png";
import PortfolioImg11 from "../assets/pngs/portfolio-img-12.png";
import PortfolioVideo6 from "../assets/videos/portfolio-video-11.mp4";
import brandIdentity from "../assets/pngs/serviceItem1.png";
import Strategy from "../assets/pngs/serviceItem2.png";
import ServiceItem3 from "../assets/pngs/serviceItem3.png";
import ServiceItem4 from "../assets/pngs/serviceItem4.png";
import ServiceItem5 from "../assets/pngs/serviceItem5.png";
import ServiceItem6 from "../assets/pngs/serviceItem6.png";

import closeMenu from "../assets/svgs/closeMenu.svg";
import Cta from "../assets/videos/cta.mp4";

import Logo11 from "../assets/pngs/logos/recurofy.png";
import Logo12 from "../assets/pngs/logos/sdeviants.png";
import Logo13 from "../assets/pngs/logos/stonk-skins.png";
import Logo14 from "../assets/pngs/logos/stx-tools.png";
import Logo15 from "../assets/pngs/logos/takeouts.png";
import Logo16 from "../assets/pngs/logos/tcn.png";
import Logo17 from "../assets/pngs/logos/ibook.png";
import Logo18 from "../assets/pngs/logos/myaibody.png";
import Logo19 from "../assets/pngs/logos/equal-iq.png";
import Logo20 from "../assets/pngs/logos/uptrend.png";
import Logo21 from "../assets/pngs/logos/hitpikr.png";

import WebexhaustLogoBoxes from "../assets/svgs/WebexhaustLogoBoxes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/effect-flip";
import "swiper/css/effect-creative";
import { Autoplay } from "swiper/modules";

import Matter from "matter-js";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import WorldMap from "../assets/svgs/WorldMap";
import ArrowRight from "../assets/svgs/ArrowRight";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  gsap.registerPlugin(Flip, ScrollTrigger, ScrollSmoother);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    services: [],
    budget: "",
    timeline: "",
    description: "",
  });

  const [activeSection, setActiveSection] = useState("");

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const labelText =
        e.target.nextElementSibling.querySelector("p").textContent;
      setFormData((prevData) => {
        const services = e.target.checked
          ? [...prevData.services, labelText]
          : prevData.services.filter((service) => service !== labelText);
        return { ...prevData, services };
      });
    } else if (type === "radio") {
      const labelText = e.target.nextElementSibling.textContent.trim();
      setFormData((prevData) => ({
        ...prevData,
        [name]: labelText,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleProjectClick = (id, projectName) => {
    navigate(`/portfolio?id=${id}&project=${projectName}`);
  };

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

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    return () => {
      if (sceneRef.current) {
        observer.unobserve(sceneRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let engine;
    let render;
    let runner;
    let mouseConstraint;

    const resizeCanvas = () => {
      const box = sceneRef.current;
      const width = box.offsetWidth;
      const height = box.offsetHeight;

      Matter.Render.lookAt(renderRef.current, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      renderRef.current.canvas.width = width;
      renderRef.current.canvas.height = height;

      if (boundaries) {
        Matter.Body.setPosition(boundaries.top, { x: width / 2, y: -15 });
        Matter.Body.setPosition(boundaries.bottom, {
          x: width / 2,
          y: height - 60,
        });
        Matter.Body.setPosition(boundaries.left, { x: -15, y: height / 2 });
        Matter.Body.setPosition(boundaries.right, {
          x: width + 15,
          y: height / 2,
        });

        Matter.Body.scale(
          boundaries.top,
          width / boundaries.top.bounds.max.x,
          1
        );
        Matter.Body.scale(
          boundaries.bottom,
          width / boundaries.bottom.bounds.max.x,
          1
        );
        Matter.Body.scale(
          boundaries.left,
          1,
          height / boundaries.left.bounds.max.y
        );
        Matter.Body.scale(
          boundaries.right,
          1,
          height / boundaries.right.bounds.max.y
        );
      }
    };

    let boundaries;

    if (isInView) {
      engine = Matter.Engine.create();
      engine.world.gravity.y = 1;
      engineRef.current = engine;

      render = Matter.Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: sceneRef.current.offsetWidth,
          height: sceneRef.current.offsetHeight,
          wireframes: false,
          background: "transparent",
        },
      });

      renderRef.current = render;

      const width = render.options.width;
      const height = render.options.height;

      boundaries = {
        top: Matter.Bodies.rectangle(width / 2, -15, width, 30, {
          isStatic: true,
          render: { visible: false },
        }),
        bottom: Matter.Bodies.rectangle(width / 2, height + 15, width, 30, {
          isStatic: true,
          render: { visible: false },
        }),
        left: Matter.Bodies.rectangle(-15, height / 2, 30, height, {
          isStatic: true,
          render: { visible: false },
        }),
        right: Matter.Bodies.rectangle(width + 15, height / 2, 30, height, {
          isStatic: true,
          render: { visible: false },
        }),
      };

      Matter.World.add(engine.world, [
        boundaries.top,
        boundaries.bottom,
        boundaries.left,
        boundaries.right,
      ]);

      const elements = document.querySelectorAll(".falling-body");

      const elementBodies = [];
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementBody = Matter.Bodies.rectangle(
          rect.left +
            rect.width / 2 -
            sceneRef.current.getBoundingClientRect().left,
          rect.top +
            rect.height / 2 -
            sceneRef.current.getBoundingClientRect().top,
          rect.width * 1.05,
          rect.height * 1.05,
          {
            restitution: 0.8,
            render: { visible: false },
          }
        );

        Matter.World.add(engine.world, elementBody);
        elementBodies.push({ element, body: elementBody });

        element.addEventListener("click", () => {
          console.log(`Clicked on element: ${element.innerText}`);
          Matter.World.remove(engine.world, elementBody);
          element.remove();
        });

        Matter.Events.on(engine, "afterUpdate", () => {
          element.style.position = "absolute";
          element.style.left = `${elementBody.position.x - rect.width / 2}px`;
          element.style.top = `${elementBody.position.y - rect.height / 2}px`;
          element.style.transform = `rotate(${elementBody.angle}rad)`;
        });
      });

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

      const mouse = Matter.Mouse.create(render.canvas);
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      Matter.World.add(engine.world, mouseConstraint);

      window.addEventListener("resize", resizeCanvas);

      resizeCanvas();
    }

    return () => {
      if (engine) {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        render.canvas.remove();
        window.removeEventListener("resize", resizeCanvas);
        render.canvas = null;
        render.context = null;
        render.textures = {};
      }
    };
  }, [isInView]);

  useEffect(() => {
    const heroImgs = [
      {
        img: document.querySelector(".hero-img-1"),
        endBox: document.querySelector(".pg-box-3"),
      },
      {
        img: document.querySelector(".hero-img-2"),
        endBox: document.querySelector(".pg-box-2"),
      },
      {
        img: document.querySelector(".hero-img-3"),
        endBox: document.querySelector(".pg-box-5"),
      },
    ];

    heroImgs.forEach(({ img, endBox }) => {
      const startBox = document.querySelector(".hero-content");

      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "bottom 51%",
        end: "bottom 50%",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.25) {
            animateImage(img, endBox);
          } else {
            animateImage(img, startBox);
          }
        },
      });

      function animateImage(targetImg, targetBox) {
        const state = Flip.getState(targetImg);

        // Move the image to the target container
        targetBox.appendChild(targetImg);

        Flip.from(state, {
          duration: 1,
          ease: "power4.inOut",
          absolute: true,
        });
      }
    });

    gsap.fromTo(
      ".reviews-text h6",
      {
        color: "rgba(255,255,255,1)",
      },
      {
        color: "rgba(255,255,255,0.2)",
        duration: 0.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 25%",
          end: "top 20%",
          scrub: 1,
          toggleActions: "play none none none",
        },
      }
    );

    let companyLogoAnim = gsap.timeline({
      scrollTrigger: {
        trigger: ".pg-box-1-logos",
        start: "top 100%",
        end: "top 0%",
        scrub: 1,
        toggleActions: "play none none none",
      },
    });

    companyLogoAnim.fromTo(".llb-1", { xPercent: 0 }, { xPercent: -100 });

    companyLogoAnim.fromTo(".llb-2", { xPercent: 0 }, { xPercent: 100 }, "<");
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBottomMobileMenuOpen, setIsBottomMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isBottomMobileMenuOpen) {
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top -10rem",
          end: "bottom 0%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      headerTimeline.to(".bottom-header-container", {
        y: "-25%",
        duration: 0.5,
        ease: "power3.inOut",
      });

      const hideHeaderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".copyright-section",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      hideHeaderTimeline.to(".bottom-header-container", {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Cleanup animations on component unmount
      return () => {
        headerTimeline.kill();
        hideHeaderTimeline.kill();
      };
    }
  }, [isBottomMobileMenuOpen]);

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleBottomMobileMenu = () => {
    if (!isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    setIsBottomMobileMenuOpen(!isBottomMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    setIsMobileMenuOpen(false);
    setIsBottomMobileMenuOpen(false);
  };

  const scrollToPortfolio = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".portfolio-section", true);
    setActiveSection("portfolio");
  };
  const scrollToHero = () => {
    closeMobileMenu();
    smootherRef.current?.scrollTo(".hero-section", true);
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

  useEffect(() => {
    if (mobileMenuRef.current && linksRef.current.length > 0) {
      if (isBottomMobileMenuOpen) {
        let bottomHeaderAnim = gsap.timeline();

        bottomHeaderAnim
          .fromTo(
            mobileMenuRef.current,
            { y: "100vh" },
            { y: "0", duration: 1, ease: "power3.inOut" }
          )
          .fromTo(
            linksRef.current,
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
              stagger: 0.15,
              ease: "power3.inOut",
            },
            "<0.5"
          );
      } else {
        gsap.set(mobileMenuRef.current, { height: "0" });
        gsap.set(linksRef.current, { y: "1rem", opacity: 0 });
      }
    }
  }, [isBottomMobileMenuOpen]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="webexhaust">
          <Header />
          <div className="hero-section">
          <div class="hero-background-element-small"></div>
          <div class="hero-background-element-grid-small"></div>
            <div className="box">
              <div className="hero-content">
                <img
                  className="hero-img-1"
                  src={PortfolioImg4}
                  alt="HeroImg"
                  loading="lazy"
                />
                <img
                  className="hero-img-2"
                  src={PortfolioVideo5}
                  alt="HeroImg"
                  loading="lazy"
                />
                <video
                  loop
                  autoPlay
                  muted
                  className="hero-img-3"
                  src={PortfolioVideo6}
                  alt="HeroImg"
                />
                <div className="hero-testimonials">
                  <Swiper
                    className="ht-swiper"
                    autoplay={{
                      delay: 2500,
                    }}
                    modules={[Autoplay]}
                    loop={false}
                    speed={1000}
                    direction={"vertical"}
                    spaceBetween={10}
                  >
                    <SwiperSlide>
                      <div className="testimonial-slide">
                        <p>
                          Working with Webexhaust was a nothing less than a
                          pleasure. They were quick to identify project goals
                          and implement them. The final product was stellar.
                        </p>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="testimonial-slide">
                        <p>
                          Webexhaust did an outstanding job creating a website
                          for The Mastery House. The site not only looks
                          fantastic but also functions seamlessly.
                        </p>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="testimonial-slide">
                        <p>
                          What a super star!! We had a very complicated and
                          urgent project, and Webexhaust's Team did not fail to
                          wow us with their abilities! Super smooth
                          communication!
                        </p>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="hero-heading-box">
                  <div className="websites-built-box">
                    <p>150+ Websites Built</p>
                    <div className="wbb-line"></div>
                    <div
                      className="get-yours-today-box"
                      onClick={scrollToContact}
                    >
                      <p> Get Yours Today</p>
                    </div>
                  </div>
                  <h1 className="gruppo">
                    We Make Damn <br />
                    Good Websites
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <section className="portfolio-section">
            <div className="box">
              <div className="section-heading-box">
                <h5>Every Website We Make is a Masterpiece of</h5>
                <h3 className="gruppo">Skills, Hard Work, and Love</h3>
              </div>
            </div>
            <div className="portfolio-grid">
              <div className="pg-box pg-box-1">
                {/* <p>
                  <span>Order Now</span> and Join The Club of <br /> Our 100+
                  Happy Clients
                </p> */}
                {/* <div className="pg-box-1-grd"></div> */}
                <div className="pg-box-1-logos">
                  <div className="logo-long-box llb-1">
                    <div className="logo-box">
                      <img src={Logo11} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo12} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo13} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo14} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo15} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo16} alt="logo" loading="lazy" />
                    </div>
                  </div>
                  <div className="logo-long-box llb-2">
                    <div className="logo-box">
                      <img src={Logo11} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo12} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo13} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo18} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo15} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo16} alt="logo" loading="lazy" />
                    </div>
                  </div>
                  <div className="logo-long-box llb-1">
                    <div className="logo-box">
                      <img src={Logo16} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo18} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo19} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo20} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo21} alt="logo" loading="lazy" />
                    </div>
                    <div className="logo-box">
                      <img src={Logo17} alt="logo" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-2">
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href={`/portfolio?id=1&project=uptrend`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick(1, "uptrend");
                      }}
                      rel="noopener noreferrer"
                    >
                      Uptrend <ArrowRight />{" "}
                    </a>
                    <span>Marketing and Branding Agency</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-3">
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href={`/portfolio?id=2&project=maesterai`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick(2, "maesterai");
                      }}
                      rel="noopener noreferrer"
                    >
                      Maesterai
                      <ArrowRight />{" "}
                    </a>
                    <span>Revenue Optimization App</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-4" ref={sceneRef}>
                <p className="gruppo falling-body">6+ Years in Business</p>
                <p className="gruppo falling-body">150+ Websites Built</p>
                <p className="gruppo falling-body">200+ Happy Clients</p>
                <video
                  src={LogoGif}
                  alt="Logo Gif"
                  className="infinite-webexhaust-logo falling-body"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <img
                  src={InfinityImg}
                  alt="InfinityImg"
                  className="round-img falling-body"
                  loading="lazy"
                />
                <button className="btn-white-round-sm falling-body gruppo">
                  MOBILE APPS
                </button>
                <video
                  src={ArrowImg}
                  alt="ArrowImg"
                  className="round-img falling-body"
                  loading="lazy"
                />
                <button className="btn-white-round-sm-outlined gruppo falling-body">
                  UI/UX DESIGN
                </button>
                <button className="btn-white-round-sm-outlined gruppo falling-body">
                  DA'AAAM!
                </button>
                <button className="btn-white-round-sm-outlined gruppo falling-body">
                  WEBSITES
                </button>
                <video
                  src={PortfolioVideo1}
                  alt="ArrowImg"
                  className="video falling-body"
                  loop
                  muted
                  autoPlay
                  loading="lazy"
                />
                <h3 className="gruppo">WEBEXHAUST</h3>
              </div>
              <div className="pg-box pg-box-5">
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href="https://sleekgeek-webexhaust.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sleekgeek
                      <ArrowRight />{" "}
                    </a>
                    <span>NFT Collectibles</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-6">
                <WebexhaustLogoBoxes className="webexhaust-logo-boxes" />
                <p>
                  Our Clients think of us as <br />
                  <span>"Superstars"</span> <br />
                  <span>"God-sent Developers"</span> & <br />
                  <span>"Literally The Best"</span>
                </p>
              </div>
              <div className="pg-box pg-box-7">
                <img src={PortfolioImg7} alt="portfolio" loading="lazy" />
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href="https://outkast.world/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Outkast
                      <ArrowRight />{" "}
                    </a>
                    <span>NFT Collection App</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-10">
                <a
                  href="https://calendly.com/webexhaust/webexhaust"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Free Consultation Call
                </a>
                <p>You’ll get confirmation email within 30 minutes</p>
              </div>

              <div className="pg-box pg-box-8">
                <img src={PortfolioImg11} alt="" loading="lazy" />
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a href="/" rel="noopener noreferrer">
                      Mosca World
                      <ArrowRight />{" "}
                    </a>
                    <span>Blockchain / Crypto Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="pg-box pg-box-9">
                <video
                  loop
                  autoPlay
                  muted
                  className="hero-img-3"
                  src={PortfolioVideo1}
                  alt="HeroImg"
                  loading="lazy"
                />{" "}
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href="https://unchained-robotics.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unchained Robotics <ArrowRight />{" "}
                    </a>
                    <span>Tasks Automation App</span>
                  </div>
                </div>
              </div>

              <div className="pg-box pg-box-11">
                <img src={PortfolioImg8} alt="portfolio" loading="lazy" />
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href="https://sweetspot-webexhaust.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sweetspot
                      <ArrowRight />{" "}
                    </a>
                    <span>Relationship and Counseling Platform</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-12">
                <img src={PortfolioImg10} alt="portfolio" loading="lazy" />
                <div className="overlay">
                  <div className="overlay-content-top">
                    <a
                      href="https://myaibody-webexhaust.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      My AI Body
                      <ArrowRight />{" "}
                    </a>
                    <span>Fitness App</span>
                  </div>
                </div>
              </div>
              <div className="pg-box pg-box-13">
                <div>
                  <p>We Have Reserved This Spot For</p>
                  <h4 className="gruppo">YOUR PROJECT</h4>
                </div>
                <button
                  className="btn-black-round-lg"
                  onClick={scrollToContact}
                >
                  Contact us
                </button>
              </div>
            </div>
          </section>

          <section className="team-section">
            <div className="box">
              <div className="section-heading-box">
                <h5>Each Team Member Brings</h5>
                <h3 className="gruppo">Skills, Passion, and Dedication</h3>
              </div>
              <div className="team-grid">
                <div className="tg-left-box">
                  <div className="tgl-grid">
                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      //   }`}
                      className="tgl-content active"
                    >
                      <img src={Saim12} alt="team" loading="lazy" />
                      <h4>Saim Abbas</h4>
                      <p>Founder & CEO</p>
                    </div>

                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      // }`}
                        className="tgl-content active"
                    >
                      <img src={Laib12} alt="team" loading="lazy" />
                      <h4>Laiba Sheikh</h4>
                      <p>Software Engineer</p>
                    </div>

                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      //   }`}
                        className="tgl-content active"
                    >
                      <img src={TeamPic4} alt="team" loading="lazy" />
                      <h4>Rana Usama</h4>
                      <p>Mobile App Developer</p>
                    </div>

                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      //   }`}
                        className="tgl-content active"
                    >
                      <img src={TeamPic3} alt="team" loading="lazy" />
                      <h4>Aiza Shahid</h4>
                      <p>Social Media Manager</p>
                    </div>

                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      //   }`}
                        className="tgl-content active"
                    >
                      <img src={TeamPic5} alt="team" loading="lazy" />
                      <h4>Shahram Ali</h4>
                      <p>Business Development Manager</p>
                    </div>
                    <div
                      // className={`${"tgl-content"} ${"active"} 
                      //   }`}
                        className="tgl-content active"
                    >
                      <img src={TeamPic6} alt="team" loading="lazy" />
                      <h4>Iffat Fatima</h4>
                      <p>Frontend Developer</p>
                    </div>
                  </div>
                  <h5>
                    People Who Would Love to Go Above’n Beyond To Design Nothing
                    Less than Extra-Ordinary
                  </h5>
                </div>
              </div>
            </div>
          </section>

          <section className="map-section">
            <div className="box">
              <div className="map-content">
                <WorldMap />
                <div className="map-text">
                  <h4>We have worked with clients from over 26 countries.</h4>
                  <p>
                    Is your country here?{" "}
                    <a href="#contact" onClick={scrollToContact}>
                      Let Us Know
                    </a>
                  </p>
                </div>
                <div className="side-text">
                  <p>World Domination : 13%</p>
                </div>
              </div>
            </div>
          </section>

          <section className="services-section">
            <div className="section-heading-box">
              <h5>We Have Refined Our Services over the Course of 7 Years</h5>
              <h3 className="gruppo">Exquisite & Extra-Ordinary Services</h3>
            </div>
            <div className="services-mobile">
              <Swiper
                className="portfolio-swiper"
                autoplay={{
                  delay: 2500,
                }}
                modules={[Autoplay]}
                loop={false}
                speed={1000}
                direction={"horizontal"}
                slidesPerView={1.2}
                spaceBetween={10}
              >
                <SwiperSlide>
                  <div className="service-box">
                    <img
                      src={brandIdentity}
                      alt="brand identity"
                      loading="lazy"
                    />
                    <div className="sg-service-list">
                      <a href="">Logo Design</a>
                      <a href="">Visual Style Guide</a>
                      <a href="">Brand Messaging</a>
                      <a href="">Brand Collateral</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="" onClick={scrollToContact}>
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">Brand Identity</h4>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-box">
                    <img
                      src={Strategy}
                      alt="strategy"
                      loading="lazy"
                      className="service2"
                    />
                    <div className="sg-service-list">
                      <a href="">User Research</a>
                      <a href="">Wireframing</a>
                      <a href="">Prototyping</a>
                      <a href="">User Testing</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="" onClick={scrollToContact}>
                        {" "}
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">UI/UX Design</h4>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-box">
                    <img src={ServiceItem3} alt="services" loading="lazy" />
                    <div className="sg-service-list">
                      <a href="">Market Analysis</a>
                      <a href="">Brand Strategy</a>
                      <a href="">Digital Strategy</a>
                      <a href="">Growth Hacking</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="" onClick={scrollToContact}>
                        {" "}
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">Strategy</h4>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-box">
                    <img src={ServiceItem4} alt="services" loading="lazy" />
                    <div className="sg-service-list">
                      <a href="#">Web Dev</a>
                      <a href="#">Frameworks</a>
                      <a href="#">Libraries</a>
                      <a href="#">Performance Optimization</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="#" onClick={scrollToContact}>
                        {" "}
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">Custom Webs</h4>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-box">
                    <img src={ServiceItem5} alt="services" loading="lazy" />
                    <div className="sg-service-list">
                      <a href="#">iOS Development</a>
                      <a href="#">Android Development</a>
                      <a href="#">Cross-Platform Dev</a>
                      <a href="#">App UI/UX Design</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="#" onClick={scrollToContact}>
                        {" "}
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">Mobile Apps</h4>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-box">
                    <img src={ServiceItem6} alt="services" loading="lazy" />
                    <div className="sg-service-list">
                      <a href="#">Custom Webflow Sites</a>
                      <a href="#">Webflow CMS</a>
                      <a href="#">Animations</a>
                      <a href="#">SEO and Performance</a>
                    </div>
                    <div className="sg-service-name">
                      <a href="#" onClick={scrollToContact}>
                        {" "}
                        BOOK NOW <ArrowRight />
                      </a>
                      <h4 className="gruppo">CMS Dev</h4>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="services-grid">
              <div className="service-box">
                <img src={brandIdentity} alt="brand identity" loading="lazy" />
                <div className="sg-service-list">
                  <a href="">Logo Design</a>
                  <a href="">Visual Style Guide</a>
                  <a href="">Brand Messaging</a>
                  <a href="">Brand Collateral</a>
                </div>
                <div className="sg-service-name">
                  <a href="" onClick={scrollToContact}>
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">Brand Identity</h4>
                </div>
              </div>
              <div className="service-box">
                <img
                  src={Strategy}
                  alt="strategy"
                  loading="lazy"
                  className="service2"
                />
                <div className="sg-service-list">
                  <a href="">User Research</a>
                  <a href="">Wireframing</a>
                  <a href="">Prototyping</a>
                  <a href="">User Testing</a>
                  <a href="">Interface Design</a>
                </div>
                <div className="sg-service-name">
                  <a href="" onClick={scrollToContact}>
                    {" "}
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">UI/UX Design</h4>
                </div>
              </div>
              <div className="service-box">
                <img src={ServiceItem3} alt="services" loading="lazy" />
                <div className="sg-service-list">
                  <a href="">Market Analysis</a>
                  <a href="">Brand Strategy</a>
                  <a href="">Digital Strategy</a>
                  <a href="">Growth Hacking</a>
                </div>
                <div className="sg-service-name">
                  <a href="" onClick={scrollToContact}>
                    {" "}
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">Strategy</h4>
                </div>
              </div>
              <div className="service-box">
                <img src={ServiceItem4} alt="services" loading="lazy" />
                <div className="sg-service-list">
                  <a href="#">Web Development</a>
                  <a href="#">Frameworks and Libraries</a>
                  <a href="#">Performance Optimization</a>
                  <a href="#">Cross-Browser Compatibility</a>
                </div>
                <div className="sg-service-name">
                  <a href="#" onClick={scrollToContact}>
                    {" "}
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">Custom Web Dev</h4>
                </div>
              </div>
              <div className="service-box">
                <img src={ServiceItem5} alt="services" loading="lazy" />
                <div className="sg-service-list">
                  <a href="#">iOS Development</a>
                  <a href="#">Android Development</a>
                  <a href="#">Cross-Platform Development</a>
                  <a href="#">App UI/UX Design</a>
                </div>
                <div className="sg-service-name">
                  <a href="#" onClick={scrollToContact}>
                    {" "}
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">Mobile App Dev</h4>
                </div>
              </div>
              <div className="service-box">
                <img src={ServiceItem6} alt="services" loading="lazy" />
                <div className="sg-service-list">
                  <a href="#">Custom Webflow Sites</a>
                  <a href="#">Webflow CMS</a>
                  <a href="#">Animations and Interactions</a>
                  <a href="#">SEO and Performance</a>
                </div>
                <div className="sg-service-name">
                  <a href="#" onClick={scrollToContact}>
                    {" "}
                    BOOK NOW <ArrowRight />
                  </a>
                  <h4 className="gruppo">CMS Dev</h4>
                </div>
              </div>
            </div>
          </section>

          <section className="testimonials-section">
            <div className="box">
              <div className="section-heading-box">
                <h5>Our Clients Value Us and We Value Them</h5>
                <h3 className="gruppo">Clients Reviews</h3>
              </div>
              <div className="reviews-text">
                <h6>
                  These guys are <b>God-sent Frontend Developers</b>. I don’t
                  even know where to start with this review. First of all, the
                  team's proactive thinking is beyond description. They ensure
                  to deliver what you ask for and even more than what you
                  expected.{" "}
                  <b>
                    {" "}
                    Their ability to deliver on time and even before deadlines
                    is mind-blowing
                  </b>{" "}
                  , and their <b>communication skills are on point</b>. They
                  make sure to communicate at every step of the process. We just
                  had our first project done with them, and we’re sure that
                  we’ll be back for many more!
                </h6>
                <h6>
                  <b>What a superstar team!</b> We had a very complicated and
                  urgent project, and <b>Webexhaust did not fail to wow us</b>{" "}
                  with their abilities! Super smooth communication, top-notch
                  quality work, and speed! They also listened to all our
                  feedback and resolved all issues in no time! We will
                  definitely look forward to working with Webexhaust again in
                  the future!
                </h6>
                <h6>
                  <b>
                    Wow! We are blown away by the work this team did for us.
                  </b>{" "}
                  They not only met our expectations but exceeded them by a
                  mile. Our website now looks modern, loads faster, and is
                  incredibly responsive across all devices. Their communication
                  throughout the project was <b> impeccable</b>, and they
                  <b>delivered ahead of schedule.</b> I highly recommend their
                  services!
                </h6>
                <h6>
                  The Webexhaust team didn’t just complete the task;{" "}
                  <b>they made it flawless.</b> It was a true collaboration from
                  start to finish. They really had the final goal in mind,
                  fitting our expectations, and even exceeding them in several
                  areas. <b>We absolutely love the final result</b> and look
                  forward to working with Webexhaust on future projects! Thanks
                  a lot!
                </h6>
                <h6>
                  <b>
                    Working with Webexhaust was nothing less than a pleasure.
                  </b>{" "}
                  The team was very professional and responsive to our requests.
                  I recommend working with them over anyone else, as their
                  professionalism and knowledge base really set them apart.
                  We’ll be working with them again for all our future needs.
                  <b>They quickly identified our project goals</b> and
                  implemented them. They not only met our deadline but delivered
                  much earlier than expected.{" "}
                  <b>The final product was stellar.</b>
                </h6>
              </div>
            </div>
          </section>

          <section className="order-section">
            <div className="bocx">
              <div className="section-heading-box">
                <h5>150+ Websites Built, Get Yours Today!</h5>
                <h3 className="gruppo">ORDER NOW</h3>
              </div>
              <div className="box">
                <div className="order-content">
                  <div className="order-grid-1">
                    <div className="input-box">
                      <label>Hi Webexhaust, I am</label>
                      <input
                        type="text"
                        className="lead-name"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-box">
                      <label>My Company/Business Name is</label>
                      <input
                        type="text"
                        className="lead-name"
                        placeholder="Your Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-box">
                      <label>You may contact me via my Email</label>
                      <input
                        type="text"
                        className="lead-name"
                        placeholder="name@domain.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-box">
                      <label>Or via my Phone/Whatsapp</label>
                      <input
                        type="text"
                        className="lead-name"
                        placeholder="+1 234 567890"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="service-box">
                    <label>I would love to order</label>
                    <div className="service-grid">
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-1"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-1" className="service-card">
                        <p>Branding</p>
                        <img
                          src={brandIdentity}
                          alt="services"
                          loading="lazy"
                        />
                      </label>
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-2"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-2" className="service-card">
                        <p>UI/UX Design</p>
                        <img src={Strategy} alt="services" loading="lazy" />
                      </label>
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-3"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-3" className="service-card">
                        <p>Strategy & Research</p>
                        <img src={ServiceItem3} alt="services" loading="lazy" />
                      </label>
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-4"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-4" className="service-card">
                        <p>Web Development</p>
                        <img src={ServiceItem4} alt="services" loading="lazy" />
                      </label>
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-5"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-5" className="service-card">
                        <p>Mobile App Development</p>
                        <img src={ServiceItem5} alt="services" loading="lazy" />
                      </label>
                      <input
                        type="checkbox"
                        name="lead-service"
                        id="ls-6"
                        onChange={handleChange}
                      />
                      <label htmlFor="ls-6" className="service-card">
                        <p>Webflow Development</p>
                        <img src={ServiceItem6} alt="services" loading="lazy" />
                      </label>
                    </div>
                  </div>
                  <div className="order-grid-1">
                    <div className="input-box">
                      <label>My Budget for this amazing project is</label>
                      <div className="budget-grid">
                        <input
                          type="radio"
                          name="budget"
                          id="budget-1"
                          value="$1K - $10K"
                          onChange={handleChange}
                        />
                        <label htmlFor="budget-1" className="budget-card">
                          $1K - $10K
                        </label>
                        <input
                          type="radio"
                          name="budget"
                          id="budget-2"
                          value="$10 - $25K"
                          onChange={handleChange}
                        />
                        <label htmlFor="budget-2" className="budget-card">
                          $10 - $25K
                        </label>
                        <input
                          type="radio"
                          name="budget"
                          id="budget-3"
                          value="$25K+"
                          onChange={handleChange}
                        />
                        <label htmlFor="budget-3" className="budget-card">
                          $25K+
                        </label>
                      </div>
                    </div>
                    <div className="input-box">
                      <label>I would like to get this done within</label>
                      <div className="budget-grid">
                        <input
                          type="radio"
                          name="timeline"
                          id="timeline-1"
                          value="7 - 21 Days"
                          onChange={handleChange}
                        />
                        <label htmlFor="timeline-1" className="budget-card">
                          7 - 21 Days
                        </label>
                        <input
                          type="radio"
                          name="timeline"
                          id="timeline-2"
                          value="1 - 3 Months"
                          onChange={handleChange}
                        />
                        <label htmlFor="timeline-2" className="budget-card">
                          1 - 3 Months
                        </label>
                        <input
                          type="radio"
                          name="timeline"
                          id="timeline-3"
                          value="3+ Months"
                          onChange={handleChange}
                        />
                        <label htmlFor="timeline-3" className="budget-card">
                          3+ Months
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="input-box">
                    <label>Here's the Project Description</label>
                    <textarea
                      placeholder="I own the best digital solutions agency and we would love you to help us with ..."
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    className="btn-white-round-lg-outlined lead-submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      <div
        className={`bottom-header-container ${
          isBottomMobileMenuOpen ? "open" : ""
        } ${isMobileMenuOpen ? "top-menu" : ""}`}
      >
        <div className="bottom-header">
          <div className="logo" onClick={scrollToHero}>
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
              className={`${activeSection === "team" ? "active" : ""}`}
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
            <a
              href="#contact"
              onClick={scrollToContact}
              className={`${
                activeSection === "contact" ? "active" : ""
              }`}
            >
              CONTACT
            </a>
          </nav>
          <div className="video-button-container">
            <video autoPlay muted loop playsInline className="video-background">
              <source src={Cta} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              className="btn-white-round-sm video-btn"
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
          <div className="hamburger-menu" onClick={toggleBottomMobileMenu}>
            {isBottomMobileMenuOpen ? (
              <img src={closeMenu} alt="Close Menu" loading="lazy" />
            ) : (
              <img src={Menu} alt="Menu" loading="lazy" />
            )}
          </div>
        </div>
        {isBottomMobileMenuOpen && (
          <div className="bottom-mobile-menu" ref={mobileMenuRef}>
            <div className="box">
              <div className="bottom-mobile-menu-grid">
                <div className="bottom-mobile-menu-top">
                  <div className="logo">
                    <div className="logo-box logo-box-1"></div>
                    <div className="logo-box logo-box-2"></div>
                    <div className="logo-box logo-box-3"></div>
                  </div>
                  <div onClick={closeMobileMenu} className="hamburger-menu">
                    {isBottomMobileMenuOpen ? (
                      <img src={closeMenu} alt="Close Menu" loading="lazy" />
                    ) : (
                      <img src={Menu} alt="Menu" loading="lazy" />
                    )}
                  </div>
                </div>
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
                    <a
                      ref={(el) => (linksRef.current[4] = el)}
                      href="#contact"
                      onClick={scrollToContact}
                      className="gruppo"
                    >
                      CONTACT
                    </a>
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
                        className="btn-white-round-lg-outlined"
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
      </div>
    </div>
  );
};

export default Home;
