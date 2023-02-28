// server.js
// Webserver entry point

// Allow a port to be specified via the command line.
// EXAMPLE: npm run serve --port 8080
const DEFAULT_PORT = 8000;
const PORT = parseInt(process.env.npm_config_port) || DEFAULT_PORT;
if (typeof(PORT) !== "number") {
    console.error("Invalid port passed to server");
    console.error("Pass a valid port using --port=8000");
    process.exit(1);
}
console.log(`Hosting on port ${PORT}`);

// Allow an alternate database to be specified via command line
// EXAMPLE: npm run serve --database "mongodb+srv://user:pass@host"
// TODO: fix command line flags
const DATABASE = process.env.npm_config_database;
if (typeof(DATABASE) !== "string") {
    console.error("Invalid database passed to server");
    console.error("Pass a database using the --database=\"mongodb://\" flag");
    process.exit(1);
}
console.log(`Using database ${DATABASE}`);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Open connection to mongodb
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(DATABASE);
client.connect(console.log("MongoDB connected"));

// Start express server
// - Process remote requests
// - Parse JSON bodies
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Host static content located in the static folder
app.use('/static', express.static(path.join(__dirname, '../../static')));

app.listen(PORT);
