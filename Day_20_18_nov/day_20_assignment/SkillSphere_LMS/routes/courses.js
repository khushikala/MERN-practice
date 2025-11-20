
const express = require("express");
const router = express.Router();

// Import the middleware
const validateCourseId = require("../middleware/validateCourseId");

// Challenge 2 + Challenge 3 
// Dynamic route + Validation middleware
router.get("/:id", validateCourseId, (req, res) => {
    const { id } = req.params;

    // Hardcoded course data for demo
    const course = {
        id: id,
        name: "React Mastery",
        duration: "6 weeks"
    };

    res.json(course);
});

module.exports = router;
