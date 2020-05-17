
describe("A suite", function() {
    it("contains spec with an expectation", function() {
        console.log("spec 1");
        jasmine.context.push("var");
        expect(true).toBe(true);
    });
});