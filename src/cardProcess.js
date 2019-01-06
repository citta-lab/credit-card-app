const luhn = require('luhn');
var store = require('./store');


class CardProcess {
    
    constructor(data) {
        this.data = data;
    }

    /**
     * "Add" will create a new credit card for a given name, card number, limit
     * and starting balance of '0'.
     */
    add(){
        
        // sanity check to make sure we have all required attributes to add new account
        if(this.data.length != 3){
            console.log(" Missing required data to add new credit card ");
            return;
        }

        let name = this.data.shift();
        let number = this.data.shift();
        let limit = this.data.shift();

        store[name] = { 
            name, 
            cardNumber: validateNumber(number),
            limit: remove$(limit),
            balance: 0
        }
    }

    /**
     * "Credit" will decrease the balance of the card associated 
     *  with the provided name by the amount specified
     */
    credit(){
        
        let name = this.data.shift();
        let creditAmount = this.data.shift();
        let account = store[name];

        if(account && account.cardNumber){
            account.balance = account.balance - remove$(creditAmount);
        }
    }

    /**
     * "Charge" will increase the balance of the card associated with
     * the provided name by the amount specified
     */
    charge(){

        let name = this.data.shift();
        let chargeAmount = this.data.shift();
        let account = store[name];

        if(account && account.cardNumber){
            //check newbalance over the provided limit 
            let newBalance = account.balance + remove$(chargeAmount);
            
            if(newBalance < account.limit){
                account.balance = newBalance;
            }
        }
    }
}

// helper funtion to remove '$' symbol
let remove$ = function(amount){
    return Number(amount.replace('$',''));
}

// helper funtion to validate credit card number using luhn npm package
let validateNumber = function(number){
    return luhn.validate(number) ? number : null;
}

module.exports = CardProcess;