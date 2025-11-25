// Main entry file simple setup
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// load env file
dotenv.config();

const app = express();

// middleware to read form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session handling
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// passport setup
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// Disable mongoose buffering to fail fast if not connected
mongoose.set('bufferCommands', false);

// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Fail quickly if can't connect
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Add error handling
mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err);
});

// public folder
app.use(express.static("public"));

// routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/admin"));

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
