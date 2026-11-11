
import { useEffect, useState,useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitIdeas from "./SubmitIdeas";

import {
  faRocket,
  faTableColumns,
  faLightbulb,
  faBookmark,
  faBuilding,
  faWandMagicSparkles,
  faUserCircle,
  faHeadset,
  faBell,
  faCirclePlus ,
  faCompass,
  faChevronRight,
  faArrowUpRightFromSquare,
  faPenToSquare,
  faShieldHalved,
  faUser,
  faCircleInfo,
  faUsers,
  faLightbulb as faIdeas,
  faClockRotateLeft,
  faChartLine,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Dashboard.css";
import "../style/SubmitIdeas.css";
import ExploreIdeas from "./ExploreIdeas";
import MyStartups from "./MyStartups";
import ManageStartups from "./ManageStartups";
import ManageUsers from "./ManageUsers";
import AIIdeaGenerator from "./AIIdeaGenerator";


function Dashboard() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

const previousNotificationIds = useRef(null);
  const [expandedNotifications, setExpandedNotifications] = useState({});
  const [authError, setAuthError] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
const [editName, setEditName] = useState("");
const [editEmail, setEditEmail] = useState("");
const [editBio, setEditBio] = useState("");

  const userMenuItems = [
    { label: "Overview", icon: faTableColumns },
     { label: "Explore Ideas", icon: faCompass },
    // { label: "Saved Ideas", icon: faBookmark },
    { label: "My Startup", icon: faBuilding },
    { label: "Submit Ideas", icon: faCirclePlus  },
    { label: "AI Idea Generator", icon: faWandMagicSparkles },
    { label: "My Profile", icon: faUserCircle },
  ];

  const adminMenuItems = [
    { label: "Overview", icon: faTableColumns },
    { label: "Manage Users", icon: faUsers },
    { label: "Manage Startups", icon: faBuilding },
    // { label: "Manage Ideas", icon: faIdeas },
    // { label: "Login History", icon: faClockRotateLeft },
    { label: "My Profile", icon: faUserCircle },
  ];

  const getMessage = async()=>{
    try {
      const response = await axios.get( "http://localhost:5000/getMessage",{
        withCredentials:true
      })
      console.log(response.data)
      setNotifications(response.data.data || []);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile",
          { withCredentials: true }
        );

        setUser(response.data.user);
        setAuthError("");
      } catch (error) {
        setAuthError(
          error.response?.data?.message ||
          "Unable to load your profile. Please log in again."
        );
      } finally {
        setLoading(false);
      }
    };
getMessage()
    fetchProfile();
    const notificationInterval = setInterval(() => {
  getMessage();
}, 30000);
  }, []);

const saveProfile = async () => {
  try {
    const response = await axios.put(
      "http://localhost:5000/updateProfile",
      {
        name: editName,
        email: editEmail,
      },
      { withCredentials: true }
    );

    setUser(response.data.user);
    setIsEditingProfile(false);

    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update profile."
    );
  }
};

  const isAdmin = String(user?.role || "").trim().toLowerCase() === "admin";

