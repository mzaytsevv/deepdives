describe("EXOS-13648", function() {
    it("EXOS-13648", function() {
        console.log("EXOS-13648");
        jasmine.context.push("var");
        expect(true).toBe(true);
    });
});