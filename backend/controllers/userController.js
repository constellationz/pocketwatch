// userController.js
// Controllers for user functionality

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Make sure name, email, and password have been entered
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // Make sure user doesn't already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Get all fields
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // Return JWT if login is valid
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.hashedPassword))) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid login");
  }
});

// @desc    Update email (protected)
// @route   POST /api/users/updateEmail
// @access  Private
const updateEmail = asyncHandler(async (req, res) => {
  // Get all fields
  const { currPassword, email } = req.body;
  if (!currPassword || !email) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const _id = req.user._id;
  const user = await User.findById({ _id });

  if (!(await bcrypt.compare(currPassword, user.hashedPassword))) {
    res.status(401);
    throw new Error("Current password incorrect");
  }

  await User.findById({ _id }).then(async (doc) => {
    // Save edited document
    doc.$set("email", email);
    await doc.save().then(() => {
      res.status(200).json({
        _id: doc._id,
        name: doc.name,
        email: doc.email,
        token: generateToken(doc._id),
      });
    });
  });
});

// @desc    Update password (protected)
// @route   POST /api/users/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  // Get all fields
  const { currPassword, newPassword } = req.body;
  if (!currPassword || !newPassword) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const _id = req.user._id;
  const user = await User.findById({ _id });

  if (!(await bcrypt.compare(currPassword, user.hashedPassword))) {
    res.status(401);
    throw new Error("Current password incorrect");
  }

  await User.findById({ _id }).then(async (doc) => {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // Save edited document
    doc.$set("hashedPassword", newHashedPassword);
    doc.save().then(() => {
      res.status(200).json({
        _id: doc._id,
        name: doc.name,
        email: doc.email,
        token: generateToken(doc._id),
      });
    });
  });
});

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateEmail,
  updatePassword,
  getMe,
};
