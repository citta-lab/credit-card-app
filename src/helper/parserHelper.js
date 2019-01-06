const CardProcess = require('../CardProcess');

/**
 * Parser function to determine what kind of credit card processing
 * operation we need to do to perform.
 * @param {*} data - string line of credit data passed from the text
 * file
 */
let parser = function(data) {
    //split by space to create array of strings and use shift to grab the first element.
    let arr = data.split(' ');
    let action = arr.shift();

    let cardProcess = new CardProcess(arr);

    // determining specific operation based on the action.
    switch (action) {
        case("Add"):
            cardProcess.add();
            break;
        case("Credit"):
            cardProcess.credit();
            break;
        case("Charge"):
            cardProcess.charge();
            break;
        default:
            console.info("Couldn't perform any action, please verify data");
            break;
    }
}

module.exports = parser;