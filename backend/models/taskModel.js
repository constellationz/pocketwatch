// taskModel.js
// Schema for the task resource

const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,    
        required: [true, 'Name field required'],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)
