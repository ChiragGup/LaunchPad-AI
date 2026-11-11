
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faLightbulb,
  faCircleCheck,
  faRotateLeft,
  faRocket,
  faBullseye,
  faUsers,
  faPuzzlePiece,
  faShieldHalved,
  faPenToSquare,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import "../style/SubmitIdeas.css";
import axios from "axios";

const defaultValues = {
  title: "",
  category: "",
  problem: "",
  solution: "",
  description: "",
  targetAudience: "",
};


function SubmitIdeas() {
   const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // UI only: this does not save anything to the database.
  
const onSubmit = async (data) => {
  console.log("Idea form data:", data);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/submitIdeas`,
      data,
      {
        withCredentials: true,
      }
    );
 toast.success(
        response.data.message || "Successfully Submitted!"
      );

    console.log(response.data);

    setSubmitMessage(
      "Your idea has been submitted successfully!"
    );

  } catch (error) {
    console.log(error.response?.data || error.message);

          toast.error(
            error.response?.data?.message ||
              "Logout failed. Please try again."
          );
  }
};

  const handleClear = () => {
    reset(defaultValues);
    setSubmitMessage("");
  };

  return (
    <div className="lp-submit-ideas">
      {/* Hero Section */}
      <section className="lp-submit-hero">
        <div className="lp-submit-hero-copy">
          <span className="lp-submit-eyebrow">
            <FontAwesomeIcon icon={faLightbulb} />
            SHARE YOUR VISION
          </span>

          <h1>Submit Your Startup Idea</h1>

          <p>
            Have an idea that could solve a real-world problem?
            Share it with the community and bring your vision to life.
          </p>
        </div>

        <div className="lp-submit-hero-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faRocket} />
        </div>
      </section>

      {/* Main Layout */}
      <div className="lp-submit-layout">
        {/* Idea Submission Form */}
        <form
          className="lp-submit-form-card"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Form Heading */}
          <div className="lp-submit-card-heading">
            <div className="lp-submit-heading-icon">
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>

            <div>
              <h2>Tell Us About Your Idea</h2>
              <p>Fields marked with * are required.</p>
            </div>
          </div>

          {/* Success Message */}
          {submitMessage && (
            <div className="lp-submit-notice" role="status">
              <FontAwesomeIcon icon={faCircleCheck} />
              <p>{submitMessage}</p>
            </div>
          )}

          {/* Idea Title */}
          <div className="lp-submit-field">
            <label htmlFor="title">Idea Title *</label>

            <input
              id="title"
              type="text"
              placeholder="e.g. AI-powered learning platform"
              maxLength={120}
             
              {...register("title", {
                required: "Please enter an idea title.",
                minLength: {
                  value: 5,
                  message: "Title must contain at least 5 characters.",
                },
                maxLength: {
                  value: 120,
                  message: "Title cannot exceed 120 characters.",
                },
              })}
            />

            {errors.title && (
              <p className="lp-submit-error" role="alert">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="lp-submit-field">
            <label htmlFor="category">Category *</label>

            <div className="lp-submit-select-wrap">
              <FontAwesomeIcon icon={faChevronDown} />

              <select
                id="category"
                
                {...register("category", {
                  required: "Please select a category.",
                })}
              >
                <option value="">Select a category</option>
                <option value="AI & Technology">AI & Technology</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Food & Sustainability">
                  Food & Sustainability
                </option>
                <option value="E-commerce">E-commerce</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {errors.category && (
              <p className="lp-submit-error" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Problem Statement */}
          <div className="lp-submit-field">
            <label htmlFor="problem">Problem Statement *</label>

            <textarea
              id="problem"
              rows={4}
              placeholder="What problem are you trying to solve?"
              maxLength={1500}
              
              {...register("problem", {
                required: "Please describe the problem.",
                minLength: {
                  value: 20,
                  message: "Please provide at least 20 characters.",
                },
                maxLength: {
                  value: 1500,
                  message: "Maximum 1500 characters allowed.",
                },
              })}
            />

            {errors.problem && (
              <p className="lp-submit-error" role="alert">
                {errors.problem.message}
              </p>
            )}
          </div>

          {/* Proposed Solution */}
          <div className="lp-submit-field">
            <label htmlFor="solution">Proposed Solution *</label>

            <textarea
              id="solution"
              rows={4}
              placeholder="How will your idea solve this problem?"
              maxLength={1500}
              
              {...register("solution", {
                required: "Please describe your solution.",
                minLength: {
                  value: 20,
                  message: "Please provide at least 20 characters.",
                },
                maxLength: {
                  value: 1500,
                  message: "Maximum 1500 characters allowed.",
                },
              })}
            />

            {errors.solution && (
              <p className="lp-submit-error" role="alert">
                {errors.solution.message}
              </p>
            )}
          </div>

          {/* Additional Details */}
          <div className="lp-submit-field">
            <label htmlFor="description">Additional Details *</label>

            <textarea
              id="description"
              rows={5}
              placeholder="Explain how your idea would work and what makes it unique."
              maxLength={3000}
             
              {...register("description", {
                required: "Please add more details about your idea.",
                minLength: {
                  value: 30,
                  message: "Please provide at least 30 characters.",
                },
                maxLength: {
                  value: 3000,
                  message: "Maximum 3000 characters allowed.",
                },
              })}
            />

            {errors.description && (
              <p className="lp-submit-error" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Target Audience */}
          <div className="lp-submit-field">
            <label htmlFor="targetAudience">
              Target Audience
              <span className="lp-submit-optional">Optional</span>
            </label>

            <input
              id="targetAudience"
              type="text"
              placeholder="e.g. Students, small businesses"
              maxLength={200}
             
              {...register("targetAudience", {
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed.",
                },
              })}
            />

            {errors.targetAudience && (
              <p className="lp-submit-error" role="alert">
                {errors.targetAudience.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="lp-submit-actions">
            <button
              type="button"
              className="lp-submit-reset"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Clear Form
            </button>

            <button
              type="submit"
              className="lp-submit-publish"
              disabled={isSubmitting}
            >
              Submit Idea
              <FontAwesomeIcon
                icon={faRocket}
                className="lp-submit-arrow"
              />
            </button>
          </div>
        </form>

        {/* Tips Sidebar */}
        <aside className="lp-submit-tips">
          <div className="lp-submit-tips-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </div>

          <h3>Tips for a Great Idea</h3>

          <p>
            A strong startup idea begins with understanding a real problem
            and finding a useful solution.
          </p>

          <div className="lp-submit-tip">
            <span>
              <FontAwesomeIcon icon={faBullseye} />
            </span>

            <div>
              <strong>Identify the Problem</strong>
              <p>Clearly explain the problem your idea addresses.</p>
            </div>
          </div>

          <div className="lp-submit-tip">
            <span>
              <FontAwesomeIcon icon={faPuzzlePiece} />
            </span>

            <div>
              <strong>Offer a Practical Solution</strong>
              <p>Explain how your idea can solve the problem.</p>
            </div>
          </div>

          <div className="lp-submit-tip">
            <span>
              <FontAwesomeIcon icon={faUsers} />
            </span>

            <div>
              <strong>Know Your Audience</strong>
              <p>Describe who will benefit from your idea.</p>
            </div>
          </div>

          <div className="lp-submit-tip">
            <span>
              <FontAwesomeIcon icon={faLightbulb} />
            </span>

            <div>
              <strong>Highlight What Is Unique</strong>
              <p>Share what makes your idea different from existing solutions.</p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="lp-submit-privacy-note">
            <FontAwesomeIcon icon={faShieldHalved} />

            <p>
              Your idea will be ready for review once backend submission
              and publishing functionality is connected.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SubmitIdeas;
