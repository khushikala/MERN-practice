const express = require("express");
require("dotenv").config();

// Register MongoDB models when app starts
require("./mongo_part/userModel");
require("./mongo_part/enrollmentModel");

// Establish Sequelize relationships at startup
require("./sequelize_part/relations");

const app = express();
app.use(express.json());

// MySQL Route
app.use("/mysql", require("./mysql_part/courseRoutes"));

// MongoDB Route
app.use("/mongo", require("./mongo_part/mongoRoutes"));

// Sequelize ORM Route
app.use("/orm", require("./sequelize_part/relationRoutes"));

module.exports = app;
