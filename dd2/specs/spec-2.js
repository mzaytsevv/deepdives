describe("A suite", function() {
    it("contains spec with an expectation", function() {
        console.log("spec 2");
        console.log(jasmine.context);
        expect(true).toBe(true);
    });
});