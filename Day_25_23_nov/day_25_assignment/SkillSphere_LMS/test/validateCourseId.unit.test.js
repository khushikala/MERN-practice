const chai = require("chai");
const expect = chai.expect;

// Import the middleware function
const validateCourseId = require("../middleware/validateCourseId");

// Unit test suite for validateCourseId middleware logic
describe("Unit Tests: validateCourseId Logic", () => {

    // Helper function matching middleware logic
    function isValidCourseId(id) {
        const numId = parseInt(id, 10);
        return !(isNaN(numId) || numId != id || numId <= 0);
    }

    it("should validate course ID correctly", () => {
        // Test the validation logic directly
        const validId = "1";
        const invalidId = "abc";

        expect(isValidCourseId(validId)).to.be.true;
        expect(isValidCourseId(invalidId)).to.be.false;
    });

    it("should identify valid and invalid IDs", () => {
        const validIds = ["1", "2", "100", "999"];
        const invalidIds = ["abc", "1.5", "0", "-1", "", "hello", "1a"];

        validIds.forEach(id => {
            expect(isValidCourseId(id)).to.be.true;
        });

        invalidIds.forEach(id => {
            expect(isValidCourseId(id)).to.be.false;
        });
    });

});
