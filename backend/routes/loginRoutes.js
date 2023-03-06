// loginRoutes.js
// Routes for the login endpoint

const express = require('express')
const router = express.Router()
const {
    doLogin,
} = require('../controllers/loginController')

router.route('/')
    .post(doLogin)

module.exports = router
