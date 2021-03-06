var fs = require('fs');
var readline = require('readline');
const chalk = require('chalk');

const parser = require('./src/helper/parserHelper');
const summary = require('./src/helper/summaryBuilder');

/**
 * Main entry point for the application which is responsible reading user input.
 * Step 1: read user input data whether it is of type file or standard input.
 * Step 2: sort user data alphabetically using helper funtion.
 * Step 3: send sorted data to parser to determine the credit card processing need.
 */

 let app = function () {

    // user input of format 'node app.js test.txt' or 'node app.js 23'
    const userArgs = process.argv[2];
    let dataStream = [];
    let inputStream;

    if(userArgs){
        inputStream = readline.createInterface({
            input: fs.createReadStream(userArgs)
        });
    }else{
        console.log(chalk.bold.green("Please input one user value at a time, once done please hit CTRL+C to start the processing and CTRL+Z to exit "));
        inputStream = readline.createInterface({
            input: process.stdin
        })
    }

    // called when the user presses enter or return.
    inputStream.on('line', (input) => {
        dataStream.push(input);
    });

    // called once data has been read completely.
    inputStream.on('close', () => {
        dataProcesser(dataStream);
    });  

    // called when CTRL-C is pressed for STDIN
    process.on('SIGINT', () => {
        dataProcesser(dataStream);
    })
 }

 /**
  * helper function to process stream of data called when end of the file is read
  * or Control C is pressed from the user.
  */
 let dataProcesser = (dataStream) => {
    dataStream.forEach((data) => {
        parser(data);
    });

    // printing the report using the helper.
    summary();
 }

 app();