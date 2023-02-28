// server.js
// Webserver entry point

const fs = require('fs');
const cors = require('cors');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

// Database must be passed via command line
// EXAMPLE: npm run serve --database "mongodb+srv://user:pass@host"
const DATABASE = process.env.npm_config_database;
if (typeof(DATABASE) !== "string") {
    console.error("Invalid database passed to server");
    console.error("Pass a database using the --database=\"mongodb://\" flag");
    process.exit(1);
}
console.log(`Using database ${DATABASE}`);

// Open connection to mongodb
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(DATABASE);
client.connect(console.log("MongoDB connected"));

// Start express
const app = express();
app.use(cors()); // Allow remote hosts
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/static', express.static(path.join(__dirname, '../../static'))); // Host static content

// Create HTTP and HTTPS servers
const key = fs.readFileSync('sslcert/server.key');
const cert = fs.readFileSync('sslcert/server.crt');
const credentials = { key: key, cert: cert }
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// Host express app on http and https servers
httpServer.listen(8080);
httpsServer.listen(8443);
