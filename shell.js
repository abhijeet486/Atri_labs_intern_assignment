const process = require('process');({})
const prompt = require('prompt-sync')({sigint: true});;
let exitfromshell = false;

while(!exitfromshell){
    const cmd = prompt(process.cwd() + ':Shell> ');
    // console.log(`\nExecuting ${cmd} ...`);
    if(cmd==='exit'){
        exitfromshell = true;
        console.log('Exiting ...');
    }
    else{
        if(cmd.substring(0,3)==='cd '){
            try {
                // Changing the directory with below namey
                process.chdir(cmd.substring(3,cmd.length));
                console.log("New Directory: "+process.cwd());
            } catch (err) {
                // Printing error if occurs
                console.error("Error while changing directory", err);
            }
        }
        else if(cmd.substring(0,3)==='pwd'){
            console.log("Current working directory : "+process.cwd());
        }
        else{
            console.log("TOBEDONE");
        }
    }
}