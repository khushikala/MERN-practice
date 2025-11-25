const express = require("express");
const router = express.Router();
const controller = require("./relationController");

// Get all courses of instructor
router.get("/instructor/:id/courses", controller.getCourses);

module.exports = router;
