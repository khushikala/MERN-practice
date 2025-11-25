const express = require("express");
const router = express.Router();

// simple admin check
function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send("Access Denied");
}

router.get("/admin", isAdmin, (req, res) => {
    res.send("Welcome, Admin!");
});

module.exports = router;
