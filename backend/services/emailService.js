const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

const sendWelcomeEmail = async ({ email, name, role }) => {
  try {
    const safeName = escapeHtml(name || "User");
    const safeRole = escapeHtml(role || "Patient");

    const { data, error } = await resend.emails.send({
      from: "AAROGYA LINK <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to AAROGYA LINK ❤️",

      html: `
        <div style="background:#FDF4F8;padding:30px;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:auto;background:#ffffff;
            padding:35px;border-radius:16px;">

            <h1 style="color:#DB2777;text-align:center;">
              AAROGYA LINK ❤️
            </h1>

            <h2>Hello ${safeName}!</h2>

            <p>
              Welcome to AAROGYA LINK. Your account has been
              successfully created.
            </p>

            <div style="background:#FCE7F3;padding:16px;border-radius:10px;">
              <strong>Your registered role:</strong> ${safeRole}
            </div>

            <p>
              We are happy to have you as part of our healthcare community.
              Our mission is to make healthcare more accessible and connected.
            </p>

            <h3 style="color:#BE185D;">
              Connecting Communities to Better Healthcare.
            </h3>

            <hr style="border:0;border-top:1px solid #f1d5e5;"/>

            <p style="font-size:12px;color:#888;text-align:center;">
              © 2026 AAROGYA LINK. All rights reserved.
            </p>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    console.log("Welcome email sent:", data.id);

    return { success: true, data };

  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
};

module.exports = { sendWelcomeEmail };