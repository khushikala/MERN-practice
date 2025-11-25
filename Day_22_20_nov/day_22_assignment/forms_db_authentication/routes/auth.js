const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/usermodel");


// FORM HANDLING (Challenge 1)

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // save new user
    const user = new User({
        name,
        email,
        password: hashedPass
    });

    await user.save();
    console.log("User saved");

    res.send(`Registration successful for ${name}`);
});


// LOGIN (Passport Authentication)

router.post("/login",
    passport.authenticate("local", { failureRedirect: "/login-failed" }),
    (req, res) => {
        res.send("Login successful");
    }
);

router.get("/login-failed", (req, res) => {
    res.send("Invalid email or password");
});

module.exports = router;
