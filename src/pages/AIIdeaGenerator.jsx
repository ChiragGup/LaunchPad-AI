
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faLightbulb,
  faChevronDown,
  faChevronUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import "../style/AIIdeaGenerator.css";

const API_URL = "http://localhost:5000";

function AIIdeaGenerator() {
  const [formData, setFormData] = useState({
    niche: "",
    interests: "",
    skills: "",
    budget: "",
    targetAudience: "",
  });

  const [ideas, setIdeas] = useState([]);
  const [expandedIdeas, setExpandedIdeas] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate startup ideas
  const generateIdeas = async (event) => {
    event.preventDefault();

    if (!formData.niche.trim()) {
      setError("Please enter a startup niche or problem.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setIdeas([]);
      setExpandedIdeas({});

      const response = await axios.post(
        `${API_URL}/generate`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIdeas(response.data.data);
      } else {
        setError(
          response.data.message ||
            "Unable to generate ideas."
        );
      }
    } catch (error) {
      console.error("Idea generation error:", error);
      console.error(
        "Backend response:",
        error.response?.data
      );

      setError(
        
          "Unable to generate startup ideas. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Expand or collapse idea details
  const toggleExpand = (index) => {
    setExpandedIdeas((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="lp-ai-generator">

      {/* Hero Section */}
      <div className="lp-ai-hero">

        <div className="lp-ai-hero-icon">
          <FontAwesomeIcon icon={faWandMagicSparkles} />
        </div>

        <span className="lp-ai-eyebrow">
          POWERED BY GEMINI AI
        </span>

        <h1>Turn Your Ideas Into Startups</h1>

        <p>
          Tell us what interests you, and let AI discover
          innovative startup opportunities for you.
        </p>

      </div>

      {/* Input Form */}
      <form
        className="lp-ai-form"
        onSubmit={generateIdeas}
      >

        <div className="lp-ai-form-heading">

          <h2>Tell us about your interests</h2>

          <p>
            Give Gemini some information to generate relevant
            startup ideas.
          </p>

        </div>

        <div className="lp-ai-form-grid">

          {/* Startup Niche */}
          <div className="lp-ai-field lp-ai-field-full">

            <label htmlFor="niche">
              Startup niche or problem *
            </label>

            <textarea
              id="niche"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              placeholder="Example: I want to solve problems in online education..."
              rows={4}
              required
            />

          </div>

          {/* Interests */}
          <div className="lp-ai-field">

            <label htmlFor="interests">
              Your interests
            </label>

            <input
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Example: Technology, education, AI"
            />

          </div>

          {/* Skills */}
          <div className="lp-ai-field">

            <label htmlFor="skills">
              Your skills
            </label>

            <input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Example: React, Node.js, marketing"
            />

          </div>

          {/* Budget */}
          <div className="lp-ai-field">

            <label htmlFor="budget">
              Estimated budget
            </label>

            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            >
              <option value="">Select your budget</option>

              <option value="Below ₹10,000">
                Below ₹10,000
              </option>

              <option value="₹10,000 - ₹50,000">
                ₹10,000 - ₹50,000
              </option>

              <option value="₹50,000 - ₹1 lakh">
                ₹50,000 - ₹1 lakh
              </option>

              <option value="₹1 lakh - ₹5 lakh">
                ₹1 lakh - ₹5 lakh
              </option>

              <option value="Above ₹5 lakh">
                Above ₹5 lakh
              </option>
            </select>

          </div>

          {/* Target Audience */}
          <div className="lp-ai-field">

            <label htmlFor="targetAudience">
              Target audience
            </label>

            <input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="Example: Students, small businesses"
            />

          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="lp-ai-error">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <button
          type="submit"
          className="lp-ai-generate-button"
          disabled={loading}
        >

          {loading ? (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                spin
              />
              Generating Ideas...
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
              />
              Generate Startup Ideas
            </>
          )}

        </button>

      </form>

      {/* Generated Ideas */}
      {ideas.length > 0 && (
        <section className="lp-ai-results">

          <div className="lp-ai-results-heading">

            <div>

              <span className="lp-ai-eyebrow">
                YOUR AI RESULTS
              </span>

              <h2>Startup Ideas For You</h2>

              <p>
                Here are the opportunities Gemini discovered
                based on your inputs.
              </p>

            </div>

            <span className="lp-ai-result-count">
              {ideas.length} Ideas
            </span>

          </div>

          <div className="lp-ai-ideas-grid">

            {ideas.map((idea, index) => {
              const isExpanded = expandedIdeas[index];

              return (
                <article
                  className="lp-ai-idea-card"
                  key={`${idea.title}-${index}`}
                >

                  <div className="lp-ai-card-top">

                    <div className="lp-ai-card-icon">
                      <FontAwesomeIcon icon={faLightbulb} />
                    </div>

                  </div>

                  <h3>{idea.title}</h3>

                  <p className="lp-ai-tagline">
                    {idea.tagline}
                  </p>

                  <p className="lp-ai-description">
                    {idea.description}
                  </p>

                  <div className="lp-ai-card-actions">

                    <button
                      type="button"
                      className="lp-ai-details-button"
                      onClick={() => toggleExpand(index)}
                    >

                      {isExpanded
                        ? "Show Less"
                        : "Explore Details"}

                      <FontAwesomeIcon
                        icon={
                          isExpanded
                            ? faChevronUp
                            : faChevronDown
                        }
                      />

                    </button>

                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="lp-ai-expanded-details">

                      <div>
                        <h4>Problem</h4>
                        <p>{idea.problem}</p>
                      </div>

                      <div>
                        <h4>Solution</h4>
                        <p>{idea.solution}</p>
                      </div>

                      <div>
                        <h4>Target Audience</h4>
                        <p>{idea.targetAudience}</p>
                      </div>

                      <div>
                        <h4>Key Features</h4>

                        <ul>
                          {idea.keyFeatures?.map(
                            (feature, featureIndex) => (
                              <li key={featureIndex}>
                                {feature}
                              </li>
                            )
                          )}
                        </ul>

                      </div>

                      <div>
                        <h4>Estimated Budget</h4>
                        <p>{idea.estimatedBudget}</p>
                      </div>

                    </div>
                  )}

                </article>
              );
            })}

          </div>

        </section>
      )}

    </div>
  );
}

export default AIIdeaGenerator;
