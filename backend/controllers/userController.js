// userController.js
// Controllers for user functionality

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Registered user',
    })
})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const authenticateUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Authenticated user',
    })
})

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Got user data',
    })
})

// Generate JWT
const generateToken =  (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    authenticateUser,
    getMe,
}

