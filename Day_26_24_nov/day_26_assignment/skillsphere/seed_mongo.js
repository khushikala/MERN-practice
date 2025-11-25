const mongoose = require('./config/mongoose');
const User = require('./mongo_part/userModel');
const Enrollment = require('./mongo_part/enrollmentModel');

// Connect and seed data
async function seedData() {
    try {
        console.log('🔄 Seeding MongoDB data...');

        // Create sample users
        const user1 = new User({
            name: 'Alice Johnson',
            email: 'alice@example.com'
        });
        const user2 = new User({
            name: 'Bob Wilson',
            email: 'bob@example.com'
        });

        await user1.save();
        await user2.save();
        console.log('✅ Users created');

        // Create enrollments referencing the users
        const enroll1 = new Enrollment({
            user: user1._id,
            courseName: 'React Fundamentals'
        });
        const enroll2 = new Enrollment({
            user: user2._id,
            courseName: 'Node.js Basics'
        });
        const enroll3 = new Enrollment({
            user: user1._id,
            courseName: 'MongoDB Advanced'
        });

        await enroll1.save();
        await enroll2.save();
        await enroll3.save();
        console.log('✅ Enrollments created');

        console.log('🎉 MongoDB seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
}

seedData();
