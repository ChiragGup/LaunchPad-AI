
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/MyStartupsPage.css";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/getUserProfile";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  targetAudience: "",
};

function MyStartups() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Separate IDs for Edit and Delete
  const [editStartupId, setEditStartupId] = useState(null);
  const [deleteStartupId, setDeleteStartupId] = useState(null);

  // Selected startup for each modal
  const [editingStartup, setEditingStartup] = useState(null);
  const [deletingStartup, setDeletingStartup] = useState(null);

  // Read More / Read Less
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyForm,
  });

  

  // EDIT: receive current startup ID
  const handleEdit = (id) => {
    console.log("Edit Startup ID:", id);

    setEditStartupId(id);

    const selectedStartup = startups.find(
      (startup) => startup._id === id
    );

    if (!selectedStartup) return;

    setEditingStartup(selectedStartup);

    // Populate all form fields using React Hook Form
    reset({
      title: selectedStartup.title || "",
      description: selectedStartup.description || "",
      category: selectedStartup.category || "",
      targetAudience: selectedStartup.targetAudience || "",
    });
  };

  // Close Edit modal
  const closeEditModal = () => {
    setEditStartupId(null);
    setEditingStartup(null);
    reset(emptyForm);
  };

  // Handle Save Changes
  const handleSaveChanges = async(data) => {
    if (!editStartupId) return;

    console.log("Edit Startup ID:", editStartupId);
    console.log("Updated Form Data:", data);

    // UI-only update; no backend API call
  try {
 const response =  await axios.put("http://localhost:5000/formData",{
      id:editStartupId,
     title:data.title,
     category:data.category,
     description:data.description,
     target:data.targetAudience

    },
  {withCredentials:true})
    console.log(response.data)
    if (response.data) {
      console.log(response.data.message)
       closeEditModal();
      await fetchStartups();
     
    }
    toast.success(response.data.message)
    
  } catch (error) {
     toast.error(response.data.message)
    console.log(error)
  }

    
  };

  // DELETE: receive current startup ID
  
const handleDelete = async (id) => {
  console.log("Delete Startup ID:", id);

  const selectedStartup = startups.find(
    (startup) => startup._id === id
  );

  setDeletingStartup(selectedStartup || null);
  setDeleteStartupId(id);

  try {
   const response = await axios.delete(
    "http://localhost:5000/deleteformData",
    {
      data: {
        id: id
      },
      withCredentials: true
    }
  );

    console.log(response.data);
    toast.success(response.data.message);

    // Remove the deleted startup from frontend state
    setStartups((prev) =>
      prev.filter((startup) => startup._id !== id)
    );

    setDeletingStartup(null);
    setDeleteStartupId(null);

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Unable to delete startup"
    );
  }
};

