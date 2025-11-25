// constroller is for having all the business logic for the app
// here we can define temprary in memory data/array of students 
//A simple array acting as a temporary database.
let students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Sam Brown', age: 19 }
];

// Get all students 
//Return all students as JSON.
exports.getAllStudents = (req, res) => {
    res.json(students);
};
// Get a student by ID
exports.getStudentById = (req, res  ) => {
    // Extract ID from URL like /students/2
    const studentId = parseInt(req.params.id);
    //Find the student with matching ID.
    const student = students.find(s => s.id === studentId); 
    //Return student if found, otherwise 404.
    if (student) {
        res.json(student);
    }   
    else {
        res.status(404).json({ message: 'Student not found' });
    }   
};

// Create a new student
//Create a new object using data sent from client.
exports.createStudent = (req, res) => {
    const newStudent = {    
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    //Add new student to array.
    students.push(newStudent);
    //Return success with new student.
    res.status(201).json(newStudent);
};

// Update a student by ID
//First find the student.
exports.updateStudent = (req, res) => {
    const studentId = parseInt(req.params.id);  
    const student = students.find(s => s.id === studentId);

    //Update only the fields sent.
    if (student) {
        student.name = req.body.name || student.name;
        student.age = req.body.age || student.age;
        //Return updated data or 404.
        res.json(student);
    }
    else {
        res.status(404).json({ message: 'Student not found' });
    }   
};  
// Delete a student by ID
exports.deleteStudent = (req, res) => {
    const studentId = parseInt(req.params.id); 
    //Find index in array. 
    const index = students.findIndex(s => s.id === studentId);
    //Delete if exists, else 404.
    if (index !== -1) {
        students.splice(index, 1);
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
};