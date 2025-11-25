    const express = require('express');
    const app = express();

    // Import routes
    const homeRoutes = require('./routes/home');
    const courseRoutes = require('./routes/courses');
const PORT = process.env.PORT || 4000;
    //Challenge 1: Logging Middleware
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
        next(); 
    });

    //Challenge 2: Built-in Middleware

    // parse JSON and URL-encoded bodies of incoming requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Enable gzip compression for performance
    app.use(require('compression')());

    // POST /api/users
    app.post('/api/users', (req, res) => {
        res.json({
            message: "User created successfully",
            data: req.body
        });
    });

    //Challenge 3: EJS Setup
    // Set up EJS
    app.set('view engine', 'ejs');
    app.set('views', './views');

    // Routes
    app.use('/api/home', homeRoutes);
    app.use('/api/courses', courseRoutes);

    // STATUS route for deployment test
app.get("/status", (req, res) => {
    res.json({ message: "App is live" });
});

module.exports = app;

    // Start server
    app.listen(PORT, () => {
        console.log("Server running on http://localhost:4000");
    });
