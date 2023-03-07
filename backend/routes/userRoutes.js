// userRoutes.js
// Routes for the users endpoint

const express = require('express')
const router = express.Router()
const {
    registerUser,
    authenticateUser,
    getMe,
} = require('../controllers/userController')

router.route('/')
    .post(registerUser)

router.route('/login')
    .post(authenticateUser)

router.route('/me')
    .get(getMe)

module.exports = router;
