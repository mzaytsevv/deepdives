let Jasminee = require('./jasminee').Jasminee;
let builder = require('./sequence-builder');

const rds = [
    "EXOS-10765",
    "EXOS-8159",
    "EXOS-13647",
    "EXOS-4734",
    "EXOS-11635",
    "EXOS-6570",
    "EXOS-11547",
    "EXOS-13650",
    "EXOS-9005",
    "EXOS-13075",   
];


(async () => {
    process.setMaxListeners(100);
    let nodes = await builder.buildDependenciesGraph(rds.splice(0, 10));
    let sequences = [];
    for(let node of nodes){
        sequences.push(builder.buildSequence(node));
    }
    let jasminee = new Jasminee();
    jasmine.context = []
    for(let sequence of sequences){
        console.log(sequence);
        let specs = sequence.map((item)=>{
            return item.replace("-", "") + ".js"
        });
        jasminee.loadConfig({
            spec_dir: 'specs',
            spec_files: specs,
            random : false
        });
    }
    jasminee.execute();
})();