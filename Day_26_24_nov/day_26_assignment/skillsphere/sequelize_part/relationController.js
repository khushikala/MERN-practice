const { Instructor, Course } = require("./relations");

// GET /orm/instructor/:id/courses
exports.getCourses = async (req, res) => {
    try {
        const instructor = await Instructor.findByPk(req.params.id, {
            include: {
                model: Course,
                as: 'Courses'
            }
        });

        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        res.json(instructor);
    } catch (err) {
        console.error('Sequelize error:', err);
        res.status(500).json({ error: err.message, hint: "Ensure data is seeded with 'node seed_sequelize.js'" });
    }
};
