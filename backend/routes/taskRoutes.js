// taskRoutes.js
// Routes for the tasks endpoint

const express = require('express')
const router = express.Router()
const {
    getTasks,
    postTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController')

router.route('/')
    .get(getTasks)
    .post(postTask)

router.route('/:id')
    .put(updateTask)
    .delete(deleteTask)

module.exports = router;
