const functions = require('firebase-functions');

exports.getPrice = functions.region("europe-west1").https.onCall((data, context) => {
    if (data.price<5000){
        return {
            type: 'ERROR',
            value: 'Sorry! The price of the car is too low!',
        }
    }
    if (data.age<18){
        return {
            type: 'ERROR',
            value: 'Sorry! The driver is too young!',
        }
    }
    if (data.age<25 && data.car==='porsche'){
        return {
            type: 'ERROR',
            value: 'Sorry! We cannot accept this particular risk.',
        }
    }
    let global=0;
    let universal=0;
    switch (data.car){
        case 'audi':
            global= 250;
            universal=250+0.003*data.price;
            break;
        case 'bmw':
            global= 150;
            universal=150+0.004*data.price;
            break;
        case 'porsche':
            global= 500;
            universal=500+0.007*data.price;
            break;
        default:
            return {
                type: 'ERROR',
                value: 'Incorrect data',
            }
    }
    return ({
        type:`SUCCESS`,
        value: {
            global: global,
            universal: universal
        }
    })
});