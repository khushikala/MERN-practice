const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import Routes
const bookRouter = require("./route/books");

// Use routes
app.use("/books", bookRouter);

// Handle 404 - Route not found
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Internal Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
