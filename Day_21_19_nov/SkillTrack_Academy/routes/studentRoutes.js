const express = require('express');
const router = express.Router();

// Validation middleware
const validateStudent = require('../middleware/validateStudent');

// Dummy student data
let students = [
    { id: 1, name: "Aarav", email: "aarav@example.com", progress: "80%" },
    { id: 2, name: "Ananya", email: "ananya@example.com", progress: "90%" }
];

// GET all students
router.get('/', (req, res) => {
    res.render('students', { students });
});

// POST: Add new student (Uses Validation Middleware)
router.post('/add', validateStudent, (req, res) => {
    const { name, email } = req.body;

    students.push({
        id: students.length + 1,
        name,
        email,
        progress: "0%"
    });

    res.redirect('/students');
});

module.exports = router;
