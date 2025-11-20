const express = require('express');
const app = express();
// routes 
const studentRoutes = require('./routes/students');
// middleware
const logger = require('./middleware/logger');
// parsing middleware
app.use(express.json());
// Global logging middleware
app.use(logger);
// routes
app.use('/students', studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
