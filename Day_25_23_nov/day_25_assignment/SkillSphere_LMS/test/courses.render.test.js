// Import SuperTest to simulate HTTP requests to the Express server
const request = require("supertest");

// Import Chai for assertion methods
const chai = require("chai");

// Extract the 'expect' assertion function from Chai
const expect = chai.expect;

// Import the Express application from index.js for testing
const app = require("../index");

// Test suite for verifying EJS rendering of the /courses route
describe("Integration Test: /courses Rendering", () => {

    // Test case: Ensure that the /api/courses route correctly renders an EJS HTML page
    it("GET /api/courses should render EJS page", async () => {

        // Send a GET request to /api/courses using SuperTest
        const res = await request(app).get("/api/courses");

        // Assert that the response status code is 200 (OK)
        expect(res.status).to.equal(200);

        // Assert that the HTML response contains the expected heading text from the EJS template
        expect(res.text).to.include("<h1>SkillSphere LMS Courses</h1>");
    });

});
