// Imports
import { createInterface } from 'readline';
import { stdin, stdout} from 'process';
import { existsSync } from 'fs';
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
    spawn(command, {cwd: cwd, detached: true, shell: true});
}

let httpOptions = {
    hostname: 'localhost',
    method: 'GET'
}
function portInUse(port) {
    httpOptions.port = port;
    try {
        request(httpOptions)
        return true;  // If the code gets to this point, theres a server running
    } catch (err) {
        if (err.code == "ECONNREFUSED") return false;
        else console.log(err);
    }
}

function newAppPrompt(prompt, appName, command, statusText) {
    prompts.push({
        "prompt": prompt,
        "cwd": appDir(appName),
        "command": command,
        "statusText": statusText
    });
}

function listPrompts() {
    if (!isInstalled("svelte")) {
        newAppPrompt("Install Svelte/frontend", "svelte", "npm install");
    } else {
        newAppPrompt("Install Svelte/frontend", "svelte", "npm install");
        newAppPrompt("Install Svelte/frontend", "svelte", "npm install");
    }
    
    console.log("[q] Quit");
}

const rl = createInterface(stdin, stdout);
let prompts = [];  // [{prompt, cwd, command}]


function parseAnswer(answer) {
    let answerInt = parseInt(answer);

    console.log(answer);

    if (answerInt != NaN && answerInt >= 0 && answerInt < prompts.length) {
        let choice = prompts[answerInt];
        console.log(choice);
        runCommand(choice.cwd, choice.command);
    } else if (answer.toLowerCase().startsWith("q")) {
        return;
    }
    main();
}

function main() {
    listPrompts();
    rl.question("meow: ", parseAnswer);
}

main();