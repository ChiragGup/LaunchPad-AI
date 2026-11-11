
import React, { useEffect, useMemo, useState } from "react";
import "../style/ManageUsers.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faUserCheck,
  faShieldHalved,
  faUserPlus,
  faMagnifyingGlass,
  faEye,
  faTrashCan,
  faXmark,
  faTriangleExclamation,
  faUserXmark
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // FETCH USERS FROM BACKEND
  // --------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/data`,
          {
            withCredentials: true
          }
        );

        console.log("Users Data:", response.data);

        if (response.data.success) {
          setUsers(response.data.data);
        }

      } catch (error) {
        console.error(
          "Fetch Users Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --------------------------------
  // USER STATISTICS
  // --------------------------------

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalRegularUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  const newUsers = users.filter((user) => {
    if (!user.createdAt) return false;

    const userDate = new Date(user.createdAt);
    const today = new Date();

    return (
      userDate.getMonth() === today.getMonth() &&
      userDate.getFullYear() === today.getFullYear()
    );
  }).length;

  // --------------------------------
  // SEARCH USERS
  // --------------------------------

  const filteredUsers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return users.filter((user) => {
      const fullName = user.fullName || "";
      const email = user.email || "";

      return (
        fullName.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue)
      );
    });
  }, [users, search]);

  // --------------------------------
  // FORMAT DATE
  // --------------------------------

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // --------------------------------
  // DELETE USER (TEMPORARY UI ONLY)
  // --------------------------------

  const handleDeleteUser = async () => {
  if (!userToDelete) return;

  try {
    const response = await axios.delete(
       `${import.meta.env.VITE_API_URL}/datadelete`,
      {
        data: {
          id: userToDelete._id
        },
        withCredentials: true
      }
    );
toast.success(response.data.message)
    console.log(response.data);

    if (response.data.success) {
      setUsers((prev) =>
        prev.filter((user) => user._id !== userToDelete._id)
      );

      setUserToDelete(null);
    }
  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error(response.data.message)
  }
};
  // --------------------------------
  // CLOSE MODALS
  // --------------------------------

  const closeDetailsModal = () => {
    setSelectedUser(null);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
  };

  return (
    <div className="manage-users-page">

      {/* PAGE HEADER */}

      <div className="manage-users-header">
        <div>
          <h2>Manage Users</h2>
          <p>
            View and manage all registered users on LaunchPad AI.
          </p>
        </div>

        <div className="total-user-badge">
          <FontAwesomeIcon icon={faUsers} />
          <span>{totalUsers} Registered Users</span>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="user-stats-grid">

        <div className="user-stat-card">
          <div className="user-stat-icon purple">
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <div>
            <p>Total Users</p>
            <h3>{totalUsers}</h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon blue">
            <FontAwesomeIcon icon={faUserCheck} />
          </div>

          <div>
            <p>Regular Users</p>
            <h3>{totalRegularUsers}</h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon orange">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>

          <div>
            <p>Administrators</p>
            <h3>{totalAdmins}</h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon green">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>

          <div>
            <p>New This Month</p>
            <h3>{newUsers}</h3>
          </div>
        </div>

      </div>

      {/* REGISTERED USERS */}

      <div className="users-list-container">

        <div className="users-list-header">

          <div>
            <h4>Registered Users</h4>
            <p>Manage user accounts and information</p>
          </div>

          <div className="user-search-box">

            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}

          </div>

        </div>

        {/* USERS TABLE */}

        <div className="table-responsive">

          <table className="table manage-users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="5" className="no-users">
                    Loading users...
                  </td>
                </tr>

              ) : filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr key={user._id}>

                    {/* USER PROFILE */}

                    <td>
                      <div className="user-profile-cell">

                        {user.profileImage ? (

                          <img
                            src={user.profileImage}
                            alt={user.fullName || "User"}
                          />

                        ) : (

                          <div className="user-avatar">
                            {(user.fullName || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                        )}

                        <span>{user.fullName || "Unnamed User"}</span>

                      </div>
                    </td>

                    {/* EMAIL */}

                    <td>{user.email || "Not available"}</td>

                    {/* ROLE */}

                    <td>
                      <span
                        className={`user-role ${
                          user.role === "admin"
                            ? "admin-role"
                            : "regular-role"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* JOINED DATE */}

                    <td>{formatDate(user.createdAt)}</td>

                    {/* ACTIONS */}

                    <td>
                      <div className="user-action-buttons">

                        <button
                          type="button"
                          className="view-user-btn"
                          title="View Details"
                          onClick={() => setSelectedUser(user)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>

                        <button
                          type="button"
                          className="delete-user-btn"
                          title="Delete Account"
                          onClick={() => setUserToDelete(user)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5" className="no-users">

                    <FontAwesomeIcon icon={faUserXmark} />

                    <p>
                      {search
                        ? "No matching users found"
                        : "No users found"}
                    </p>

                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        <div className="users-table-footer">
          Showing {filteredUsers.length} of {totalUsers} users
        </div>

      </div>

      {/* VIEW USER DETAILS MODAL */}

      {selectedUser && (

        <div
          className="user-modal-overlay"
          onClick={closeDetailsModal}
        >

          <div
            className="user-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="user-modal-header">

              <h4>User Details</h4>

              <button
                type="button"
                onClick={closeDetailsModal}
                aria-label="Close user details"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

            </div>

            <div className="user-modal-body">

              <div className="user-detail-avatar">

                {selectedUser.profileImage ? (

                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.fullName || "User"}
                  />

                ) : (

                  (selectedUser.fullName || "U")
                    .charAt(0)
                    .toUpperCase()

                )}

              </div>

              <h5>{selectedUser.fullName || "Unnamed User"}</h5>

              <span
                className={`user-role ${
                  selectedUser.role === "admin"
                    ? "admin-role"
                    : "regular-role"
                }`}
              >
                {selectedUser.role || "user"}
              </span>

              <div className="user-detail-info">

                <div>
                  <span>Full Name</span>
                  <strong>
                    {selectedUser.fullName || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Email Address</span>
                  <strong>
                    {selectedUser.email || "Not available"}
                  </strong>
                </div>

                <div>
                  <span>Account Role</span>
                  <strong>{selectedUser.role || "user"}</strong>
                </div>

                <div>
                  <span>Joined On</span>
                  <strong>
                    {formatDate(selectedUser.createdAt)}
                  </strong>
                </div>

              </div>

            </div>

            <div className="user-modal-footer">

              <button
                type="button"
                className="close-user-modal"
                onClick={closeDetailsModal}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE CONFIRMATION MODAL */}

      {userToDelete && (

        <div
          className="user-modal-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="delete-user-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="delete-warning-icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>

            <h4>Delete User Account?</h4>

            <p>
              Are you sure you want to delete
              <strong> {userToDelete.fullName}</strong>?

              This action will remove the account from this demo UI.
            </p>

            <div className="delete-modal-actions">

              <button
                type="button"
                className="cancel-delete-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleDeleteUser}
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageUsers;
