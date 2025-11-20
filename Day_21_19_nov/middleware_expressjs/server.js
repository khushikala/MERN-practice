

    // import express
    const express = require('express');
    // express apllication instance
    const app = express();

    // middleware to parse json data buit in middleware
    // app.use  is used to mount middleware
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));



    // custom middlware  : here we have to log each  request method , url unlike morgan  or other middleware
    app.use((req, res, next) => {
        console.log(`${req.method} request for ${req.url}`);
        next();
    });

    /// fro handling error middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });
    // define route it goes to middlware first
    // app.get() defines a route handler for GET requests to the root URL
    app.get('/', (req, res) => {
        res.send('Home Page');
    });

    // . Start the server and listen on a specified port
    // const PORT = process.env.PORT || 3000;
    // app.listen(PORT, () => {
    //     console.log(`Server is running on http://localhost:${PORT}`);
    // });
    /// fro handling error middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });