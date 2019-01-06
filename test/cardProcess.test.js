var expect = require('chai').expect
var CardProcess = require('../src/cardProcess');


let store = {
    'name1': {
        name: 'name1',
        cardNumber: 1234567890123456,
        limit: 2000,
        balance: 1000
    },
    'name2': {
        name: 'name2',
        cardNumber: 44444567890123456,
        limit: 1000,
        balance: 0
    },
    'name5': {
        name: 'name5',
        cardNumber: null,
        limit: 500,
        balance: 0
    }
}


describe('cardProcessing methods', () => {
    
    describe('Add', () => {

        it('should add new account', () =>{
            
            // data passed to constructor
            let validData = ['name3', '4111111111111111', '$5000'];

            // obj will be stored in 'store'
            let obj = {
                name: 'name3', 
                cardNumber:'4111111111111111', 
                limit:5000, 
                balance:0 
            }

            let cardProcess = new CardProcess(validData, store);
            cardProcess.add();

            expect(store['name3']).to.deep.equal(obj);
            expect(Object.keys(store)).to.have.lengthOf(4);

        });

        it('should add new account with no card number', () =>{

            // data passed to constructor
            let invalidCard = ['name4', '88328888728726272282228788', '$5000'];

            // reformatted object
            let obj = {
                name: 'name4', 
                cardNumber: null, 
                limit:5000, 
                balance:0 
            }

            let cardProcess = new CardProcess(invalidCard, store);
            cardProcess.add();

            expect(store['name4']).to.deep.equal(obj);
            expect(store['name4'].cardNumber).to.be.a('null');
            expect(Object.keys(store)).to.have.lengthOf(5);
        });

        it('should add no new account due to invalid data', () =>{

            // data passed to constructor
            let invalidData = ['4111111111111122', '$1000'];
            let cardProcess = new CardProcess(invalidData, store);

            cardProcess.add();
            expect(Object.keys(store)).to.have.lengthOf(5);
        })
    });


    describe('Credit', () => {
        it('should credit an account ( deduct from the balance ) ', () =>{
            
            let validData = ['name1','$100'];
            let cardProcess = new CardProcess(validData, store);

            expect(store['name1'].balance).to.equal(1000);
            cardProcess.credit();
            expect(store['name1'].balance).to.equal(900);
        });

        it('should not credit an account ( due to invalid card ) ', () =>{
            
            let validData = ['name5','$1000'];
            let cardProcess = new CardProcess(validData, store);

            expect(store['name5'].balance).to.equal(0);
            cardProcess.credit();
            expect(store['name5'].balance).to.equal(0);
        });
    });

    describe('Charge', () => {
        
        it('should charge an account ( add to the balance )', () => {
            
            let validData = ['name1','$500'];
            let cardProcess = new CardProcess(validData, store);

            expect(store['name1'].balance).to.equal(900);
            cardProcess.charge();
            expect(store['name1'].balance).to.equal(1400);
        });

        it('should not charge an account ( due to invalid card )', () => {
            
            let validData = ['name5','$500'];
            let cardProcess = new CardProcess(validData, store);

            expect(store['name5'].balance).to.equal(0);
            cardProcess.charge();
            expect(store['name5'].balance).to.equal(0);
        });

        it('should not charge an account ( due to over limit )', () => {
            
            // Adding 1500 to the balance, but the name2 person only has $1000 limit. So this should be ignored.
            let validData = ['name2','$1500'];
            let cardProcess = new CardProcess(validData, store);

            expect(store['name2'].balance).to.equal(0);
            cardProcess.charge();
            expect(store['name5'].balance).to.equal(0);
        });
    })


})