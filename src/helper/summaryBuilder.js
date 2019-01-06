
let store = require('../store');

/**
 * Helper function to print the summary statements.
 */
let summaryBuilder = function (){
    Object.keys(store).sort().map((name) => {
        let account = store[name];
        console.log(`${name}: ${(account.cardNumber ? ('$' + account.balance) : 'error')}`)
    })
}

module.exports = summaryBuilder;