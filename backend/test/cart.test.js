
// libs
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const mongoose = require('mongoose');


// mongodb connection
beforeAll(async () =>{
    await mongoose.connect('mongodb://localhost:27017/clothesCommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000 // garante que falhe rápido se não conectar
    });
    console.log('MongoDB database connected');
});

// mongoDB Disconnect
afterAll(async () => {
    await mongoose.disconnect();
    console.log('Mongoose disconnected after tests');
});


// tests
describe('Cart tests', () => {
    const userIdTest = '68795646feaec83a18c9cf72' // test updated
    const productIdTest = '678a997ac66fc0c66edac80f' // camisa branca 

    // products add in cart
    test('Should test add products at cart', () => {
        const productTest = {
            userId: userIdTest,
            productId: productIdTest
        }
        return request.post('/cart').send(productTest)
        .then((res) => {
            console.log('ADD PRODUCTS AT CART TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at add products in cart test: ', error);
            throw error;
        });
    });

    // find products in cart
    test('Should test a products find at cart', () => {
        return request.get(`/cartProducts/${userIdTest}`)
        .then((res) => {
            console.log('FIND PRODUCTS IN CART TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at find products at cart test: ', error);
            throw error;
        });
    });

    // delete product from cart
    test('Should test a delete product from cart', () => {
        return request.delete(`/cartRemoveProducts/${userIdTest}/${productIdTest}`)
        .then((res) => {
            console.log('REMOVE PRODUCTS FROM CART TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at remove products from cart test: ', error);
            throw error;
        })
    });
    
    // create client in abacatePay
    test('Should test a client creation in abacatePay API', () => {
        const userData = {
            name: 'userTest',
            cellphone: '12971434109',
            email: 'teste_teste@gmail.com',
            taxId: '136.817.398-54'
        };
        return request.post('/createClient').send(userData)
        .then((res) => {
            console.log('CREATE CLIENTE IN API TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at create client in API test: ', error);
            throw error;
        })
    });

});