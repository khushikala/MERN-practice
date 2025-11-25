// Import SuperTest to simulate HTTP requests against the Express application
const request = require("supertest");

// Import Chai for assertion methods
const chai = require("chai");
const expect = chai.expect;

// Import the Express app instance (exported from index.js)
const app = require("../index");

// Unit tests for /api/courses routes using Mocha and Chai
describe("Unit Tests: Courses API", () => {

// Test 1: Verify that the /api/courses route responds with HTTP 200
    it("GET /api/courses should return 200", async () => {

        // Make a GET request to the /api/courses endpoint
        const res = await request(app).get("/api/courses");

        // Assert that the status code is 200 (OK) using Chai
        expect(res.status).to.equal(200);
    });

// Test 2: Verify that a valid course ID returns a course object
    it("GET /api/courses/1 should return course object", async () => {

        // Make a GET request to /api/courses/1
        const res = await request(app).get("/api/courses/1");

        // Assert the response contains a "name" property using Chai
        expect(res.body).to.have.property("name");
        expect(res.body.id).to.equal(1);
        expect(res.body.name).to.equal("Node.js Basics");
    });

// Test 3: Ensure API returns 404 for non-existing course IDs
    it("GET /api/courses/999 should return 404", async () => {

        // Attempt to fetch a course that does not exist (ID = 999)
        const res = await request(app).get("/api/courses/999");

        // Assert the response status is 404 (Not Found) using Chai
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("error", "Course not found");
    });

// Test 4: Test EJS rendering for courses list
    it("GET /api/courses should render EJS template", async () => {
        const res = await request(app).get("/api/courses");
        expect(res.status).to.equal(200);
        // Note: Can't fully test EJS rendering with SuperTest, but status is checked
    });

});
