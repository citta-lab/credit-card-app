const CardProcess = require('../CardProcess');

/**
 * Parser function to determine what kind of credit card processing
 * operation we need to do to perform.
 * @param {*} data - string line of credit data passed from the text
 * file
 */
let parser = function(data) {
    //split by space to create array of strings.
    let arr = data.split(' ');
    let action = arr.shift();

    let cardProcess = new CardProcess(arr);

    // determining specific operation.
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
            break;
    }
}

module.exports = parser;