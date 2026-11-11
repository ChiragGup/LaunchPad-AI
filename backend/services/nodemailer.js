import nodemailer from "nodemailer";

console.log(
  "Nodemailer EMAIL_USER:",
  process.env.EMAIL_USER
);

console.log(
  "Nodemailer EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD ? "exists" : "missing"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    await transporter.sendMail({
      from: `"LaunchPad AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your LaunchPad AI Password",

      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background-color: #f5f3ff;
          font-family: Arial, Helvetica, sans-serif;
        ">

          <div style="
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          ">

            <!-- Header -->
            <div style="
              background-color: #7C3AED;
              padding: 24px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 24px;
              ">
                🚀 LaunchPad AI
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 35px 30px;">

              <h2 style="
                margin-top: 0;
                color: #222222;
                font-size: 22px;
              ">
                Reset Your Password
              </h2>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.6;
              ">
                Hello,
              </p>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.6;
              ">
                We received a request to reset the password
                for your LaunchPad AI account.
              </p>

              <p style="
                color: #555555;
                font-size: 15px;
                line-height: 1.6;
              ">
                Click the button below to create a new password.
              </p>

              <!-- Button -->
              <div style="
                text-align: center;
                margin: 30px 0;
              ">
                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    background-color: #7C3AED;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 28px;
                    border-radius: 7px;
                    font-size: 15px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>
              </div>

              <!-- Expiry notice -->
              <div style="
                background-color: #f5f3ff;
                border-left: 4px solid #7C3AED;
                padding: 12px 15px;
                margin: 20px 0;
              ">
                <p style="
                  margin: 0;
                  color: #555555;
                  font-size: 14px;
                  line-height: 1.5;
                ">
                  This password reset link will expire in
                  <strong>15 minutes</strong>.
                </p>
              </div>

              <p style="
                color: #777777;
                font-size: 14px;
                line-height: 1.6;
              ">
                If you did not request a password reset,
                you can safely ignore this email.
                Your account will remain secure.
              </p>

              <p style="
                margin-top: 30px;
                color: #555555;
                font-size: 14px;
              ">
                Regards,<br>
                <strong>LaunchPad AI Team</strong>
              </p>

            </div>

            <!-- Footer -->
            <div style="
              background-color: #fafafa;
              border-top: 1px solid #eeeeee;
              padding: 18px 25px;
              text-align: center;
            ">
              <p style="
                margin: 0;
                color: #999999;
                font-size: 12px;
                line-height: 1.5;
              ">
                This is an automated email. Please do not reply to this message.
              </p>

              <p style="
                margin: 8px 0 0;
                color: #bbbbbb;
                font-size: 11px;
              ">
                © 2026 LaunchPad AI. All rights reserved.
              </p>
            </div>

          </div>

        </div>
      `,
    });

    console.log("Email sent successfully");

  } catch (error) {
    console.log("Nodemailer error:", error);
    throw error;
  }
};