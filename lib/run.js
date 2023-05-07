const fs = require("mz/fs");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const parseCli = '../AppData/Roaming/npm/node_modules/emojiscript/bin/parse.js';
const genCli = '../AppData/Roaming/npm/node_modules/emojiscript/bin/generate.js';

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("File missing: .emoji file is not available.");
        return;
    }
    const astFilename = filename.replace(".emoji", ".ast");
    const jsFilename = filename.replace(".emoji", ".js");
    await myExec(`node ${parseCli} ${filename}`);
    await myExec(`node ${genCli} ${astFilename}`);
    await myExec(`node ${jsFilename}`);
    fs.unlink(astFilename);
    fs.unlink(jsFilename);
}

async function myExec(command) {
    const output = await exec(command);
    if (output.stdout) {
        process.stdout.write(output.stdout);
    }
    if (output.stderr) {
        process.stdout.write(output.stderr);
    }
}

main().catch(err => console.log(err.stack));