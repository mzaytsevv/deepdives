
describe("EXOS-10765", function() {
    it("EXOS-10765 spec", function() {
        //spec expects that precondition spec EXOS10760 was executed before it 
        //and consumes state from the context object
        // console.log(jasmine.context.EXOS10760);
        expect(jasmine.context.EXOS10760.param1).toBe("param 1");
        //spec executes its own logic after preconditions are met or fails if not
    });
});