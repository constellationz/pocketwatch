// server.js
// Server entry point

const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use('/api/login', require('./routes/loginRoutes'))

app.use('/api/tasks', require('./routes/taskRoutes'))

app.listen(PORT, () => console.log(`Serving on port ${PORT}`))
