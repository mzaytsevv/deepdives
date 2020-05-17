const axios = require('axios');

const login = process.env.LOGIN;
const password = process.env.PASS;

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

//data structure example for deebugging
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



