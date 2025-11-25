// Sequelize Model Relationships Definition
const Instructor = require('./instructorModel');
const Course = require('./courseModel');

// Define Relationships Once at Startup
Instructor.hasMany(Course, {
    foreignKey: 'InstructorId',
    as: 'Courses'
});

Course.belongsTo(Instructor, {
    foreignKey: 'InstructorId',
    as: 'Instructor'
});

module.exports = { Instructor, Course };
