
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../style/IdeasPages.css";

// Reusable Read More / Read Less component
function ReadMoreText({ text, id, expandedText, toggleReadMore }) {
  const isExpanded = expandedText[id];
  const maxLength = 120;

  if (!text) return null;

  const isLongText = text.length > maxLength;

  return (
    <div>
      <p>
        {isExpanded || !isLongText
          ? text
          : `${text.slice(0, maxLength)}...`}
      </p>

      {isLongText && (
        <button
          type="button"
          className="read-more-button"
          onClick={() => toggleReadMore(id)}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

function ExploreIdeas() {
  const [search, setSearch] = useState("");
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [getIdeasdata, setGetIdeasdata] = useState([]);
  const [expandedText, setExpandedText] = useState({});

  // Fetch startup ideas
  useEffect(() => {
    const getIdeas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/exploreIdeas",
          { withCredentials: true }
        );

        setGetIdeasdata(response.data.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    getIdeas();
  }, []);

  // Search ideas
  const filteredIdeas = getIdeasdata.filter((idea) =>
    `${idea.title} ${idea.category} ${idea.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Save or unsave an idea
  const toggleSave = (id) => {
    setSavedIdeas((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  };

  // Expand or collapse individual text sections
  const toggleReadMore = (id) => {
    setExpandedText((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  return (
    <section className="ideas-page">
      <div className="ideas-page-heading">
        <span className="ideas-eyebrow">
          DISCOVER SOMETHING NEW
        </span>

        <h1>Explore Ideas</h1>

        <p>
          Discover startup ideas, explore new possibilities,
          and find inspiration for your next venture.
        </p>
      </div>

      {/* Search */}
      <div className="ideas-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />

        <input
          type="search"
          placeholder="Search startup ideas..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* Results heading */}
      <div className="ideas-results-heading">
        <div>
          <h2>Startup Ideas</h2>
          <p>Ideas shared by the community</p>
        </div>

        <span>{filteredIdeas.length} ideas</span>
      </div>

      {/* Ideas grid */}
      {filteredIdeas.length > 0 ? (
        <div className="ideas-grid">
          {filteredIdeas.map((idea) => {
            const isSaved = savedIdeas.includes(idea._id);

            return (
              <article className="idea-card" key={idea._id}>
                <div className="idea-card-top">
                  <div className="idea-card-icon">
                    <FontAwesomeIcon icon={faLightbulb} />
                  </div>

                  <span className="idea-category">
                    {idea.category}
                  </span>
                </div>

                <h3>{idea.title}</h3>

                {/* Description */}
                <div className="idea-description">
                  <ReadMoreText
                    text={idea.description}
                    id={`${idea._id}-description`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Problem */}
                <div className="idea-detail">
                  <strong>Problem</strong>

                  <ReadMoreText
                    text={idea.problemStatement}
                    id={`${idea._id}-problem`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Proposed solution */}
                <div className="idea-detail">
                  <strong>Proposed solution</strong>

                  <ReadMoreText
                    text={idea.proposedSolution}
                    id={`${idea._id}-solution`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Card footer */}
                <div className="idea-card-footer">
                  <span className="idea-creator">
                    Status: {idea.status}
                  </span>

                  <button
                    type="button"
                    className={`idea-save-button ${
                      isSaved ? "is-saved" : ""
                    }`}
                    onClick={() => toggleSave(idea._id)}
                    aria-pressed={isSaved}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="ideas-empty">
          <FontAwesomeIcon icon={faMagnifyingGlass} />

          <h3>No ideas found</h3>

          <p>Try searching with a different keyword.</p>
        </div>
      )}
    </section>
  );
}

export default ExploreIdeas;
