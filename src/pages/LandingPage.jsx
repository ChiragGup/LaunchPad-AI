import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function LandingPage() {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();

  const role = user?.role?.toLowerCase();

  const loginPageNavigation = () => {
    navigate("/login");
  };

  const signupPageNavigation = () => {
    navigate("/signup");
  };

  // Fetch the currently logged-in user's profile
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/profile",
          {
            withCredentials: true,
          }
        );

        if (
        response.data.success &&
        response.data.user?.role?.toLowerCase() === "admin"
      ) {
        navigate("/login", { replace: true });
      }

        if (response.data.success && response.data.user) {
          setToken(true);
          setUser(response.data.user);
        } else {
          setToken(false);
          setUser(null);
        }
      } catch (error) {
        setToken(false);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    getData();
  }, [navigate]);

  // Logout the current user
  const logoutData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setToken(false);
      setUser(null);

      toast.success(
        response.data.message || "Successfully logged out!"
      );

      

      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);

      toast.error(
        error.response?.data?.message ||
          "Logout failed. Please try again."
      );
    }
  };

  const navClass = ({ isActive }) =>
    `nav-link fw-medium fontSize ${isActive ? "active" : ""}`;


  return (
    <>
      {/* NavBar start */}
       <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
        <div className="container-fluid d-flex justify-content-between">
          <NavLink
            className="navbar-brand fw-bold fontbold"
            to="/"
          >
            <span className="text-color">
              <i className="fa-solid fa-rocket"></i>
            </span>{" "}
            LaunchPad <span className="text-color">AI</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNavAltMarkup"
          >
            {/* Public navigation */}
            <div className="navbar-nav m-auto d-flex gap-2">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
{token && 
<NavLink to = "/dashboard"  className={navClass}>
DashBoard
</NavLink>
}
              
{/* 
              <NavLink to="/explore" className={navClass}>
                Explore Ideas
              </NavLink>

              <NavLink to="/startups" className={navClass}>
                StartUps
              </NavLink> */}

              <NavLink to="/about" className={navClass}>
                About
              </NavLink>

              <NavLink to="/how-it-works" className={navClass}>
                How it Works
              </NavLink>
{/* 
              <NavLink to="/contact" className={navClass}>
                Contact
              </NavLink> */}

            
            

            
              
            </div>

            {/* Authentication buttons */}
            <div className="p-2 d-flex align-items-center gap-2 btn-container">
              {loadingUser ? (
                <span className="text-muted">Loading...</span>
              ) : token && user ? (
                <>
                  <div className="user-name">
                    <i className="fa-solid fa-circle-user me-1"></i>
                    {user.fullName}
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-danger fontBtn"
                    onClick={logoutData}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary fontBtn"
                    onClick={loginPageNavigation}
                  >
                    LogIn
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary-background fontBtn"
                    onClick={signupPageNavigation}
                  >
                    SignUp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* NavBar end */}

      {/* landing page start */}

      <div className="container py-5 px-5 mt-5">
        <div className="row">

          <div className="col-md-6">

            <span className="badge rounded-pill text-bg-color px-2 py-2 mb-2">
              AI Powered StartUp Platform
            </span>

            <div>
              <h1>
                Turn Ideas into
              </h1>

              <h1 className="hero-title mb-2">
                StartUp with <span className="text-color">AI</span>
              </h1>

              <p className="pTag">
                LaunchPad AI helps you discover, validate, and build your startup ideas. Find the right co-founders, collaborate with innovators, and bring your vision to life using AI-powered insights.
              </p>
            </div>
            <div className='d-flex gap-2 mt-4'>
              <button type="button" className="btn btn-primary-background fontBtnMain"><span className='logo-color'><i className="fa-solid fa-rocket"></i></span> Get Started</button>
              <button type="button" className="btn btn-outline-primary fontBtnMain"> <span className='logo-color-blue'><i className="fa-solid fa-magnifying-glass"></i></span> Explore Ideas</button>
            </div>
            <div className="card stats-card mt-4 shadow">
              <div className="card-body">
                <p className="pTag mb-0">
                  Join <span className="text-color fw-bold">2,500+</span> innovators building the future
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="/demoright.png"
              alt="Demo Page"
              className="img-fluid hero-image sha"
            />
          </div>

        </div>
      </div>
      {/* landing page 2 */}
      <div className="border-top pt-2 mt-2">
        <div className="text-center">
          <p className="text-color fw-bold mb-2">FEATURES</p>
          <h4>Everything You Need to Build & Launch</h4>
          <div className="heading-line mx-auto mt-3"></div>
        </div>
        {/* Cards */}

<div className="container mt-5">
  <div className="row g-4">

    {/* Card 1 */}
    <div className="col-lg-3 col-md-6 col-12">
      <div className="card shadow border-0 rounded-4 p-3">
        <div className="d-flex align-items-center">
          <div className="text-color me-3 backColor">
            <i className="fa-solid fa-lightbulb fs-3"></i>
          </div>

          <div className="card-body p-0">
            <h6>AI Idea Generator</h6>
            <p className="mb-0 pTag">
             Generate unique startup ideas powered by AI based on current trends and real-world problems.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-lg-3 col-md-6 col-12">
      <div className="card shadow border-0 rounded-4 p-3">
        <div className="d-flex align-items-center">
          <div className="text-color me-3 backColor">
            <i className="fa-solid fa-users fs-3"></i>
          </div>

          <div className="card-body p-0">
            <h6>Find Co-Founders</h6>
            <p className="mb-0 pTag">
            Connect with talented and like-minded people to build your dream team.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-lg-3 col-md-6 col-12">
      <div className="card  shadow border-0 rounded-4 p-3">
        <div className="d-flex align-items-center">
          <div className="text-color me-3 backColor">
            <i class="fa-solid fa-message"></i>
          </div>

          <div className="card-body p-0">
            <h6>Collaborate Easily</h6>
            <p className="mb-0 pTag">
              Discuss, share, and collaborate on ideas with built-in collaboration tools.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="col-lg-3 col-md-6 col-12">
      <div className="card shadow border-0 rounded-4 p-3">
        <div className="d-flex align-items-center">
          <div className="text-color me-3 backColor">
          <i class="fa-solid fa-arrow-trend-up"></i>
          </div>

          <div className="card-body p-0">
            <h6>Validate with AI</h6>
            <p className="mb-0 pTag">
            Receive AI-powered market insights & startup validation to make smarter decisions.
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</div>

      {/* cards end */}

      {/* Footer Start */}
<footer className="footerBack py-5 mt-5">
  <div className="container footerCenter">
    <div className="row g-4">

      {/* Company */}
      <div className="col-lg-3 col-md-6">
        <div>
          <h5 className="fw-bold"> <span  className='text-color'><i className="fa-solid fa-rocket"></i></span> LaunchPad <span className='text-color'>AI</span></h5>
          <p className="pTag text-white-50">
            Empowering entrepreneurs with AI-driven startup ideas, validation,
            and business insights.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="col-lg-3 col-md-6">
        <div>
          <h5 className="fw-bold">Quick Links</h5>
          <a className="mb-2 aTag">Home</a>
          <a className="mb-2 aTag">Explore Ideas</a>
          <a className="mb-2 aTag">How It Works</a>
          <a className="mb-2 aTag">Contact</a>
        </div>
      </div>

      {/* Features */}
      <div className="col-lg-3 col-md-6">
        <div>
          <h5 className="fw-bold">Features</h5>
          <a className="mb-2 aTag">AI Idea Generator</a>
          <a className="mb-2 aTag">Market Validation</a>
          <a className="mb-2 aTag">Business Roadmap</a>
          <a className="mb-2 aTag">Startup Resources</a>
        </div>
      </div>

      {/* Contact */}
      <div className="col-lg-3 col-md-6">
        <div>
          <h5 className="fw-bold">Contact</h5>
          <a className="mb-2 aTag">
            <i className="fa-solid fa-envelope me-2"></i>
            support@launchpadai.com
          </a>
          <p className="mb-2">
            <i className="fa-solid fa-phone me-2"></i>
            +91 98765 43210
          </p>

          <div className="mt-3">
            <i className="fa-brands fa-linkedin fs-5 me-3"></i>
            <i className="fa-brands fa-github fs-5 me-3"></i>
            <i className="fa-brands fa-x-twitter fs-5 me-3"></i>
            <i className="fa-brands fa-instagram fs-5"></i>
          </div>
        </div>
      </div>

    </div>

    <hr className="border-light my-4" />

    <div className="text-center">
      <p className="mb-0 pTag text-white-50">
        © 2026 LaunchPad AI. All Rights Reserved.
      </p>
    </div>
  </div>
</footer>

    </>
  )
}

export default LandingPage
