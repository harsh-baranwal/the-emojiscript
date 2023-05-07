#!/usr/bin/env node

const fs = require("mz/fs");
var pjson = require('./package.json');
const chalk = require("chalk");

const logo = chalk.hex('#FF5910');
const args = process.argv.slice(2);

console.info(logo(`
                              ██  ██                          ██             ▄   
  ▄▄▄▄  ▄▄ ▄▄ ▄▄     ▄▄▄     ▄▄▄ ▄▄▄   ▄▄▄▄    ▄▄▄▄  ▄▄▄ ▄▄  ▄▄▄  ▄▄▄ ▄▄▄  ▄██▄  
▄█▄▄▄██  ██ ██ ██  ▄█  ▀█▄    ██  ██  ██▄ ▀  ▄█   ▀▀  ██▀ ▀▀  ██   ██▀  ██  ██   
██       ██ ██ ██  ██   ██    ██  ██  ▄ ▀█▄▄ ██       ██      ██   ██    █  ██   
 ▀█▄▄▄▀ ▄██ ██ ██▄  ▀█▄▄█▀    ██ ▄██▄ █▀▄▄█▀  ▀█▄▄▄▀ ▄██▄    ▄██▄  ██▄▄▄▀   ▀█▄▀ 
                           ▄▄ █▀                                   ██            
                            ▀▀                                    ▀▀▀▀           

>> https://github.com/harsh-baranwal/the-emojiscript
`))

if (args == "") {
  console.log(
`Commands:
    emorun <filepath>
    👀(eyes) <filepath>       Interpret the emojiscript file and print the output.

Options:
    --help      Show help
    --version   Show version 
  `)
}
else if (args == "--help") {
  return help();
}
else if (args == "--version" || args == "-v") {
  console.log("v"+pjson.version);
}
else {
  console.log("Unknown command fetched.")
}

function help() {
console.log(
`Usage:  emorun [filepath]
        👀(eyes) [filepath]

Options:
    --help      Show help
    --version   Show version

Documentation can be found at`, chalk.underline.greenBright(`https://github.com/harsh-baranwal/the-emojiscript`)
)
}