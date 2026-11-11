
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faWandMagicSparkles,
  faMagnifyingGlass,
  faRocket,
  faArrowRight,
  faCheck,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import "../style/HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: faLightbulb,
      title: "Share Your Interests",
      description:
        "Tell us about your interests, skills, preferred niche, and budget. Start with what you already know and what you love.",
    },
    {
      number: "02",
      icon: faWandMagicSparkles,
      title: "Generate Ideas with AI",
      description:
        "Let our AI-powered idea generator turn your inputs into startup concepts with problems, solutions, target audiences, and estimated budgets.",
    },
    {
      number: "03",
      icon: faMagnifyingGlass,
      title: "Explore & Discover",
      description:
        "Explore startup ideas shared by the community. Search through different concepts and discover opportunities that inspire you.",
    },
    {
      number: "04",
      icon: faRocket,
      title: "Take the First Step",
      description:
        "Choose an idea that interests you, understand the opportunity, and start moving towards building your startup.",
    },
  ];

  return (
    <main className="how-page">

      {/* Hero Section */}
      <section className="how-hero">
        <div className="how-hero-content">
          <span className="how-eyebrow">
            <FontAwesomeIcon icon={faCompass} />
            YOUR JOURNEY STARTS HERE
          </span>

          <h1>
            From <span>Idea</span> to
            <br />
            <span>Innovation.</span>
          </h1>

          <p>
            Starting a business doesn't have to be complicated.
            LaunchPad AI helps you discover opportunities,
            generate startup ideas, and take your first step
            towards building something meaningful.
          </p>

          {/* <NavLink to="/generateIdeas" className="how-primary-btn">
            Get Started
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink> */}
        </div>

        <div className="how-hero-visual">
          <div className="how-visual-circle circle-one"></div>
          <div className="how-visual-circle circle-two"></div>

          <div className="how-main-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>

          <div className="how-floating-card floating-top">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            <span>AI Powered Ideas</span>
          </div>

          <div className="how-floating-card floating-bottom">
            <FontAwesomeIcon icon={faRocket} />
            <span>Build Your Future</span>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="how-steps-section">
        <div className="how-section-heading">
          <span>THE PROCESS</span>
          <h2>How Does LaunchPad AI Work?</h2>
          <p>
            Four simple steps to help transform your thoughts
            into potential startup opportunities.
          </p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step, index) => (
            <article className="how-step-card" key={step.number}>
              <div className="how-step-top">
                <span className="how-step-number">
                  {step.number}
                </span>

                <div className="how-step-icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              {index !== steps.length - 1 && (
                <div className="how-step-arrow">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="how-workflow-section">
        <div className="how-workflow-content">
          <span className="how-eyebrow">
            SIMPLE. SMART. EFFECTIVE.
          </span>

          <h2>
            Everything Begins With
            <span> One Idea.</span>
          </h2>

          <p>
            You don't need to have everything figured out.
            Start with a problem, an interest, or even a simple
            thought. Let LaunchPad AI help you explore what's possible.
          </p>

          <div className="how-benefits">
            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Discover new startup opportunities</span>
            </div>

            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Generate ideas based on your interests</span>
            </div>

            <div>
              <FontAwesomeIcon icon={faCheck} />
              <span>Explore concepts and potential solutions</span>
            </div>
          </div>
        </div>

        <div className="how-workflow-visual">
          <div className="workflow-box workflow-first">
            <FontAwesomeIcon icon={faLightbulb} />
            <div>
              <strong>Your Idea</strong>
              <span>Start with inspiration</span>
            </div>
          </div>

          <div className="workflow-connector">
            <span></span>
          </div>

          <div className="workflow-box workflow-second">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            <div>
              <strong>AI Generation</strong>
              <span>Discover possibilities</span>
            </div>
          </div>

          <div className="workflow-connector">
            <span></span>
          </div>

          <div className="workflow-box workflow-third">
            <FontAwesomeIcon icon={faRocket} />
            <div>
              <strong>Your Startup Journey</strong>
              <span>Take the first step</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="how-cta-section">
        <div className="how-cta-icon">
          <FontAwesomeIcon icon={faRocket} />
        </div>

        <h2>Ready to Turn Your Idea Into Reality?</h2>

        <p>
          Your next big opportunity could start with a single click.
          Start exploring today.
        </p>

        {/* <NavLink to="/generateIdeas" className="how-primary-btn">
          Start Exploring
          <FontAwesomeIcon icon={faArrowRight} />
        </NavLink> */}
      </section>

    </main>
  );
}

export default HowItWorks;
