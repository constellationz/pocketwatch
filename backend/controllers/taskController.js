// taskController.js
// Controllers that deal with tasks

// @desc    Get tasks of a user
// @route   GET /api/tasks
// @access  Private
const getTasks = (req, res) => {
    res.status(200).json({
        message: `Get tasks`
    })
}

// @desc    Post a task
// @route   POST /api/goals
// @access  Private
const postTask = (req, res) => {
    const id = 0
    res.status(200).json({
        message: `Post task id=${id}`,
        name: req.params.name,
        id: id,
    })
}

// @desc    Update a task
// @route   PUT /api/goals/:id
// @access  Private
const updateTask = (req, res) => {
    // If the task isn't found, reply with a 400 error
    const ok = true
    if (ok) {
        res.status(200).json({
            message: `Update task id=${req.params.id}`,
            id: req.params.id
        })
    } else {
        res.status(400).json({
            message: `Task of id=${req.params.id} not found`
        })
    }
}

// @desc    Delete a task
// @route   DELETE /api/goals:id
// @access  Private
const deleteTask = (req, res) => {
    // If the task isn't found, reply with a 400 error
    const ok = true
    if (ok) {
        res.status(200).json({
            message: `Delete task id=${req.params.id}`,
            id: req.params.id
        })
    } else {
        res.status(400).json({
            message: `Task of id=${req.params.id} not found`
        });
    }
}

module.exports = {
    getTasks,
    postTask,
    updateTask,
    deleteTask,
}
