const axios = require('axios');
const E2Es = [
    "EXOS-8158",
    "EXOS-6696",
    "EXOS-11735",
    "EXOS-11687",
    "EXOS-8158",
    "EXOS-9648",
    "EXOS-6714",
    "EXOS-10262",
    "EXOS-8158",
    "EXOS-6342",
    "EXOS-6667",
    "EXOS-6624",
    "EXOS-6695",
    "EXOS-10760",
    "EXOS-9466",
    "EXOS-6574",
    "EXOS-6696",
    "EXOS-13186",
    "EXOS-8156",
    "EXOS-6341",
    "EXOS-6599",
    "EXOS-6696",
    "EXOS-6341",
    "EXOS-6635",
    "EXOS-6696",
    "EXOS-6591",
    "EXOS-13656",
    "EXOS-14774",
    "EXOS-6703",
    "EXOS-15100",
    "EXOS-6341",
    "EXOS-8156",
    "EXOS-12447",
    "EXOS-13458",
    "EXOS-13088",
    "EXOS-13130",
    "EXOS-6642",
    "EXOS-6637",
    "EXOS-6642",
    "EXOS-6696",
    "EXOS-8156",
    "EXOS-6637",
    "EXOS-12603",
    "EXOS-14310",
    "EXOS-6637",
    "EXOS-6695",
    "EXOS-13089",
    "EXOS-10258",
    "EXOS-10661",
    "EXOS-8158",
    "EXOS-11540",
    "EXOS-13133",
    "EXOS-13459",
    "EXOS-8156",
    "EXOS-5903",
    "EXOS-6639",
    "EXOS-6642",
    "EXOS-11630",
    "EXOS-6696",
    "EXOS-6695",
    "EXOS-6593",
    "EXOS-9635",
    "EXOS-9624",
    "EXOS-6695",
    "EXOS-11632",
    "EXOS-6607",
    "EXOS-9025",
    "EXOS-11566",
    "EXOS-15101",
    "EXOS-6696",
    "EXOS-6696",
    "EXOS-6629",
    "EXOS-6631",
    "EXOS-10890",
    "EXOS-6342",
    "EXOS-13313",
    "EXOS-9631",
    "EXOS-13087",
    "EXOS-6696",
    "EXOS-6696",
    "EXOS-9744",
    "EXOS-6611",
    "EXOS-10285",
    "EXOS-9043",
    "EXOS-6642",
    "EXOS-6629",
    "EXOS-6613",
    "EXOS-13095",
    "EXOS-6594",
    "EXOS-6341",
    "EXOS-13092",
    "EXOS-9229",
    "EXOS-9620",
    "EXOS-6611",
    "EXOS-6677",
    "EXOS-13648",
    "EXOS-11549",
    "EXOS-6695",
    "EXOS-10898",
    "EXOS-6696",
    "EXOS-6565",
    "EXOS-6611",
    "EXOS-11658",
    "EXOS-11560",
    "EXOS-6690",
    "EXOS-6612",
    "EXOS-6597",
    "EXOS-13086",
    "EXOS-6341",
    "EXOS-6342",
    "EXOS-12445",
    "EXOS-13655",
    "EXOS-13094",
    "EXOS-10264",
    "EXOS-6611",
    "EXOS-11714",
    "EXOS-6602",
    "EXOS-6596",
    "EXOS-6650",
    "EXOS-9622",
    "EXOS-9221",
    "EXOS-12451",
    "EXOS-6621",
    "EXOS-14311",
    "EXOS-6639",
    "EXOS-8055",
    "EXOS-6696",
    "EXOS-6695",
    "EXOS-14309",
    "EXOS-9021",
    "EXOS-6696",
    "EXOS-13649",
    "EXOS-6692",
    "EXOS-4722",
    "EXOS-10289",
    "EXOS-5900",
    "EXOS-8158",
    "EXOS-13093",
    "EXOS-6642",
    "EXOS-15099",
    "EXOS-6603",
    "EXOS-13657",
    "EXOS-13062",
    "EXOS-6596",
    "EXOS-6696",
    "EXOS-10772",
    "EXOS-11809",
    "EXOS-13090",
    "EXOS-8927",
    "EXOS-6581",
    "EXOS-6696",
    "EXOS-5900",
    "EXOS-6564",
    "EXOS-6813",
    "EXOS-13063",
    "EXOS-13658",
    "EXOS-6696",
    "EXOS-10783",
    "EXOS-6696",
    "EXOS-15106",
    "EXOS-11564",
    "EXOS-12449",
    "EXOS-6651",
    "EXOS-11568",
    "EXOS-6636",
    "EXOS-9629",
    "EXOS-6571",
    "EXOS-6707",
    "EXOS-8156",
    "EXOS-10765",
    "EXOS-8159",
    "EXOS-10657",
    "EXOS-13647",
    "EXOS-4734",
    "EXOS-6650",
    "EXOS-11635",
    "EXOS-6673",
    "EXOS-4117",
    "EXOS-12810",
    "EXOS-9538",
    "EXOS-6570",
    "EXOS-8158",
    "EXOS-11547",
    "EXOS-6589",
    "EXOS-6342",
    "EXOS-11737",
    "EXOS-9646",
    "EXOS-6674",
    "EXOS-5900",
    "EXOS-13650",
    "EXOS-9005",
    "EXOS-13075",
    "EXOS-15089",
    "EXOS-8157",
    "EXOS-6611",
    "EXOS-13091",
    "EXOS-6629",
    "EXOS-6637",
    "EXOS-15088",
    "EXOS-14312",
    "EXOS-15107",
    "EXOS-6629",
    "EXOS-6629",
    "EXOS-8873",
    "EXOS-11562",
    "EXOS-6696",
    "EXOS-13131",
    "EXOS-14773",
    "EXOS-6611",
    "EXOS-13651",
    "EXOS-8156",
    "EXOS-9039",
    "EXOS-11628",
    "EXOS-15080"
];

