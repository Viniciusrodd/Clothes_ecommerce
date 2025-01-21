
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Product crud', () =>{
    const productTest = {
        name: 'testeProd',
        size: '21',
        price: 10,
        description: 'Flex t-shirt'
    };
    test('Should testing a product creation', () =>{
        return request.post('/product').send(productTest)
        .then((res) =>{
            console.log(res._body.emptyCamps);
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at testing product register');
            throw error;
        })
    });

    test('Should find all products', () =>{
        return request.get('/products')
        .then((res) =>{
            //console.log(res._body.products)
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find products test', error);
            throw error;
        })
    });
});