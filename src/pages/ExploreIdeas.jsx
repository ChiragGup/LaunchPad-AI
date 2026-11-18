
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
  faLightbulb,
  faPaperPlane,
  faComment,
  faHeart,
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
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [getIdeasdata, setGetIdeasdata] = useState([]);
  const [expandedText, setExpandedText] = useState({});

  // Comments states
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [commentsOpen, setCommentsOpen] = useState({});
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComments, setPostingComments] = useState({});

  // Likes states: each idea has its own Boolean value
  const [likes, setLikes] = useState({});
  const [liking, setLiking] = useState({});

  // Fetch startup ideas
  useEffect(() => {
    const getIdeas = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/exploreIdeas`,
          { withCredentials: true }
        );
console.log(response.data)
        setGetIdeasdata(response.data.data || []);
        console.log(response.data)
      } catch (error) {
        console.error(
          "Error fetching ideas:",
          error.response?.data || error.message
        );
        toast.error("Could not load startup ideas");
      }
    };
 fetchLikes();
    getIdeas();
  }, [API_URL]);

  // Fetch all comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);

      const response = await axios.get(
        `${API_URL}/getComments`,
        { withCredentials: true }
      );

      const fetchedComments = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.comments || [];

      setComments(fetchedComments);
      return fetchedComments;
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error.response?.data || error.message
      );
      return [];
    } finally {
      setLoadingComments(false);
    }
  };

  // Fetch comments when component loads
  useEffect(() => {
    fetchComments();
  }, [API_URL]);

  // Fetch current user's likes from database
  // const fetchLikes = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_URL}/getLikes`,
  //       { withCredentials: true }
  //     );

  //     const fetchedLikes = response.data.data || [];

  //     const likesObject = {};

  //     fetchedLikes.forEach((item) => {
  //       const cardId = item.cardId?._id || item.cardId;

  //       if (cardId) {
  //         likesObject[String(cardId)] = Boolean(item.likes);
  //       }
  //     });

  //     setLikes(likesObject);
  //   } catch (error) {
  //     console.error(
  //       "Error fetching likes:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   fetchLikes();
  // }, [API_URL]);

  // Add a comment
  const postComment = async (id) => {
    const text = commentInput[id]?.trim();

    if (!text || postingComments[id]) return;

    try {
      setPostingComments((previous) => ({
        ...previous,
        [id]: true,
      }));

      const response = await axios.post(
        `${API_URL}/comments`,
        {
          cardId: id,
          comments: text,
        },
        {
          withCredentials: true,
        }
      );

      setCommentInput((previous) => ({
        ...previous,
        [id]: "",
      }));

      await fetchComments();

      setCommentsOpen((previous) => ({
        ...previous,
        [id]: true,
      }));



      toast.success(response.data.message || "Comment posted successfully");
    } catch (error) {
      console.error(
        "Error posting comment:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Could not post comment"
      );
    } finally {
      setPostingComments((previous) => ({
        ...previous,
        [id]: false,
      }));
    }
  };

  // Like or unlike an individual idea
  const postLike = async (id) => {
    if (liking[id]) return;

    const previousLike = Boolean(likes[id]);
    const updatedLike = !previousLike;

    // Update total likes immediately
setGetIdeasdata((previous) =>
  previous.map((idea) =>
    String(idea._id) === id
      ? {
          ...idea,
          totalLikes: (idea.totalLikes || 0) + (updatedLike ? 1 : -1),
        }
      : idea
  )
);

    // Optimistic UI update
    setLikes((previous) => ({
      ...previous,
      [id]: updatedLike,
    }));

    setLiking((previous) => ({
      ...previous,
      [id]: true,
    }));
console.log(likes)
     console.log([id])

    try {
      const response = await axios.post(
        `${API_URL}/postLike`,
        {
          cardId: id,
          like: updatedLike,
        },
        {
          withCredentials: true,
        }
      );

     
      if (response.data.data) {
        setLikes((previous) => ({
          ...previous,
          [id]: Boolean(response.data.data.likes),
        }));
      }

      toast.success(updatedLike ? "You liked this idea" : "Like removed", {
        autoClose: 1200,
      });
            fetchLikes();
    } catch (error) {
      // Roll back UI if API request fails
      setLikes((previous) => ({
        ...previous,
        [id]: previousLike,
      }));

      console.error(
        "Error updating like:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message || "Could not update like"
      );
    } finally {
      setLiking((previous) => ({
        ...previous,
        [id]: false,
      }));
    }
  };


const fetchLikes = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/getLikes`,
      {
        withCredentials: true,
      }
    );

    const fetchedLikes = response.data.data || [];

    const likesObject = {};

    fetchedLikes.forEach((item) => {
      likesObject[item.cardId] = item.likes;
    });

    setLikes(likesObject);

  } catch (error) {
    console.log(error);
  }
};


  // Search ideas
  const filteredIdeas = getIdeasdata.filter((idea) =>
    `${idea.title} ${idea.category} ${idea.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Save or unsave an idea (local state only)
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

  // Open or close comments for an individual idea
  const toggleComments = (id) => {
    setCommentsOpen((previous) => ({
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
            const id = String(idea._id);
            const isSaved = savedIdeas.includes(idea._id);
            const isLiked = Boolean(likes[id]);

            // Match fetched comments with current idea ID
            const ideaComments = comments.filter((item) => {
              const commentCardId = item.cardId?._id || item.cardId;

              return String(commentCardId) === id;
            });

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
                    id={`${id}-description`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Problem */}
                <div className="idea-detail">
                  <strong>Problem</strong>

                  <ReadMoreText
                    text={idea.problemStatement}
                    id={`${id}-problem`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Proposed solution */}
                <div className="idea-detail">
                  <strong>Proposed solution</strong>

                  <ReadMoreText
                    text={idea.proposedSolution}
                    id={`${id}-solution`}
                    expandedText={expandedText}
                    toggleReadMore={toggleReadMore}
                  />
                </div>

                {/* Comments */}
                <div className="idea-comments">
                  <h4>
                    <FontAwesomeIcon icon={faComment} />
                    {" "}Comments ({ideaComments.length})
                  </h4>

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      postComment(id);
                    }}
                  >
                    <textarea
                      className="comment-input"
                      placeholder="Write your comment..."
                      value={commentInput[id] || ""}
                      onChange={(event) =>
                        setCommentInput((previous) => ({
                          ...previous,
                          [id]: event.target.value,
                        }))
                      }
                      maxLength={1000}
                    />

                    <div className="comment-form-footer">
                      <span>
                        {(commentInput[id] || "").length}/1000
                      </span>

                      <button
                        type="submit"
                        className="comment-submit"
                        disabled={
                          !commentInput[id]?.trim() ||
                          postingComments[id]
                        }
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />

                        {postingComments[id]
                          ? "Posting..."
                          : "Post Comment"}
                      </button>
                    </div>
                  </form>

                  {/* View Comments */}
                  <button
                    type="button"
                    className="view-comments-button"
                    onClick={() => toggleComments(id)}
                  >
                    {commentsOpen[id]
                      ? "Hide Comments"
                      : "View Comments"}
                  </button>

                  {/* Display matching comments */}
                  {commentsOpen[id] && (
                    <div className="comment-list">
                      {loadingComments ? (
                        <p>Loading comments...</p>
                      ) : ideaComments.length > 0 ? (
                        ideaComments.map((item) => (
                          <div
                            className="comment-item"
                            key={item._id}
                          >
                            <div className="comment-user-info">
                              <strong>
                                {item.userId?.fullName || "User"}
                              </strong>

                              {item.createdAt && (
                                <span>
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            <p>{item.comments}</p>
                          </div>
                        ))
                      ) : (
                        <p className="no-comments">
                          No comments yet. Be the first to comment!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="idea-card-footer">
                  <span className="idea-creator">
                    Status: {idea.status}
                  </span>

                  <div className="idea-card-actions">
                    {/* Like button */}
                    <button
                      type="button"
                      className={`idea-like-button ${
                        isLiked ? "is-liked" : ""
                      }`}
                      onClick={() => postLike(id)}
                      disabled={liking[id]}
                      aria-pressed={isLiked}
                      aria-label={isLiked ? "Unlike idea" : "Like idea"}
                    >
                      <FontAwesomeIcon icon={faHeart} />

                      <span>
                        {isLiked ? "Liked" : "Like"}
                          
                      </span>
                      <span className="like-count">
    {idea.totalLikes || 0} Likes
  </span>
                    </button>

                    {/* Save button */}
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
