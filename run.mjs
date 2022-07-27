// Imports
import { createInterface } from 'readline';
import { stdin, stdout} from 'process';
import { existsSync, writeFileSync } from 'fs';
import { spawn } from 'child_process';
import { request } from 'http';


// Functions
/**
 * 
 * @param appName dirname within app/
 * @returns path to app/dirName
 */
function appDir(appName) {
    return `app/${appName}`;
}

/**
 * 
 * @param appName name of the app (within app/, @see appDir)
 * @returns bool: true if node_modules of app are installed, false if not
 */
function isInstalled(appName) {
    return existsSync(`${appDir(appName)}/node_modules`);
}

/**
 * 
 * @param cwd directory the command should be run in
 * @param command (if command != function) the command that has to be run in a detached child shell/cmd/bash
 *                (if command == function) the JavaScript function that has to be run
 * @returns (if command != function) the return of @function child_process.spawn 
 * @returns (if command == function) void
 */
function runCommand(cwd, command) {
    if (typeof(command) != 'function') {
        return spawn(command, {cwd: cwd, detached: true, shell: true});
    } else {
        command();
    }
}

/**
 * 
 * @param pid Process which to kill, including children. 
 * @todo Only tested on Windows, Unix uncertain 
 */
function kill(pid){
    if (process.platform.startsWith('win')) {
        spawn(`taskkill `, ['/pid', pid, '/f', '/t'], {shell: true});
    } else {
        spawn('kill', ['-9', pid], {shell: true});
    }
}

let httpOptions = {
    hostname: 'localhost',
    method: 'GET'
}
/**
 * Checks whether specified port is in use
 * Requests based on @see httpOptions
 * 
 * @param port number of port to check 
 * @returns true if port is in use, false if port is free
 */
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

/**
 * 
 * @param prompt prompt that will be displayed to the user. (will show as [0] Prompt...)
 * @param appName name of app, @see appDir
 * @param command command that has to be run, @see runCommand
 * @param id The id can be anything: its a custom string 
 *           used to keep track of the child process, to allow killing it down the line
 */
function newAppPrompt(prompt, appName, command, id='') {
    prompts.push({
        'cwd': appDir(appName),
        'command': command,
        'id': id
    });
    console.log(`[${i}] ${prompt}`);
    i++;
}

let i;
let prompts;  // [{cwd, command}]

/**
 * Displays the UI:
 * - If Svelte isn't installed: allow install
 * - If Svelte is installed:
 *   - And dev server isn't running: allow running
 *   - And dev server is running:
 *     - And it was started through the cli, allow closing it. Else, display "in use" message
 *   - Allow static building Svelte
 * 
 * - If Solidpod Testserver isn't installed: allow install
 * - If Solidpod Testserver is installed:
 *   - And it's not running: allow running
 *   - And it's running:
 *     - And it was started through the cli, allow closing it. Else, display "in use" message
 *     - If user JohnDoe doesn't exist: allow creating them
 *     - If user JohnDoe exists:
 *       - And has a calendar: allow clearing it
 *       - And has no calendar, display "not found" message
 *
 * - Display how to exit cleanly (typing 'q')
 */
async function listPrompts() {
    prompts = []
    i = 0;

    if (!isInstalled('svelte')) {
        newAppPrompt('Install Svelte/frontend', 'svelte', 'npm install');
    } else {
        if (await portInUse(3333)) {
            if (processes['sveltedev']) {
                newAppPrompt('Exit Svelte/frontend dev server', 'svelte', ()=>{
                    let pid = processes['sveltedev'].pid;
                    kill(pid)
                });
            } else {
                console.log('[ ] Port 3333 in use!')
            }
        } else {
            newAppPrompt('Run svelte/frontend locally', 'svelte', 'npm run dev', 'sveltedev');
        }
        newAppPrompt('Build svelte/frontend', 'svelte', 'npm run build');
    }
    
    if (!isInstalled('solidpod-testserver')) {
        newAppPrompt('Install Solidpod Testserver', 'solidpod-testserver', 'npm install');
    } else {
        if (await portInUse(3000)) {
            if (processes['solid']) {
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
                    newAppPrompt('Create testuser John Doe', 'solidpod-testserver', 'setup-credentials.sh');
                }

                newAppPrompt('Exit Solidpod Testserver', 'solidpod-testserver', ()=>{
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
    console.log('[q] Quit');
}

/**
 * When the readline interface is closed, so should the proecss
 */
const rl = createInterface(stdin, stdout);
rl.on('close', () => {
    process.exit(0);
});


/**
 * Do actions based on user input:
 * - If the user typed 'q' for quit: close readline, which will close the process
 * - If the user selected a prompt, execute the associated command, then re-prompt
 * - If the user didn't do either of the above, skip and re-prompt
 * 
 * @param answer Unfiltered user input 
 */
function parseAnswer(answer) {
    let answerInt = parseInt(answer);

    console.log(answer);

    if (answerInt != NaN && answerInt >= 0 && answerInt < prompts.length) {
        let choice = prompts[answerInt];
        let child = runCommand(choice.cwd, choice.command);
        processes[choice.id] = child;

    } else if (answer.toLowerCase().startsWith('q')) {
        rl.close();  // This will also exit the application
    }
    main();
}

let processes = {};
/**
 * Show UI with @see listPrompts, and allow the user to select an option
 * This function is recursive
 */
async function main() {
    await listPrompts();
    rl.question('Select option: ', parseAnswer);
}

main();