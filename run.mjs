// Imports
import { createInterface } from 'readline';
import { stdin, stdout} from 'process';
import { existsSync } from 'fs';
import { spawn } from 'child_process';


// Functions
function appDir(appName) {
    return `app/${appName}`;
}

function isInstalled(appName) {
    return existsSync(`${appDir(appName)}/node_modules`);
}
function runCommand(cwd, command) {
    spawn(command, {cwd: cwd, detached: true, shell: true});
}

const rl = createInterface(stdin, stdout);
let prompts = [];  // [{prompt, cwd command}]

if (!isInstalled("svelte")) {
    prompts.push({
        "prompt": "Install Svelte/frontend",
        "cwd": appDir("svelte"),
        "command": "npm install"
    });
} else {

}

prompts.forEach((prompt, i) => {
    console.log(`[${i}] ${prompt.prompt}`);
})

let answer;
let exit = false;
while (!exit) {
    console.log("Answer: ")
    answer = await rl.prompt();
    console.log("yeter")
    answer = parseInt(answer);

    console.log(answer);

    if (answer != NaN && answer >= 0 && answer < prompts.length) {
        let choice = answer[i];
        console.log(choice);
        runCommand(choice.cwd, choice.command);
    } else exit = true;
}