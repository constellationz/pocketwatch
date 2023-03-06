// loginController.js
// Controllers for login functionality

// @desc    Log into the application
// @route   POST /api/login
// @access  Private
const doLogin = (req, res) => {
    res.status(200).json({
        message: 'Get login'
    })
}

module.exports = {
    doLogin,
}
