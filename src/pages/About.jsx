
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faRocket,
  faBullseye,
  faEye,
  faWandMagicSparkles,
  faMagnifyingGlass,
  faUsers,
  faArrowRight,
  faCheck,
  faBrain,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import "../style/About.css";

function About() {
  const features = [
    {
      icon: faWandMagicSparkles,
      title: "AI-Powered Idea Generation",
      description:
        "Generate startup concepts based on your interests, skills, budget, and preferred business niche.",
    },
    {
      icon: faMagnifyingGlass,
      title: "Explore Startup Ideas",
      description:
        "Discover different startup concepts, understand the problems they solve, and explore potential opportunities.",
    },
    {
      icon: faBrain,
      title: "Smart Insights",
      description:
        "Get structured information about startup problems, proposed solutions, target audiences, and estimated budgets.",
    },
    {
      icon: faUsers,
      title: "Community Inspiration",
      description:
        "Explore ideas shared by others and discover fresh perspectives that can inspire your entrepreneurial journey.",
    },
  ];

  return (
    <main className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">
            <FontAwesomeIcon icon={faCompass} />
            GET TO KNOW US
          </span>

          <h1>
            Empowering Ideas.
            <br />
            <span>Inspiring Innovation.</span>
          </h1>

          <p>
            LaunchPad AI is an AI-powered startup platform
            designed to help aspiring entrepreneurs discover
            opportunities, generate innovative ideas, and take
            their first steps towards building something meaningful.
          </p>

          {/* <NavLink to="/generateIdeas" className="about-primary-btn">
            Explore Ideas
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink> */}
        </div>

        <div className="about-hero-visual">
          <div className="about-visual-circle about-circle-one"></div>
          <div className="about-visual-circle about-circle-two"></div>

          <div className="about-main-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>

          <div className="about-floating-card about-floating-one">
            <FontAwesomeIcon icon={faBrain} />
            <span>Think Beyond Limits</span>
          </div>

          <div className="about-floating-card about-floating-two">
            <FontAwesomeIcon icon={faRocket} />
            <span>Build Something Great</span>
          </div>
        </div>
      </section>

      {/* ABOUT INTRODUCTION */}
      <section className="about-intro-section">
        <div className="about-intro-visual">
          <div className="about-intro-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>

          <div className="about-intro-decoration decoration-one"></div>
          <div className="about-intro-decoration decoration-two"></div>
        </div>

        <div className="about-intro-content">
          <span className="about-section-label">WHO WE ARE</span>

          <h2>
            Turning Inspiration Into
            <span> Possibilities.</span>
          </h2>

          <p>
            Every great startup begins with an idea. But finding
            the right idea, understanding the problem, and
            identifying an opportunity can be challenging.
          </p>

          <p>
            That's where LaunchPad AI comes in. We bring together
            artificial intelligence and startup discovery to make
            exploring business ideas easier, more structured,
            and more accessible.
          </p>

          <p>
            Whether you're a student, aspiring entrepreneur,
            or someone with a passion for innovation, LaunchPad AI
            gives you a place to begin exploring what's possible.
          </p>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-purpose-section">
        <div className="about-section-heading">
          <span>OUR PURPOSE</span>
          <h2>What Drives Us Forward?</h2>
          <p>
            We believe that innovative thinking should have
            the opportunity to become meaningful action.
          </p>
        </div>

        <div className="about-purpose-grid">

          <div className="about-purpose-card">
            <div className="about-purpose-icon">
              <FontAwesomeIcon icon={faBullseye} />
            </div>

            <h3>Our Mission</h3>

            <p>
              To make startup idea discovery simpler and more
              accessible by using AI to help people transform
              their interests, skills, and problems into
              structured business opportunities.
            </p>
          </div>

          <div className="about-purpose-card">
            <div className="about-purpose-icon">
              <FontAwesomeIcon icon={faEye} />
            </div>

            <h3>Our Vision</h3>

            <p>
              To create an environment where aspiring
              entrepreneurs can explore possibilities,
              think creatively, and take confident first
              steps towards their entrepreneurial goals.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="about-features-section">
        <div className="about-section-heading">
          <span>WHY LAUNCHPAD AI</span>
          <h2>Everything Starts With an Idea</h2>
          <p>
            Discover the tools that help you move from
            inspiration to startup exploration.
          </p>
        </div>

        <div className="about-features-grid">
          {features.map((feature, index) => (
            <article className="about-feature-card" key={index}>
              <div className="about-feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="about-approach-section">
        <div className="about-approach-content">
          <span className="about-section-label">OUR APPROACH</span>

          <h2>
            Innovation Begins With
            <span> Curiosity.</span>
          </h2>

          <p>
            We believe that you don't need a perfect business
            plan to begin. You need curiosity, a problem worth
            exploring, and the willingness to take the first step.
          </p>

          <div className="about-approach-points">
            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Explore ideas without overcomplicating the process.</span>
            </div>

            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Use AI to discover new business possibilities.</span>
            </div>

            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Turn your interests into potential opportunities.</span>
            </div>
          </div>
        </div>

        <div className="about-approach-visual">
          <div className="about-approach-icon">
            <FontAwesomeIcon icon={faRocket} />
          </div>

          <span>Dream</span>
          <FontAwesomeIcon icon={faArrowRight} />
          <span>Explore</span>
          <FontAwesomeIcon icon={faArrowRight} />
          <span>Create</span>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="about-cta-section">
        <div className="about-cta-icon">
          <FontAwesomeIcon icon={faRocket} />
        </div>

        <h2>Your Next Big Idea Starts Here.</h2>

        <p>
          Stop waiting for the perfect moment.
          Start exploring ideas and discover what you could build.
        </p>

        {/* <NavLink to="/generateIdeas" className="about-primary-btn">
          Get Started
          <FontAwesomeIcon icon={faArrowRight} />
        </NavLink> */}
      </section>

    </main>
  );
}

export default About;
