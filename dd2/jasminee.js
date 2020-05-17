
var Jasmine = require('jasmine');
class Jasminee extends Jasmine {
    constructor(){
        super();
        this.context = [];
    }
}

module.exports.Jasminee = Jasminee;