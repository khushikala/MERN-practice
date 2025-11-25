const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId");

// Dummy courses for EJS rendering (Challenge 3)
const courses = [
    { id: 1, name: "Node.js Basics" },
    { id: 2, name: "Express.js Mastery" },
    { id: 3, name: "React Advanced" }
];

// Challenge 3: Render courses.ejs
router.get("/", (req, res) => {
    res.render("courses", { courses });
});

//Challenge 2: Dynamic route + Validation
router.get("/:id", validateCourseId, (req, res) => {
    // id from url
    const { id } = req.params;

    const course = courses.find(c => c.id == id);
// course not found
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
});

module.exports = router;
