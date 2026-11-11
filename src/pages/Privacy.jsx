import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Back Button */}
        <div className="mb-4">
          <Link to="/signup" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Sign Up
          </Link>
        </div>

        {/* Main Card */}
        <div className="card border-0 shadow-lg rounded-4">

          <div className="card-body p-4 p-md-5">

            {/* Header */}
            <div className="text-center mb-5">

              <span className="badge bg-primary px-3 py-2 mb-3">
                LaunchPad AI
              </span>

              <h1 className="fw-bold mb-3">
                Privacy Policy
              </h1>

              <p className="pTag">
                Last Updated: July 2026
              </p>

            </div>

            {/* Section 1 */}

            <div className="mb-5">

              <h3 className="fw-bold mb-3">
                1. Information We Collect
              </h3>

              <p className="pTag">
                We collect information you provide during registration,
                including your full name, email address, password, profile
                details, and skills. Additional information may be collected
                when you create startup ideas, update your profile, or interact
                with other users.
              </p>

            </div>

            <hr />

            {/* Section 2 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                2. How We Use Your Information
              </h3>

              <p className="pTag">
                Your information is used to create your account, personalize
                your experience, connect you with other innovators, provide
                AI-powered features, improve platform performance, and enhance
                security.
              </p>

            </div>

            <hr />

            {/* Section 3 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                3. AI Features
              </h3>

              <p className="pTag">
                Information that you submit to AI-powered tools may be processed
                to generate startup ideas, business plans, feature suggestions,
                or market insights. AI-generated responses are intended for
                informational purposes only.
              </p>

            </div>

            <hr />

            {/* Section 4 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                4. Cookies & Session Data
              </h3>

              <p className="pTag">
                LaunchPad AI may use cookies and secure session storage to keep
                you logged in, remember your preferences, and improve your
                browsing experience.
              </p>

            </div>

            <hr />

            {/* Section 5 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                5. Data Security
              </h3>

              <p className="pTag">
                We use reasonable security practices to protect your personal
                information. Although we strive to secure your data, no online
                platform can guarantee complete protection.
              </p>

            </div>

            <hr />

            {/* Section 6 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                6. Third-Party Services
              </h3>

              <p className="pTag">
                Our platform may integrate trusted third-party services,
                including authentication providers, AI services, analytics
                tools, and cloud storage providers to deliver various features.
              </p>

            </div>

            <hr />

            {/* Section 7 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                7. Your Rights
              </h3>

              <p className="pTag">
                You can update your profile information, change your password,
                or request account deletion at any time. You also have the right
                to contact us regarding your personal information.
              </p>

            </div>

            <hr />

            {/* Section 8 */}

            <div className="my-5">

              <h3 className="fw-bold mb-3">
                8. Changes to This Privacy Policy
              </h3>

              <p className="pTag">
                We may update this Privacy Policy periodically. Any changes will
                be reflected on this page along with the latest revision date.
              </p>

            </div>

            <hr />

            {/* Contact */}

            <div className="mt-5">

              <h3 className="fw-bold mb-3">
                Contact Us
              </h3>

              <p className="pTag mb-1">
                If you have any questions about this Privacy Policy, please
                contact us.
              </p>

              <p className="fw-semibold mb-0 pTag">
                privacy@launchpadai.com
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Privacy;