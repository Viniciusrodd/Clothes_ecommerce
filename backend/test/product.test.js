
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let productTest = {
    name: 'testeProd',
    size: 'P',
    price: 45,
    description: 'Flex t-shirt'
}
describe('Product crud', () =>{
/*  
    test('Should testing a product creation', () =>{
        return request.post('/product').send(productTest)
        .then((res) =>{
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at testing product register');
            throw error;
        })
    })
*/
    test('Should find all products', () =>{
        return request.get('/products')
        .then((res) =>{
            console.log(res._body.products)
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find products test', error);
            throw error;
        })
        expect(products).toEqual(200);
    })
})