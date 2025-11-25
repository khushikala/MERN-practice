// in server.js we will set up the Express server and use the routes defined in routes.js
//Step 1: Import the necessary modules
//Step 2: Set up the Express application
//Step 3: Use the routes defined in routes.js
//Step 4: Start the server and listen on a specified port
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
