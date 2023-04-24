// server.js
// Server entry point

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const favicon = require("serve-favicon")
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();
const cors = require('cors');
app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.svg")));

// Serve frontend
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please set the environment variable NODE_ENV to production")
  );
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
