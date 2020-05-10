const gitChangedFiles = require('git-changed-files')
const args = require('minimist')(process.argv.slice(2))
let warn = args['warn'];


const countDuplicity = async function(){
    (async() => {
        let committedGitFiles = await gitChangedFiles();
        console.log(committedGitFiles);
      })().catch((err) => {
          console.log(err);
        });
};

let duplicity = 0;

duplicity = countDuplicity();

if(!warn){
    if(duplicity > 50){
        process.exit(1);
    }
};


