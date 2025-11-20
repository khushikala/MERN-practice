const express = require('express');
const app = express();

// Import routes
const homeRoutes = require('./routes/home');
const courseRoutes = require('./routes/courses');

//Challenge 1: Logging Middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toISOString()}`);
    next(); 
});

//Challenge 2: Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /users
app.post('/users', (req, res) => {
    res.json({
        message: "User created successfully",
        data: req.body
    });
});

//Challenge 3: EJS Setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/home', homeRoutes);
app.use('/courses', courseRoutes);

// Start server
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
