const chalk = require('chalk');
const store = require('../store');

/**
 * Helper function to print the summary statements.
 */
let summaryBuilder = function (){

    //prettifying the view
    const error = chalk.bold.red;
    const attention = chalk.bold.yellow;
    const good= chalk.bold.green;
    const boarder = chalk.bold.blue;

    console.log(boarder("######### ACCOUNT SUMMARY #########"));
    Object.keys(store).sort().map((name) => {
        let account = store[name];
        let money = account.balance > 0 ? good(account.balance) : attention(account.balance);
        console.log(`${name}: ${(account.cardNumber ? ('$' + money) : error('error'))}`)
    })
    console.log(boarder("############### END ###############"));
}

module.exports = summaryBuilder;