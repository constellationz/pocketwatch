// taskController.js
// Controllers that deal with tasks

const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')

// @desc    Get tasks of a user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find()

    res.status(200).json(tasks)
})

// @desc    Post a task
// @route   POST /api/tasks
// @access  Private
const postTask = asyncHandler(async (req, res) => {
    console.log(req.body)

    if (!req.body.name) {
        res.status(400)
        throw new Error('No name field provided')
    }

    const task = await Task.create({
        name: req.body.name
    })

    res.status(200).json(task)
})

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error(`Task of id=${req.params.id} not found`)
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedTask)
})

// @desc    Delete a task
// @route   DELETE /api/tasks:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error(`Task of id=${req.params.id} not found`)
    }

    await task.deleteOne()

    res.status(200).json({
        id: req.params.id
    })
})

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask,
}
