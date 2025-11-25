
// Business logic for Course CRUD operations

// In-memory course list
let courses = [
    { id: 1, name: "Node.js Basics", duration: "4 weeks" },
    { id: 2, name: "React Fundamentals", duration: "6 weeks" }
];

// GET all courses
exports.getAllCourses = (req, res) => {
    res.json(courses);
};

// GET a single course by ID
exports.getCourseById = (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
};

// CREATE a new course
exports.createCourse = (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name,
        duration: req.body.duration
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
};

// UPDATE a course
exports.updateCourse = (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }

    course.name = req.body.name || course.name;
    course.duration = req.body.duration || course.duration;

    res.json(course);
};

// DELETE a course
exports.deleteCourse = (req, res) => {
    const courseId = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === courseId);

    if (index === -1) {
        return res.status(404).json({ error: "Course not found" });
    }

    courses.splice(index, 1);
    res.json({ message: "Course deleted successfully" });
};
