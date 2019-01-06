/**
 * Sorting function to sort the data.
 * @param {string} a - first charecter of type string.
 * @param {string} b - second charecter of type string.
 */
let sortHelper = function(a, b){
    if(a.firstname < b.firstname) { return -1; }
    if(a.firstname > b.firstname) { return 1; }
    return 0;
};

module.exports.sortHelper = sortHelper;