// taskRoutes.js
// Routes for the tasks endpoint

const express = require("express");
const router = express.Router();
const {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.route("/search").post(protect, getTasks);

router.route("/").post(protect, postTask);

router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