const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  console.log("Current role:", user?.role);
console.log("Is Admin:", isAdmin);
console.log("Menu items:", menuItems.map((item) => item.label));

  if (loading) {
    return (
      <div className="lp-dashboard-state">
        <div className="lp-loader"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (authError || !user) {
    return (
      <div className="lp-dashboard-state">
        <div className="lp-state-icon">
          <FontAwesomeIcon icon={faShieldHalved} />
        </div>
        <h2>Unable to open dashboard</h2>
        <p>{authError || "Please log in to continue."}</p>
      </div>
    );
  }

  const renderOverview = () => (
    <>
      <section className="lp-welcome">
        <div className="lp-welcome-copy">
          <span className="lp-eyebrow">YOUR STARTUP JOURNEY</span>
          <h1>
            Welcome back, {user.fullName?.split(" ")[0] || "Founder"}!
          </h1>
          <p>
            Turn your ideas into reality. Explore opportunities and
            build your next big thing with LaunchPad AI.
          </p>

          <button
            type="button"
            className="lp-primary-button"
            onClick={() => setActiveSection("Explore Ideas")}
          >
            Explore Ideas
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="lp-welcome-art" aria-hidden="true">
          <div className="lp-art-glow"></div>
          <div className="lp-orbit lp-orbit-one"></div>
          <div className="lp-orbit lp-orbit-two"></div>
          <div className="lp-rocket-circle">
            <FontAwesomeIcon icon={faRocket} />
          </div>
          <span className="lp-art-star star-one">✦</span>
          <span className="lp-art-star star-two">✧</span>
          <span className="lp-art-star star-three">✦</span>
        </div>
      </section>

      <div className="lp-section-heading">
        <div>
          <h2>Your Overview</h2>
          <p>A quick look at your startup workspace.</p>
        </div>
      </div>

      <section className="lp-stats-grid">
        <div className="lp-stat-card">
          <div className="lp-stat-top">
            <span className="lp-stat-icon purple">
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
          </div>
          <h3>--</h3>
          <p className="lp-stat-title">Ideas Explored</p>
          <small>Your idea discovery activity</small>
        </div>

        <div className="lp-stat-card">
          <div className="lp-stat-top">
            <span className="lp-stat-icon blue">
              <FontAwesomeIcon icon={faBookmark} />
            </span>
          </div>
          <h3>--</h3>
          <p className="lp-stat-title">Saved Ideas</p>
          <small>Ideas saved for later</small>
        </div>

        <div className="lp-stat-card">
          <div className="lp-stat-top">
            <span className="lp-stat-icon green">
              <FontAwesomeIcon icon={faBuilding} />
            </span>
          </div>
          <h3>--</h3>
          <p className="lp-stat-title">My Startups</p>
          <small>Your startup projects</small>
        </div>
      </section>

      <section className="lp-feature-grid">
        <div className="lp-ai-card">
          <div className="lp-ai-decoration">✦</div>
          <span className="lp-ai-badge">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            AI POWERED
          </span>
          <h2>Have a brilliant idea?</h2>
          <p>
            Let AI help you discover, refine, and shape your next
            startup concept.
          </p>
          <button
            type="button"
            className="lp-ai-button"
            onClick={() => setActiveSection("AI Idea Generator")}
          >
            Generate an Idea
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </button>
        </div>

        <div className="lp-quick-card">
          <div className="lp-quick-heading">
            <span className="lp-quick-heading-icon">
              <FontAwesomeIcon icon={faRocket} />
            </span>
            <div>
              <h3>Quick Actions</h3>
              <p>Jump right into your workspace.</p>
            </div>
          </div>

          <button
            type="button"
            className="lp-quick-action"
            onClick={() => setActiveSection("Explore Ideas")}
          >
            <span className="lp-quick-icon">
              <FontAwesomeIcon icon={faCompass} />
            </span>
            <span className="lp-quick-text">
              <strong>Explore Ideas</strong>
              <small>Discover new opportunities</small>
            </span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="lp-quick-arrow"
            />
          </button>

          <button
            type="button"
            className="lp-quick-action"
            onClick={() => setActiveSection("My Startups")}
          >
            <span className="lp-quick-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </span>
            <span className="lp-quick-text">
              <strong>My Startups</strong>
              <small>View your startup workspace</small>
            </span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="lp-quick-arrow"
            />
          </button>

          <button
            type="button"
            className="lp-quick-action"
            onClick={() => setActiveSection("My Profile")}
          >
            <span className="lp-quick-icon">
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
            <span className="lp-quick-text">
              <strong>My Profile</strong>
              <small>View your account information</small>
            </span>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="lp-quick-arrow"
            />
          </button>
        </div>
      </section>

      <section className="lp-activity-card">
        <div className="lp-activity-heading">
          <div>
            <h3>Recent Activity</h3>
            <p>Your latest workspace updates will appear here.</p>
          </div>
        </div>

        <div className="lp-empty-activity">
          <div className="lp-empty-activity-icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <h3>Your journey starts here</h3>
          <p>
            Start exploring ideas and building your workspace to
            see your activity here.
          </p>
        </div>
      </section>
    </>
  );

 
  const renderProfile = () => (
  <section className="lp-profile-page">
    <div className="lp-profile-heading">
      <div>
        <span className="lp-eyebrow">ACCOUNT SETTINGS</span>
        <h2>{isEditingProfile ? "Edit Profile" : "My Profile"}</h2>
        <p>
          {isEditingProfile
            ? "Update your personal information."
            : "View your personal information."}
        </p>
      </div>

      {!isEditingProfile && (
        <button
          type="button"
          className="lp-edit-profile-button"
          
          onClick={() => {
            setEditName(user?.fullName || "");
            setEditEmail(user?.email || "");
            setEditBio(user?.bio || "");
            setIsEditingProfile(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Edit Profile
        </button>
      )}
    </div>

    <div className="lp-profile-card">
      <div className="lp-profile-banner"></div>

      <div className="lp-profile-main">
        <div className="lp-profile-avatar">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="lp-profile-image"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>

        <div className="lp-profile-identity">
          <h3>{user?.fullName || "Your Name"}</h3>
          <p>{user?.email || "your@email.com"}</p>
          <span className="lp-profile-role">
            <FontAwesomeIcon icon={faShieldHalved} />
            {user?.role || "User"}
          </span>
        </div>
      </div>

      <div className="lp-profile-divider"></div>

      <div className="lp-profile-details">
        <div className="lp-profile-section-title">
          <h3>Personal Information</h3>
          <p>Your account details</p>
        </div>

        {isEditingProfile ? (
          <div className="lp-profile-fields">
            <div className="lp-profile-field">
              <label htmlFor="profile-name">Full Name</label>
              <input
                id="profile-name"
                className="lp-profile-input"
                type="text"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="lp-profile-field">
              <label htmlFor="profile-email">Email Address</label>
              <input
                id="profile-email"
                className="lp-profile-input"
                type="email"
                value={editEmail}
                onChange={(event) => setEditEmail(event.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="lp-profile-field lp-profile-field-full">
              <label htmlFor="profile-bio">About Me</label>
              <textarea
                id="profile-bio"
                className="lp-profile-input lp-profile-textarea"
                value={editBio}
                onChange={(event) => setEditBio(event.target.value)}
                placeholder="Write a short introduction"
                rows={4}
              />
            </div>

            <div className="lp-profile-field">
              <label>Account Role</label>
              <div className="lp-profile-value">
                {user?.role || "User"} (read-only)
              </div>
            </div>

            <div className="lp-profile-field">
              <label>Profile Image</label>
              <div className="lp-profile-value">
                Image upload can be added later
              </div>
            </div>

            <div className="lp-profile-form-actions">
              <button
                type="button"
                className="lp-cancel-button"
                onClick={() => setIsEditingProfile(false)}
              >
                Cancel
              </button>

              <button
  type="button"
  className="lp-edit-profile-button"
  onClick={saveProfile}
>
  Save Changes
</button>
            </div>
          </div>
        ) : (
          <div className="lp-profile-fields">
            <div className="lp-profile-field">
              <label>Full Name</label>
              <div className="lp-profile-value">
                {user?.fullName || "Not provided"}
              </div>
            </div>

            <div className="lp-profile-field">
              <label>Email Address</label>
              <div className="lp-profile-value">
                {user?.email || "Not provided"}
              </div>
            </div>

            <div className="lp-profile-field">
              <label>Account Role</label>
              <div className="lp-profile-value">
                {user?.role || "User"}
              </div>
            </div>

            <div className="lp-profile-field">
              <label>Account Status</label>
              <div className="lp-profile-value lp-profile-status">
                <span className="lp-status-dot"></span>
                Active
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="lp-profile-note">
      <FontAwesomeIcon icon={faCircleInfo} />
      <p>
        {isEditingProfile
          ? "This is a UI-only form. Changes are not saved to your account yet."
          : "View your profile information here. Select Edit Profile to open the editable fields."}
      </p>
    </div>
  </section>
);

  const renderPlaceholder = () => (
    <section className="lp-placeholder-page">
      <div className="lp-placeholder-icon">
        <FontAwesomeIcon
          icon={
            menuItems.find((item) => item.label === activeSection)?.icon ||
            faRocket
          }
        />
      </div>
      <span className="lp-eyebrow">LAUNCHPAD AI WORKSPACE</span>
      <h2>{activeSection}</h2>
      <p>
        This section will be developed as part of the LaunchPad AI
        workspace.
      </p>
      <button
        type="button"
        className="lp-primary-button"
        onClick={() => setActiveSection("Overview")}
      >
        Back to Overview
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </section>
  );

  
return (
  <div className="lp-dashboard">
    <aside className="lp-sidebar">
      <div className="lp-brand">
        <div className="lp-brand-icon">
          <FontAwesomeIcon icon={faRocket} />
        </div>
        <div>
          <h2>LaunchPad <span>AI</span></h2>
          <small>Startup workspace</small>
        </div>
      </div>

      <div className="lp-menu-label">WORKSPACE</div>

      <nav className="lp-menu">
        {menuItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`lp-menu-item ${
              activeSection === item.label ? "active" : ""
            }`}
            onClick={() => setActiveSection(item.label)}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
            {activeSection === item.label && (
              <span className="lp-menu-active-indicator"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="lp-sidebar-bottom">
        <div className="lp-support-icon">
          <FontAwesomeIcon icon={faHeadset} />
        </div>
        <h4>Need some help?</h4>
        <p>We're here to help you on your startup journey.</p>
        <button
          type="button"
          className="lp-support-button"
          onClick={() => setActiveSection("Help & Support")}
        >
          Get Support
        </button>
      </div>

      <div className="lp-sidebar-user">
        <div className="lp-user-avatar">
          {user.profileImage ? (
            <img src={user.profileImage} alt="" />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </div>
        <div className="lp-user-info">
          <strong>{user.fullName}</strong>
          <small>{user.role}</small>
        </div>
      </div>
    </aside>

    <main className="lp-main">
      <header className="lp-topbar">
        <div className="lp-breadcrumb">
          <span>Workspace</span>
          <FontAwesomeIcon icon={faChevronRight} />
          <strong>{activeSection}</strong>
        </div>

        <div className="lp-topbar-right">
          {isAdmin && (
            <span className="lp-admin-label">
              <FontAwesomeIcon icon={faShieldHalved} />
              Administrator
            </span>
          )}

          {!isAdmin && (
            <div className="lp-notification-wrapper">
             <button
  type="button"
  className="lp-icon-button"
  aria-label="Notifications"
  onClick={() => {
    const willOpen = !showNotifications;

    setShowNotifications(willOpen);

    if (willOpen) {
      setHasNewNotifications(false);
    }
  }}
>
  <FontAwesomeIcon icon={faBell} />

  {hasNewNotifications && (
    <span className="lp-notification-dot"></span>
  )}
</button>

              {showNotifications && (
                <div className="lp-notification-panel">
                  <div className="lp-notification-header">
                    <div>
                      <h3>Notifications</h3>
                      <p>Your latest messages and updates</p>
                    </div>

                    <button
                      type="button"
                      className="lp-notification-close"
                      onClick={() => setShowNotifications(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>

                  <div className="lp-notification-body">
                    {notifications.length > 0 ? (
                      <div className="lp-notification-list">
                        {notifications.map((item) => (
                          <div
                            className="lp-notification-item"
                            key={item._id}
                          >
                            <div className="lp-notification-item-icon">
                              <FontAwesomeIcon icon={faBell} />
                            </div>

                            <div className="lp-notification-item-content">
                              <h4>
                                {item.adminId?.fullName ||
                                  "LaunchPad AI Admin"}

                                <span className="lp-notification-role">
                                  Admin
                                </span>
                              </h4>

                              <p>
                                {item.messagedata?.length > 120 &&
                                !expandedNotifications[item._id]
                                  ? `${item.messagedata.slice(0, 120)}...`
                                  : item.messagedata}
                              </p>

                              {item.messagedata?.length > 120 && (
                                <button
                                  type="button"
                                  className="lp-read-more"
                                  onClick={() =>
                                    setExpandedNotifications((prev) => ({
                                      ...prev,
                                      [item._id]: !prev[item._id],
                                    }))
                                  }
                                >
                                  {expandedNotifications[item._id]
                                    ? "Read Less"
                                    : "Read More"}
                                </button>
                              )}

                              <small>
                                Startup: {item.cardId?.title ||
                                  "Startup Update"}
                              </small>

                              <small>
                                {item.createdAt
                                  ? new Date(
                                      item.createdAt
                                    ).toLocaleString("en-IN")
                                  : ""}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="lp-notification-empty">
                        <FontAwesomeIcon icon={faBell} />
                        <h4>No notifications yet</h4>
                        <p>
                          Messages from the LaunchPad AI team will appear
                          here.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="lp-topbar-profile"
            onClick={() => setActiveSection("My Profile")}
          >
            <div className="lp-user-avatar">
              {user.profileImage ? (
                <img src={user.profileImage} alt="" />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <div className="lp-user-info">
              <strong>{user.fullName}</strong>
              <small>{isAdmin ? "Administrator" : "User"}</small>
            </div>
          </button>
        </div>
      </header>

      <div className="lp-content">
        {activeSection === "Overview" ? (
          renderOverview()
        ) : activeSection === "My Profile" ? (
          renderProfile()
        ) : activeSection === "Explore Ideas" ? (
          <ExploreIdeas />
        ) : activeSection === "My Startup" ? (
          <MyStartups />
        ) : activeSection === "Manage Startups" ? (
          <ManageStartups />
        ) : activeSection === "Manage Users" ? (
          <ManageUsers />
        ) : activeSection === "Submit Ideas" ? (
          <SubmitIdeas />
        ): activeSection === "AI Idea Generator" ? (
  <AIIdeaGenerator />
) 
         : (
          renderPlaceholder()
        )}
      </div>

      <footer className="lp-dashboard-footer">
        <span>© {new Date().getFullYear()} LaunchPad AI</span>
        <span>Built for tomorrow's founders</span>
      </footer>
    </main>
  </div>
);


}

export default Dashboard;
