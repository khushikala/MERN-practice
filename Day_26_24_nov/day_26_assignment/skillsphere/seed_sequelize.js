const sequelize = require('./config/sequelize');
const Instructor = require('./sequelize_part/instructorModel');
const Course = require('./sequelize_part/courseModel');

async function seedData() {
    try {
        console.log('🔄 Syncing Sequelize models...');

        // Sync all models (creates tables if not exist)
        await sequelize.sync({ force: true }); // Force recreates tables for fresh data
        console.log('✅ SQLite database synced');

        console.log('🔄 Seeding sample data...');

        // Create instructors
        const instructor1 = await Instructor.create({ name: 'Dr. Sarah Johnson' });
        const instructor2 = await Instructor.create({ name: 'Prof. Michael Chen' });

        console.log('✅ Instructors created');

        // Create courses (associated with instructors)
        await Course.create({ title: 'React Fundamentals', InstructorId: instructor1.id });
        await Course.create({ title: 'Node.js Development', InstructorId: instructor1.id });
        await Course.create({ title: 'Database Design', InstructorId: instructor1.id });
        await Course.create({ title: 'MongoDB Advanced', InstructorId: instructor2.id });
        await Course.create({ title: 'PostgreSQL Tips', InstructorId: instructor2.id });

        console.log('✅ Courses created with relationships');

        console.log('🎉 Sequelize seeding complete!');
        console.log('Test endpoints with:');
        console.log('GET /orm/instructor/1/courses - Dr. Sarah Johnson courses');
        console.log('GET /orm/instructor/2/courses - Prof. Michael Chen courses');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seedData();
