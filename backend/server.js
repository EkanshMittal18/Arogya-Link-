require("dotenv").config();

const express = require("express");
const cors = require("cors");

const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5174",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AAROGYA LINK Backend is running ❤️",
  });
});

app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AAROGYA LINK backend running on port ${PORT}`);
});