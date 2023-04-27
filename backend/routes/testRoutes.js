// testRoutes.js
// Routes for the test endpoints

const express = require("express");
const router = express.Router();
const {
  verifyEmail,
  deleteUser
} = require("../controllers/testController");
const { protect } = require("../middleware/authMiddleware");

router.route("/verifyEmail").post(protect, verifyEmail);

router.route("/deleteUser").post(deleteUser);

module.exports = router;
