//Module to create and manage HTTP server
const http = require('http');

//Import the app module
const app = require('./app');

//Set the port to listen to. If the PORT environment variable is not set, use 8080
const port = process.env.PORT || 8080;

//Create server with the http package
const server = http.createServer(app);

server.listen(port);