const fetchStartups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getUserProfile",
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setStartups(response.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
  

  fetchStartups();
},[]);

  // Close Delete modal
  const closeDeleteModal = () => {
    setDeleteStartupId(null);
    setDeletingStartup(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteStartupId) return;

    console.log("Confirm Delete Startup ID:", deleteStartupId);

    // UI-only deletion; no backend API call
    setStartups((previous) =>
      previous.filter(
        (startup) => startup._id !== deleteStartupId
      )
    );

    closeDeleteModal();
  };

  // Loading screen
  if (loading) {
    return (
      <div className="my-startups-page container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your startups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-startups-page container-fluid">

      {/* Header */}
      <div className="my-startups-header">
        <div>
          <span className="ms-eyebrow">YOUR WORKSPACE</span>
          <h1>My Startups</h1>
          <p>
            Manage your startup ideas and keep your projects organized.
          </p>
        </div>

        <div className="ms-total-card">
          <span className="ms-total-icon">✦</span>
          <div>
            <strong>{startups.length}</strong>
            <span>Total startups</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="ms-toolbar">
        <div className="ms-search-placeholder">
          <span aria-hidden="true">⌕</span>
          <span>Browse your startup ideas</span>
        </div>

        <span className="ms-results-count">
          Showing <strong>{startups.length}</strong>{" "}
          startup{startups.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Startup Cards */}
      {!error && startups.length === 0 ? (
        <div className="ms-empty-state">
          <div className="ms-empty-illustration">✦</div>
          <h3>No startups to show</h3>
          <p>Your submitted startup ideas will appear here.</p>
        </div>
      ) : (
        !error && (
          <div className="row g-4">
            {startups.map((startup) => {
              const title = startup.title || "Untitled Startup";

              const description =
                startup.description || "No description provided.";

              const isLong = description.length > 150;

              const isExpanded = Boolean(
                expandedDescriptions[startup._id]
              );

              return (
                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={startup._id}
                >
                  <article className="ms-startup-card">

                    <div className="ms-card-top">
                      <div className="ms-startup-symbol">
                        {title.trim().charAt(0).toUpperCase()}
                      </div>

                      <span className="ms-status ms-status-draft">
                        <span className="ms-status-dot" />
                        {startup.status || "Submitted"}
                      </span>
                    </div>

                    <div className="ms-card-content">
                      <span className="ms-category">
                        {startup.category || "Uncategorized"}
                      </span>

                      <h2>{title}</h2>

                      <p className="ms-tagline">
                        {startup.tagline || ""}
                      </p>

                      {/* Read More / Read Less */}
                      <div className="ms-description">
                        <p className="mb-0">
                          {isLong && !isExpanded
                            ? `${description.slice(0, 150).trimEnd()}...`
                            : description}
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            className="ms-read-toggle"
                            onClick={() =>
                              setExpandedDescriptions((previous) => ({
                                ...previous,
                                [startup._id]: !previous[startup._id],
                              }))
                            }
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </div>

                      <div className="ms-details-grid">
                        <div>
                          <span className="ms-detail-label">
                            Target Audience
                          </span>

                          <strong>
                            {startup.targetAudience || "Not specified"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="ms-card-footer">
                      <span className="ms-created-date">
                        {startup.createdAt
                          ? `Added ${new Date(
                              startup.createdAt
                            ).toLocaleDateString()}`
                          : ""}
                      </span>

                      <div className="ms-card-actions">
                        <button
                          type="button"
                          className="btn ms-edit-btn"
                          onClick={() => handleEdit(startup._id)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn ms-delete-btn"
                          onClick={() => handleDelete(startup._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </article>
                </div>
              );
            })}
          </div>
        )
      )}

      {/* EDIT MODAL */}
      {editingStartup && (
        <div
          className="ms-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <section
            className="ms-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ms-edit-title"
          >

            <div className="ms-modal-header">
              <div>
                <span className="ms-eyebrow">STARTUP DETAILS</span>
                <h2 id="ms-edit-title">Edit Startup</h2>
                <p>Update your startup information.</p>
                <small>Startup ID: {editStartupId}</small>
              </div>

              <button
                type="button"
                className="ms-modal-close"
                aria-label="Close"
                onClick={closeEditModal}
              >
                ×
              </button>
            </div>

            {/* React Hook Form */}
            <form onSubmit={handleSubmit(handleSaveChanges)}>

              <div className="ms-modal-body">
                <div className="row g-3">

                  {/* Title */}
                  <div className="col-12">
                    <label className="form-label" htmlFor="ms-title">
                      Startup name
                    </label>

                    <input
                      id="ms-title"
                      className="form-control ms-form-control"
                      {...register("title", {
                        required: "Startup name is required.",
                      })}
                    />

                    {errors.title && (
                      <small className="text-danger">
                        {errors.title.message}
                      </small>
                    )}
                  </div>

                  {/* Category */}
                  <div className="col-12">
                    <label
                      className="form-label"
                      htmlFor="ms-category"
                    >
                      Category
                    </label>

                    <input
                      id="ms-category"
                      className="form-control ms-form-control"
                      {...register("category")}
                    />
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label
                      className="form-label"
                      htmlFor="ms-description"
                    >
                      Description
                    </label>

                    <textarea
                      id="ms-description"
                      className="form-control ms-form-control"
                      rows={4}
                      {...register("description", {
                        required: "Description is required.",
                      })}
                    />

                    {errors.description && (
                      <small className="text-danger">
                        {errors.description.message}
                      </small>
                    )}
                  </div>

                  {/* Target Audience */}
                  <div className="col-12">
                    <label
                      className="form-label"
                      htmlFor="ms-target-audience"
                    >
                      Target Audience
                    </label>

                    <input
                      id="ms-target-audience"
                      className="form-control ms-form-control"
                      {...register("targetAudience")}
                    />
                  </div>

                </div>
              </div>

              <div className="ms-modal-footer">
                <button
                  type="button"
                  className="btn ms-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn ms-save-btn"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </section>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingStartup && (
        <div
          className="ms-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDeleteModal();
            }
          }}
        >
          <section
            className="ms-modal ms-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ms-delete-title"
          >

            <div className="ms-delete-icon">!</div>

            <h2 id="ms-delete-title">
              Delete this startup?
            </h2>

            <p>
              Are you sure you want to remove{" "}
              <strong>
                {deletingStartup.title || "Untitled Startup"}
              </strong>{" "}
              from this list?
            </p>

            <small>Startup ID: {deleteStartupId}</small>

            <div className="ms-modal-footer ms-delete-footer">
              <button
                type="button"
                className="btn ms-cancel-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn ms-confirm-delete-btn"
                onClick={handleConfirmDelete}
              >
                Delete Startup
              </button>
            </div>

          </section>
        </div>
      )}

    </div>
  );
}

export default MyStartups;
