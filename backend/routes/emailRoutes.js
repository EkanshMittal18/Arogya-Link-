const express = require("express");
const router = express.Router();

const { auth } = require("../config/firebaseAdmin");
const { sendWelcomeEmail } = require("../services/emailService");

router.post("/welcome", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase user
    const decodedToken = await auth.verifyIdToken(token);

    const { name, role } = req.body;

    // Use verified email from Firebase, not client-provided email
    const email = decodedToken.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email not found",
      });
    }

    const result = await sendWelcomeEmail({
      email,
      name: name || "User",
      role: role || "patient",
    });

    if (!result.success) {
      return res.status(502).json({
        success: false,
        message: "Account created, but welcome email could not be sent.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Welcome email sent successfully",
    });

  } catch (error) {
    console.error("Welcome route error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process welcome email",
    });
  }
});

module.exports = router;