// loginController.js
// Controllers for login functionality

const asyncHandler = require('express-async-handler')

// @desc    Log into the application
// @route   POST /api/login
// @access  Private
const doLogin = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get login'
    })
})

module.exports = {
    doLogin,
}
