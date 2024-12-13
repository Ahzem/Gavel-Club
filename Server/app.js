const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const membershipRoutes = require("./src/routes/membershipRoutes");
const galleryRoutes = require("./src/routes/galleryRoutes");
const teamRoutes = require("./src/routes/teamRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const specialEventRoutes = require("./src/routes/specialEventRoutes");

const app = express();

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "https://polite-dune-01a2ef300.4.azurestaticapps.net",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api", limiter);

// Body parsing
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/special-event", specialEventRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

module.exports = app;
