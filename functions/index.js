const functions = require('firebase-functions');

exports.getPrice = functions.region("europe-west1").https.onCall((data, context) => {
    if (data.value<5000){
        return {
            type: 'error',
            value: 'PRICE_TOO_LOW',
        }
    }
    if (data.age<18){
        return {
            type: 'error',
            value: 'AGE_TOO_LOW',
        }
    }
    if (data.age<25 && data.car==='Prosche'){
        return {
            type: 'error',
            value: 'REFUSE',
        }
    }

    let global=0;
    let universal=0;
    switch (data.car){
        case 'audi':
            global= 250;
            universal=250+0.003*data.value;
            break;
        case 'bmw':
            global= 150;
            universal=150+0.004*data.value;
            break;
        case 'porsche':
            global= 500;
            universal=500+0.007*data.value;
            break;
        default:
            return {
                type: 'error',
                value: 'INCORRECT_DATA',
            }
    }
    return ({
        type:`success`,
        value: {
            global: global,
            universal: universal
        }
    })
});

// admin.initializeApp();