const chai = require("chai");
const expect = chai.expect;

// Unit tests for /api/courses routes using Mocha and Chai
// Since the routes are simple, we'll test the course lookup logic in isolation

// Sample course data (from routes/courses.js)
const courses = [
    { id: 1, name: "Node.js Basics" },
    { id: 2, name: "Express.js Mastery" },
    { id: 3, name: "React Advanced" }
];

// Unit test suite for Courses logic
describe("Unit Tests: Courses Logic", () => {

    // Test finding a valid course by ID
    it("should find existing course by ID", () => {
        const id = 1;
        const course = courses.find(c => c.id == id);
        expect(course).to.be.an('object');
        expect(course.id).to.equal(1);
        expect(course.name).to.equal("Node.js Basics");
    });

    // Test course not found
    it("should return undefined for non-existing course ID", () => {
        const id = 999;
        const course = courses.find(c => c.id == id);
        expect(course).to.be.undefined;
    });

    // Test all courses array structure
    it("should have all courses with proper structure", () => {
        expect(courses).to.be.an('array');
        expect(courses).to.have.lengthOf(3);

        courses.forEach(course => {
            expect(course).to.have.property('id');
            expect(course).to.have.property('name');
            expect(course.id).to.be.a('number');
            expect(course.name).to.be.a('string');
        });
    });

    // Test course IDs are unique
    it("should have unique course IDs", () => {
        const ids = courses.map(c => c.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).to.equal(courses.length);
    });

});
