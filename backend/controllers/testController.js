// taskController.js
// Controllers that deal with testing endpoints

const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");
const User = require("../models/userModel");
const { ObjectId } = require("bson");

// @desc    Get tasks of a user
// @route   GET /api/deleteUser
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        res.status(400);
        throw new Error("Missing fields");
    }

    // If the token id is malformed, this is a bad request
    if (!ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Bad request");
    }

    // If the token email doesn't match the current email, this token is invalid
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (!user) {
        res.status(401);
        throw new Error("Not authorized");
    }
    
    await User.deleteOne({ _id: new ObjectId(id) });
  
    res.status(200).json({
        message: "Successfully deleted user"
    });
});

module.exports = {
    deleteUser
};
