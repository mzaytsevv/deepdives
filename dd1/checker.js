const gitChangedFiles = require('git-changed-files')
const args = require('minimist')(process.argv.slice(2))
const {exec} = require("child_process");
const fs = require('fs');
let warn = args['warn'];

let duplicates = {};

const countDuplicity = function(){
    exec("jscpd --ignore '**/node_modules/**' . --reporters json", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        
        let report = JSON.parse(fs.readFileSync('report/jscpd-report.json', 'utf8'));
        for(const formatName in report.statistics.formats){
            let format = report.statistics.formats[formatName];
            for(const sourceName in format.sources){
                let source = format.sources[sourceName];
                if(source.duplicatedLines > 0){
                    duplicates[sourceName] = source.duplicatedLines;
                }        
            }
        }

        (async() => {
            let changedGitFiles = await gitChangedFiles();
            let abort = false;
            let allFiles = changedGitFiles.unCommittedFiles.concat(changedGitFiles.committedFiles);
            for(const changedFile of allFiles){
                for(const sourceName in duplicates){
                    if(changedFile == sourceName && duplicates[sourceName] > 0){
                        console.log("\x1b[31m", "The code you produced has more then acceptable level of duplicity: ");
                        console.log("\x1b[31m", sourceName + ": " + duplicates[sourceName]);
                        console.log("\x1b[0m", "");
                        abort = true;
                    }
                }
            }
            if(warn == "false" && abort){
                process.exit(1);
            }
        })().catch((err) => {
              console.log(err);
        });
    });        
};

countDuplicity();


