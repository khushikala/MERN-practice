const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Course = sequelize.define("Course", {
    title: DataTypes.STRING,
    InstructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Instructors',
            key: 'id'
        }
    }
});

module.exports = Course;
