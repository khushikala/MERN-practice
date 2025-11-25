
// Sequelize ORM Database (SQLite used for easy setup)

const { Sequelize } = require("sequelize");

// SQLite DB file created automatically
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./skillsphere.sqlite"
});

module.exports = sequelize;
