describe("EXOS-13647", function() {
    it("EXOS-13647", function() {
        console.log("EXOS-13647");
        jasmine.context.push("var");
        expect(true).toBe(true);
    });
});