import { Link } from "react-router-dom";

function Term() {
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

              <h1 className="fw-bold display-5">
                Terms of Service
              </h1>

              <p className="pTag">
                Last Updated: July 2026
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-5">
              <h3 className="fw-bold mb-3">
                1. Acceptance of Terms
              </h3>

              <p className="pTag">
                By creating an account and using LaunchPad AI, you agree to
                comply with these Terms of Service. These terms govern your use
                of our platform and its services. If you do not agree with any
                part of these terms, please do not use the platform.
              </p>
            </div>

            <hr />

            {/* Section 2 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                2. User Accounts
              </h3>

              <p className="pTag">
                You are responsible for maintaining the confidentiality of your
                login credentials and for all activities performed under your
                account. Please notify us immediately if you suspect
                unauthorized access.
              </p>
            </div>

            <hr />

            {/* Section 3 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                3. Acceptable Use
              </h3>

              <p className="pTag">
                Users must not upload illegal, offensive, harmful, or misleading
                content. LaunchPad AI is intended for collaboration,
                entrepreneurship, innovation, and learning.
              </p>
            </div>

            <hr />

            {/* Section 4 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                4. Intellectual Property
              </h3>

              <p className="pTag">
                You retain ownership of the startup ideas and content you
                submit. By publishing content on LaunchPad AI, you grant the
                platform permission to display and manage that content for
                platform functionality.
              </p>
            </div>

            <hr />

            {/* Section 5 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                5. AI Generated Content
              </h3>

              <p className="pTag">
                AI-generated startup ideas, business suggestions, and market
                analysis are provided for informational purposes only. Users are
                responsible for evaluating the accuracy and suitability of AI
                recommendations before making business decisions.
              </p>
            </div>

            <hr />

            {/* Section 6 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                6. Account Suspension
              </h3>

              <p className="pTag">
                We reserve the right to suspend or permanently remove any
                account that violates these Terms of Service or negatively
                impacts the community.
              </p>
            </div>

            <hr />

            {/* Section 7 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                7. Limitation of Liability
              </h3>

              <p className="pTag">
                LaunchPad AI is provided on an "as is" basis. We are not liable
                for any financial, business, or personal losses arising from the
                use of the platform or AI-generated content.
              </p>
            </div>

            <hr />

            {/* Section 8 */}
            <div className="my-5">
              <h3 className="fw-bold mb-3">
                8. Changes to These Terms
              </h3>

              <p className="pTag">
                We may update these Terms of Service from time to time. Updated
                versions will be published on this page with the latest revision
                date.
              </p>
            </div>

            <hr />

            {/* Contact */}
            <div className="mt-5">

              <h3 className="fw-bold mb-3">
                Contact Us
              </h3>

              <p className="pTag mb-1">
                Have questions regarding these Terms?
              </p>

              <p className="pTag">
                support@launchpadai.com
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Term;