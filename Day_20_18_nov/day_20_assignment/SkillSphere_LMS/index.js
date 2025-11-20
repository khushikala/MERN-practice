// index.js
const express = require('express');
const app = express();

// import home routes
const homeRoutes = require('./routes/home');

// import course routes
const courseRoutes = require('./routes/courses');


// home route
app.use('/', homeRoutes);

// course routes
app.use('/courses', courseRoutes);

// start server
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
