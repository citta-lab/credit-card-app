var fs = require('fs');
var readline = require('readline');

var sortNames = require('./src/helper/sortHelper');
var parser = require('./src/helper/parserHelper');


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
        //dataStream.sort(sortNames);
        dataStream.forEach((data) => {
            parser(data);
        })
    })
    
 }

 app();