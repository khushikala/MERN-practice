// in routes.js we will have APi routes followed by export statements

//Step 1: Import the necessary modules
//Step 2: Define the routes for the application
//Step 3: Export the routes for use in other parts of the application

const express = require('express');
const router = express.Router();
const db = require('./db');


// Define a simple route
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});
//Getting data from database ie get all students 
router.get('/students', (req, res) => {
    const db = require('./db'); // Import the database connection using db.query() for querying
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);//log error
            res.status(500).send('Error fetching students');//send error response
        } else {
            res.json(results);// Send the results as JSON
        }
    });
});

////Add a student to the database
router.post('/students', (req, res) => {
    const db = require('./db'); // Import the database connection
    const newStudent = req.body;
    db.query('INSERT INTO students SET ?', newStudent, (err, results) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).send('Error adding student');
        } else {
            res.status(201).send('Student added successfully');
        }
    });
});

// update a student
router.put('/students/:id', (req, res) => {
    const db = require('./db'); // Import the database connection
    const studentId = req.params.id;
    const updatedStudent = req.body;
    db.query('UPDATE students SET ? WHERE id = ?', [updatedStudent, studentId], (err, results) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).send('Error updating student');
        } else {
            res.status(200).send('Student updated successfully');
        }
    });
});
// delete student by id
router.delete('/students/:id', (req, res) => {
    const db = require('./db'); // Import the database connection
    const studentId = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).send('Error deleting student');
        } else {
            res.status(200).send('Student deleted successfully');
        }
    });
});



module.exports = router;