const login = process.env.LOGIN;
const password = process.env.PASS;

let nodesForestDataStructureTemplate = [
    {
        name : 'name',
        dependencies : [
            {
                name : 'name',
                dependencies : []
            }
        ]
    }
];

function getLeafs(nodes){
    let leafs = [];
    for(let node of nodes){
        if(!node.dependencies || (node.dependencies && node.dependencies.length == 0)){
            leafs.push(node);
        } else {
            leafs = leafs.concat(getLeafs(node.dependencies))
        }
    }
    return leafs;
}    



function getNodesByName(nodes, name){
    let result = [];
    for(let node of nodes){
        if(node.name == name){
            result.push(node);
        }
        if(node.dependencies && node.dependencies.length > 0){
            result = result.concat(getNodesByName(node.dependencies, name));
        }
    }
    return result;
}


let nodes = [
    {
        name : 'node1', 
        dependencies : [
            {
                name: 'node1.1'
            },
            {
                name: 'node1.2', 
                dependencies: [
                    {
                        name: 'node1.2.1', 
                        dependencies : [
                            {
                                name: 'node1.2.1.1'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'node1.3', 
                dependencies:[
                    {
                        name: 'node1.3.1'
                    }
                ]
            }
        ]
    },
    {
        name : 'node2', 
        dependencies : [
            {
                name: 'node2.1'
            },
            {
                name: 'node2.2', 
                dependencies: [
                    {
                        name: 'node2.2.1', 
                        dependencies : [
                            {
                                name: 'node2.2.1.1'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'node2.3', 
                dependencies:[
                    {
                        name: 'node2.3.1'
                    }
                ]
            }
        ]
    }
];


const fetchByKey = async (keys) =>{
    let nodes = [];
    const query = encodeURIComponent(`key in (${keys})`);
    const auth = "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
    const url = `https://jira.devfactory.com/rest/api/2/search?fields=issuelinks,status,summary&jql=${query}&maxResults=5000`;
    try {
        let response = await axios({url : url, json : true, headers : {"Authorization" : auth}});
        for(const issue of response.data.issues){
             let node = {name : issue.key};
             if(issue.fields && issue.fields.issuelinks){
                 node.dependencies = [];
                 for(issueLink of issue.fields.issuelinks){
                    if(issueLink.type && issueLink.type.outward == "depends on"){
                        if(issueLink.outwardIssue && 
                            (issueLink.outwardIssue.fields && issueLink.outwardIssue.fields.issuetype && 
                                issueLink.outwardIssue.fields.issuetype.name == 'End-to-end Test')){
                            let dependency = {name : issueLink.outwardIssue.key}
                            node.dependencies.push(dependency);
                         }
                    } 
                 }
             }
             nodes.push(node);
         }
        return nodes;
    } catch (error) {
        console.log(error);
    }
};

const getKeys = (nodes) => {
    let result = [];
    for(let node of nodes){
        result.push(node.name);
    }
    return result;
};

const chunkArray = (array, chunkSize) => {
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunkSize) {
        tempArray.push(array.slice(index, index + chunkSize));
    }
    return tempArray;
}


const iteration = async (nodes) => {
    let chunks = chunkArray(nodes, 50);
    for(let chunk of chunks){
        let nodesKeys = getKeys(chunk);
        let nodesWithDependencies = await fetchByKey(nodesKeys);
        for(let node of nodes){
            for(nodeWithDependencies of nodesWithDependencies){
                if(node.name == nodeWithDependencies.name){
                    node.dependencies = nodeWithDependencies.dependencies;
                }
            }
        }
    }
    return nodes;
}

const count = (nodes) => {
    let number = 0;
    for(let node of nodes){
        number ++;
        if(node.dependencies && node.dependencies.length > 0){
            number += count(node.dependencies);
        }
    }
    return number;
};

const print = (node, depth) => {
    console.log(new Array(depth).join("\t") + node.name);
    if(node.dependencies && node.dependencies.length > 0){
        for(let dependency of node.dependencies){
            print(dependency, depth + 1);
        }
    }
};

const buildDependenciesGraph = async (initialNodes) => {
    let nodes = [];
    for(let key of initialNodes){
        nodes.push({name : key});
    }
    let preCount = count(nodes);
    while(true){
        console.log("Loading...");
        await iteration(nodes);
        let postCount = count(nodes);
        if(postCount == preCount){
            break;
        } else {
            preCount = postCount;
        }
    }
    return nodes;
};

const buildSequence = (node) => {
    let sequence = [];
    sequence.push(node.name);
    if(node.dependencies && node.dependencies.length > 0){
        for(let dependency of node.dependencies){
            sequence = sequence.concat(buildSequence(dependency));
        }
    }
    return sequence.reverse();
}

module.exports = {
    buildDependenciesGraph : buildDependenciesGraph,
    buildSequence : buildSequence
}


// (async () => {
//     let nodes = await buildDependenciesGraph(E2Es);
//     for(let node of nodes){
//         let sequence = buildSequence(node);
//         console.log("----------------");
//         console.log(node.name + ": " + sequence);
//     }
// })();




