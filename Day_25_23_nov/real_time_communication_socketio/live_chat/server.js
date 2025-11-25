// this file is server.js where we will set up a basic Express server 
//Following steps canbe implemented to set up a basic Express server with socket.io integration
//Step1: Import necessary modules
//Step2: Initialize Express app
//Step3: Set up socket.io server
        //Creating a new instance of the socket.io server with CORS settings
        //Connection event listener to handle new client connections
        //Message event listener to handle incoming messages and broadcast them to all connected clients
        //Basic route to test the server
//Step4: Define middleware and routes
//Step5: Start the server

// server.js

const express = require('express');
const { Server } = require('socket.io');
const http = require('http'); // Needed to attach Socket.IO

// Step2: Initialize Express app
const app = express();

// Create HTTP server for Express + Socket.IO
const server = http.createServer(app);

// Step3: Initialize Socket.IO with CORS enabled
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static('public'));

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages
    socket.on('message', (data) => {
        io.emit('message', data); // Broadcast to everyone
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// (Optional) test route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Start server (IMPORTANT: use server.listen, not app.listen)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
