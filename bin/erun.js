#!/usr/bin/env node

const fs = require("mz/fs");
const chalk = require("chalk");
const exec = require('child_process').exec;
const clirun = require(__dirname + '/../run.js');

const args = process.argv.slice(2);

if (args == "") {
  console.log(chalk.greenBright(`
>> https://github.com/harsh-baranwal/the-emojiscript`,
`
Please provide a emojiscript file to compile & run.`
))}
else if (args[0].search(".emoji") > -1 || args[0].search(".🔥") > -1) {
    return run();
}
else {
  console.log(chalk.red('Please provide only .emoji/🔥 file, Type "emojiscript --help" to get help.'));
}

function run() {
  var filename = args.toString();
  exec(`node ${clirun} ${filename}`, (e, stdout, stderr) => {
      if (e instanceof Error) {
          console.error(e);
          throw e;
      }
      console.log(stdout);
  })
}