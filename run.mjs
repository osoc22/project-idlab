// Imports
import { createInterface } from 'readline';
import { stdin, stdout} from 'process';
import { existsSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { request } from 'http';


// Functions
function appDir(appName) {
    return `app/${appName}`;
}

function isInstalled(appName) {
    return existsSync(`${appDir(appName)}/node_modules`);
}
function runCommand(cwd, command) {
    if (typeof(command) != "function") {
        return spawn(command, {cwd: cwd, detached: true, shell: true});
    } else {
        command();
    }
}

function kill(pid){
    if (process.platform.startsWith('win')) {
        spawn(`taskkill `, ['/pid', pid, '/f', '/t'], {shell: true});
    } else {
        spawn(`kill -9 ${pid}`);
    }
}

let httpOptions = {
    hostname: 'localhost',
    method: 'GET'
}
async function portInUse(port) {
    // Promise solution based off https://stackoverflow.com/a/37104225
    httpOptions.port = port;
    return await new Promise(resolve => {
        let req = request(httpOptions)
            .on('error', (err) => {
                resolve(false);
            }).on('response', (res) => {
                resolve(true);
            })
        req.end();
    })
}

// The id can be anything: its a custom string used to kill the process down the line
function newAppPrompt(prompt, appName, command, id="") {
    prompts.push({
        "cwd": appDir(appName),
        "command": command,
        "id": id
    });
    console.log(`[${i}] ${prompt}`);
    i++;
}

let i;
let prompts;  // [{cwd, command}]
async function listPrompts() {
    prompts = []
    i = 0;

    if (!isInstalled("svelte")) {
        newAppPrompt("Install Svelte/frontend", "svelte", "npm install");
    } else {
        if (await portInUse(3333)) {
            if (processes["sveltedev"]) {
                newAppPrompt("Exit Svelte/frontend dev server", "svelte", ()=>{
                    let pid = processes['sveltedev'].pid;
                    kill(pid)
                });
            } else {
                console.log("[ ] Port 3333 in use!")
            }
        } else {
            newAppPrompt("Run svelte/frontend locally", "svelte", "npm run dev", "sveltedev");
        }
        newAppPrompt("Build svelte/frontend", "svelte", "npm run build");
    }
    
    //if (!isInstalled("backend"))

    if (!isInstalled("solidpod-testserver")) {
        newAppPrompt("Install Solidpod Testserver", "solidpod-testserver", "npm install");
    } else {
        if (await portInUse(3000)) {
            if (processes["solid"]) {
                let johndoe = appDir('solidpod-testserver') + '/data/johndoe/';
                if (existsSync(johndoe)) {
                    let calendar = johndoe + 'calendar$.ttl';

                    if (existsSync(calendar)) {
                        newAppPrompt('Clear John Doe\'s calendar', 'solidpod-testserver', () => {
                            writeFileSync(calendar, '');
                        });
                    } else {
                        console.log('[ ] No test calendar found in Solidpod testserver');
                    }
                    
                } else {
                    newAppPrompt("Create testuser John Doe", 'solidpod-testserver', 'setup-credentials.sh');
                }

                newAppPrompt("Exit Solidpod Testserver", "solidpod-testserver", ()=>{
                    let pid = processes['solid'].pid;
                    kill(pid)
                });
            } else {
                console.log('[ ] Port 3000 already in use');
            }
        } else {
            newAppPrompt('Start Solidpod Testserver', 'solidpod-testserver', 'npm run start', 'solid');
        }
    }

    // UI
    console.log("[q] Quit");
}

const rl = createInterface(stdin, stdout);
rl.on('close', () => {
    process.exit(0);
});


function parseAnswer(answer) {
    let answerInt = parseInt(answer);

    console.log(answer);

    if (answerInt != NaN && answerInt >= 0 && answerInt < prompts.length) {
        let choice = prompts[answerInt];
        let child = runCommand(choice.cwd, choice.command);
        processes[choice.id] = child;

    } else if (answer.toLowerCase().startsWith("q")) {
        rl.close();  // This will also exit the application
    }
    main();
}

let processes = {};
async function main() {
    await listPrompts();
    rl.question("meow: ", parseAnswer);
}

main();