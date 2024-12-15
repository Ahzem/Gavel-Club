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
const errorHandler = require("./src/middleware/error-handler");

const app = express();

// CORS middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://mango-bush-0b7a83b00.4.azurestaticapps.net",
  "https://gavel-club.azurewebsites.net",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: true,
    xssFilter: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", limiter);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/special-event", specialEventRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version,
  };
  res.status(200).json(healthcheck);
});

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;
