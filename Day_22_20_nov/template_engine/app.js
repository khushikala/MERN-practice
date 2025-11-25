// this app.js is a entry poin of our application
// we will use this file to start our server

// impor all dependencies
const express = require('express');
const app = express();
const homeRoutes = require('./routes/homeRoute');

// import path
const path = require('path');

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the views directory
app.set('views', './views');
// Step 4: Define routes to render templates


app.use("/", homeRoutes);

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});