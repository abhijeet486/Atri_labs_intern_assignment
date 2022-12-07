const process = require('process');
const prompt = require('prompt-sync')({sigint:true});
const files = require('fs');
const child = require('child_process');  

let exitfromshell = false;

while(!exitfromshell){
    console.log("Parent["+process.pid+"]");
    const cmd = prompt(process.cwd() + ':Shell> ');
    // console.log(`\nExecuting ${cmd} ...`);
    var commands = cmd.split(" ").filter(element=>element);
    if(commands[0]==='exit' && commands.length==1){
        exitfromshell = true;
        console.log('Exiting ...');
    }
    else{
        if(commands.length===2 && commands[0]==='cd'){
            try {
                // Changing the directory with below namey
                process.chdir(commands[1]);
                console.log("New Directory: "+process.cwd());
            } catch (err) {
                // Printing error if occurs
                console.error("Error while changing directory", err);
            }
        }
        else if(commands.length===1 && commands[0] ==='pwd'){
            console.log("Current working directory : "+process.cwd());
        }
        else if(commands.length===2 && commands[0]=='ls'){
            try{
                files.readdirSync(commands[1]).forEach(file => {
                console.log(file);
                });
            }   
            catch(Err){
                console.error("Error while listing the files in "+Folder, Err);
            }
        }
        else if(files.existsSync(commands[0])){
            var wp = child.spawn(commands[0],commands.slice(1,));
            console.log("Child process created with PID["+wp.pid+"]");
            process.on('SIGINT',function(){
                console.log('SIGINT');
                console.log(process.pid,wp.pid);
                wp.kill('SIGINT');
                // process.kill(process.pid, 'SIGINT');
            });
            // var wp = child.fork(commands[0],commands.slice(1,));
            wp.on('spawn',function(){
                console.log('Child process['+wp.pid+']');
            });
            // wp.stdout.on('data', function (data) {  
            //     console.log('stdout: ' + data); 
            // });
            // wp.stdin.write(cmd);
            // wp.stderr.on('data', function (data) {  
            //     console.log('stderr: ' + data);  
            // });  
            wp.on('close', function (code,signal) {  
                console.log('exited with code: ' + code + ' signal: '+signal);  
            });
        }
        else{
            console.log("wrong commands entry!!");
        }
    }
}