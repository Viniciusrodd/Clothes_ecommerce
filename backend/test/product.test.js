
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Product crud', () =>{
    const productTest = {
        name: '',
        size: '',
        price: 0,
        description: 'Flex t-shirt'
    };
    test('Should testing a product creation', () =>{
        return request.post('/product').send(productTest)
        .then((res) =>{
            console.log(res._body.emptyCamps);
            expect(res.status).toEqual(400);
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

    test('Should test delete products route', () =>{
        //no mongodb deve passar o prodId como uma string válida de ObjectId (formato hexadecimal de 24 caracteres)
        const prodId = '64df7b8e9d5b4b39fc7e4567';
        return request.delete(`/product/${prodId}`)
        .then((res) =>{
            console.log(res._body.notFind);
            expect(res.status).toEqual(404);
        })
        .catch((error) =>{
            console.log('Error at delete test', error);
            throw error;
        });
    });

    test('Should test find product by id route', () =>{
        const prodId = '678a997ac66fc0c66edac80f';
        return request.get(`/product/${prodId}`)
        .then((res) =>{
            console.log(res._body.findProd);
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find product by id test', error);
            throw error;
        });
    });

    test('Should test a edit product route', () =>{
        const prodId = '678a997ac66fc0c66edac80f';
        const prodObj = {
            name: 'camisa preta',
            size: '',
            price: 0,
            description: 'camisa não amassa'
        };
        return request.put(`/product/${prodId}`).send(prodObj)
        .then((res) =>{
            console.log(res._body.emptyFields);
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at update product test', error);
            throw error;
        });
    });
});