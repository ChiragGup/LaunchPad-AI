
import React, { useEffect, useState } from "react";
import "../style/ManageStartups.css";
import axios from "axios";
import { toast } from "react-toastify";

function ManageStartups() {
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [message, setMessage] = useState("");
  const [showDetails, setShowDetails] = useState(null);

  // Store selected status before clicking Send Status
  const [draftStatuses, setDraftStatuses] = useState({});

  // Fetch all startup submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/adminexploreIdeas",
          {
            withCredentials: true,
          }
        );

        console.log("Admin Ideas:", response.data);

        if (response.data.success) {
          setStartups(response.data.data);
        }
      } catch (error) {
        console.error(
          "Fetch Error:",
          error.response?.data || error.message
        );

        toast.error("Failed to fetch startup ideas");
      }
    };

    fetchData();
  }, []);

  // Change dropdown selection (local only)
  const handleStatusChange = (id, status) => {
    setDraftStatuses((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  // Update status in MongoDB when Send Status is clicked
  const handleSendStatus = async (id) => {
    const status = draftStatuses[id];

    if (!status) {
      toast.error("Please select a status");
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:5000/updateIdeaStatus",
        {
          id: id,
          status: status,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setStartups((prev) =>
          prev.map((startup) =>
            startup._id === id
              ? { ...startup, status: status }
              : startup
          )
        );

        // Remove draft after successful update
        setDraftStatuses((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });

        toast.success("Startup status updated successfully!");
      }
    } catch (error) {
      console.error(
        "Status update failed:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update startup status"
      );
    }
  };

  // Status CSS class
  const statusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  };

  // Send message data
  const handleSendMessage = async (ideaId, createdBy) => {
  if (!message.trim()) {
    toast.error("Please enter a message");
    return;
  }

  const userId =
    typeof createdBy === "object"
      ? createdBy?._id
      : createdBy;

  if (!ideaId || !userId) {
    toast.error("Startup ID or user ID is missing");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/message",
      {
        userid: userId,
        cardid: ideaId,
        messagedata: message.trim()
      },
      { withCredentials: true }
    );

    if (response.data.success) {
      toast.success("Message sent successfully!");
      console.log("Saved Message:", response.data.data);

      setMessage("");
      setSelectedStartup(null);
    }
  } catch (error) {
    console.error(
      "Message Error:",
      error.response?.data || error.message
    );

    toast.error(
      error.response?.data?.message || "Failed to send message"
    );
  }
};

  return (
    <div className="manage-startups-page">

      {/* Header */}
      <div className="manage-header">
        <div>
          <h2>Manage Startups</h2>
          <p>
            Review startup ideas and manage user submissions.
          </p>
        </div>

        <div className="startup-total">
          <i className="fa-solid fa-rocket"></i>
          <span>{startups.length} Submissions</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="startup-stats">

        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <div>
            <h3>{startups.length}</h3>
            <p>Total Ideas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <h3>
              {startups.filter(
                (s) => s.status === "Pending"
              ).length}
            </h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <h3>
              {startups.filter(
                (s) => s.status === "Approved"
              ).length}
            </h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
          <div>
            <h3>
              {startups.filter(
                (s) => s.status === "Rejected"
              ).length}
            </h3>
            <p>Rejected</p>
          </div>
        </div>

      </div>

      {/* Startup List Header */}
      <div className="startup-list-header">
        <h4>All Submissions</h4>
        <span>Manage submitted startup ideas</span>
      </div>

      {/* Startup List */}
      <div className="startup-list">

        {startups.length === 0 ? (
          <p className="text-center py-4">
            No startup submissions found.
          </p>
        ) : (
          startups.map((startup) => {
            const selectedStatus =
              draftStatuses[startup._id] ?? startup.status;

            return (
              <div
                className="startup-admin-card"
                key={startup._id}
              >

                {/* Card Header */}
                <div className="startup-card-top">

                  <div className="startup-title-area">
                    <div className="startup-avatar">
                      <i className="fa-solid fa-rocket"></i>
                    </div>

                    <div>
                      <h5>{startup.title}</h5>
                      <span className="startup-category">
                        {startup.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`startup-status ${statusClass(
                      startup.status
                    )}`}
                  >
                    {startup.status}
                  </span>

                </div>

                {/* Description */}
                <p className="startup-description">
                  {startup.description}
                </p>

                {/* Submitter Information */}
                <div className="startup-user-info">

                  <div>
                    <i className="fa-solid fa-user"></i>
                    <span>
                      {startup.createdBy?.fullName ||
                        "User information unavailable"}
                    </span>
                  </div>

                  <div>
                    <i className="fa-solid fa-envelope"></i>
                    <span>
                      {startup.createdBy?.email ||
                        "Email unavailable"}
                    </span>
                  </div>

                  <div>
                    <i className="fa-regular fa-calendar"></i>
                    <span>
                      {startup.createdAt
                        ? new Date(
                            startup.createdAt
                          ).toLocaleDateString()
                        : "Date unavailable"}
                    </span>
                  </div>

                </div>

                {/* View Details Button */}
                <button
                  className="view-details-btn"
                  onClick={() =>
                    setShowDetails(
                      showDetails === startup._id
                        ? null
                        : startup._id
                    )
                  }
                >
                  {showDetails === startup._id
                    ? "Hide Details"
                    : "View Full Details"}

                  <i
                    className={`fa-solid ${
                      showDetails === startup._id
                        ? "fa-chevron-up"
                        : "fa-chevron-down"
                    }`}
                  ></i>
                </button>

                {/* Full Details */}
                {showDetails === startup._id && (
                  <div className="startup-full-details">

                    <p>
                      <strong>Problem Statement:</strong>
                      <br />
                      {startup.problemStatement}
                    </p>

                    <p>
                      <strong>Proposed Solution:</strong>
                      <br />
                      {startup.proposedSolution}
                    </p>

                    <p>
                      <strong>Target Audience:</strong>
                      <br />
                      {startup.targetAudience}
                    </p>

                    <p>
                      <strong>Business Model:</strong>
                      <br />
                      {startup.businessModel || "Not provided"}
                    </p>

                  </div>
                )}

                {/* Admin Actions */}
                <div className="startup-admin-actions">

                  {/* Status Section */}
                  <div className="status-control">

                    <label>Update Status</label>

                    <select
                      className="form-select"
                      value={selectedStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          startup._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Approved">
                        Approved
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>
                    </select>

                    <button
                      className="send-status-btn"
                      onClick={() =>
                        handleSendStatus(startup._id)
                      }
                      disabled={
                        !draftStatuses[startup._id] ||
                        draftStatuses[startup._id] === startup.status
                      }
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                      Send Status
                    </button>

                  </div>

                  {/* Message Section */}
                  <div className="message-control">

                    <label>Send Message</label>

                    <button
                      className="send-message-btn"
                      onClick={() => {
                        setSelectedStartup(startup);
                        setMessage("");
                      }}
                    >
                      <i className="fa-solid fa-envelope"></i>
                      Write Message
                    </button>

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

      {/* Message Modal */}
      {selectedStartup && (
        <div className="message-modal-overlay">

          <div className="message-modal">

            <div className="modal-heading">
              <div>
                <h4>Send Message</h4>
                <p>
                  To: {
                    selectedStartup.createdBy?.fullName || "User"
                  }
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() => {
                  setSelectedStartup(null);
                  setMessage("");
                }}
              >
                &times;
              </button>
            </div>

            <label>Startup</label>

            <input
              className="form-control mb-3"
              value={selectedStartup.title}
              readOnly
            />

            <label>Your Message</label>

            <textarea
              className="form-control"
              rows="5"
              placeholder="Write your message to the user..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => {
                  setSelectedStartup(null);
                  setMessage("");
                }}
              >
                Cancel
              </button>

              <button
                className="send-message-btn"
                onClick={() =>
                  handleSendMessage(
                    selectedStartup._id,
                    selectedStartup.createdBy
                  )
                }
                disabled={!message.trim()}
              >
                <i className="fa-solid fa-paper-plane"></i>
                Send Message
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageStartups;
