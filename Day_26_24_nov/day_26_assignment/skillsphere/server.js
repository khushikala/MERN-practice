const app = require("./app");
const sequelize = require("./config/sequelize");

const PORT = 5000;

// Sync all Sequelize Models and start server
(async () => {
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`🚀 Server Running at http://localhost:${PORT}`);
    });
})();

