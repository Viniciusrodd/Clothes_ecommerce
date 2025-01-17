
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let productTest = {
    name: 'testeProd',
    size: 'P',
    price: 45,
    description: 'Flex t-shirt'
}

test('Should testing a product register', () =>{
    return request.post('/product').send(productTest)
    .then((res) =>{
        expect(res.status).toEqual(200);
    })
    .catch((error) =>{
        console.log('Error at testing product register');
        throw error;
    })
})