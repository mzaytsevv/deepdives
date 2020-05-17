describe("EXOS-11547", function() {
    it("EXOS-11547", function() {
        console.log("EXOS-11547");
        jasmine.context.push("var");
        expect(true).toBe(true);
    });
});