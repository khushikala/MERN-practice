// Import dependencies
const express = require('express');
const morgan = require('morgan');

// Custom middlewares
const requestLogger = require('./middleware/requestLogger');
const validateStudent = require('./middleware/validateStudent');
const errorHandler = require('./middleware/errorHandler');

// Routes
const studentRoutes = require('./routes/studentRoutes');

// Express app instance
const app = express();


// User Story 3: Built-in middleware
 // Parse JSON bodies
app.use(express.json());          
 // Parse form submissions
app.use(express.urlencoded({ extended: true }));

// Static files (CSS, JS, images)
app.use(express.static('public'));


// User Story 4: Morgan Logging
// logs the method, URL, status, response time
app.use(morgan('dev')); 


// User Story 1: Custom Request Logger

app.use(requestLogger);

// Set Template Engine
app.set('view engine', 'ejs');

// Home Page
app.get('/', (req, res) => {
    res.render('index', { title: "SkillTrack Dashboard" });
});

// Student Routes (validation middleware used inside routes)
app.use('/students', studentRoutes);


// User Story 5: Error Handling Middleware
// Must be the LAST middleware

app.use(errorHandler);

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
