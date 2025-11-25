import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Enable CORS for frontend
app.use(cors());


// Serve static files from /uploads folder
// Challenge 2: Student should download files from /materials/<filename>
app.use("/materials", express.static("uploads"));

// Parse JSON
app.use(express.json());

// File upload API

app.use("/", uploadRoutes);
// Serve chat.html from /public folder
app.use(express.static("public"));

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Challenge 3: Real-time communication
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Receive message from a client
    socket.on("chatMessage", (msg) => {
        // Broadcast message to ALL connected users
        io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
