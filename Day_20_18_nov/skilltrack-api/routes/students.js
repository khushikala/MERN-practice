const express = require('express');
// Create a router
const router = express.Router();

// Dummy data
let students = [];
let currentId = 1;

// get all students
router.get('/', (req, res) => {
    res.json(students);
});

// post new student
router.post('/', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Name and Age are required" });
    }

    const newStudent = {
        id: currentId++,
        name,
        age
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});


// update student
router.put('/:id', (req, res) => {
    // find student
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
// assign new values
    Object.assign(student, req.body);
    res.json(student);
});

// delete student
router.delete('/:id', (req, res) => {
    // find student
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
// if not found
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
// remove student
    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

module.exports = router;
