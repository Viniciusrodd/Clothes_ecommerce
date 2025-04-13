
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Cart tests', () => {
    // products add in cart
    test('Should test add products at cart', () => {
        const productTest = {
            userId: '67ed990693dda856d4a2fe36',
            productId: '678a9a28c66fc0c66edac812'
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
        const userId = '67ed990693dda856d4a2fe36';
        return request.get(`/cartProducts/${userId}`)
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
        const userId = '67ed990693dda856d4a2fe36';
        const productId = '';
        return request.delete(`/cartRemoveProducts/${userId}/${productId}`)
        .then((res) => {
            console.log('REMOVE PRODUCTS FROM CART TEST SUCCESS (404)');
            expect(res.status).toEqual(404);
        })
        .catch((error) => {
            console.log('Error at remove products from cart test: ', error);
            throw error;
        })
    });
    
    // create client in abacatePay
    test('Should test a client creation in abacatePay API', () => {
        const userData = {
            name: undefined,
            cellphone: '12971434109',
            email: 'teste_teste@gmail.com',
            taxId: '136.817.398-54'
        };
        return request.post('/createClient').send(userData)
        .then((res) => {
            console.log('CREATE CLIENTE IN API TEST SUCCESS (400)');
            expect(res.status).toEqual(400);
        })
        .catch((error) => {
            console.log('Error at create client in API test: ', error);
            throw error;
        })
    });

});