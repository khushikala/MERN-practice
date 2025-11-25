

// Full REST API with validation & rate limiting

const express = require("express");
const rateLimit = require("express-rate-limit");
const courseRoutes = require("./routes/courseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// GLOBAL RATE LIMITER — 5 requests per minute
const limiter = rateLimit({
// 1 minute
    windowMs: 1 * 60 * 1000,  
// limit each user to 5 requests/min 
    max: 5,                   
    message: { error: "Too many requests" }
});
app.use(limiter);

// Use Versioned API Path (Best Practice)
app.use("/api/v1/courses", courseRoutes);

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
