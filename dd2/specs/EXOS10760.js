describe("EXOS-10760", function() {
    it("EXOS-10760 spec", function() {
        console.log("EXOS-10760");
        //spec executes some steps and saves the reesult into a context object
        jasmine.context.EXOS10760 = {param1 : "param 1", param2 : "param 2"};
        expect(true).toBe(true);
    });
});