
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

    // create product
    test('Should testing a product creation', () =>{
        return request.post('/product').send(productTest)
        .then((res) =>{
            console.log('CREATE PRODUCT TEST SUCCESS');
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at testing product register');
            throw error;
        })
    });

    // find all products
    test('Should find all products', () =>{
        return request.get('/products')
        .then((res) =>{
            console.log('FIND ALL PRODUCTS TEST SUCCESS')
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find products test', error);
            throw error;
        })
    });

    // delete product by id
    test('Should test delete products route', () =>{
        //no mongodb deve passar o prodId como uma string válida de ObjectId (formato hexadecimal de 24 caracteres)
        const prodId = '64df7b8e9d5b4b39fc7e4567';
        return request.delete(`/product/${prodId}`)
        .then((res) =>{
            console.log('DELETE PRODUCT TEST SUCCESS');
            expect(res.status).toEqual(404);
        })
        .catch((error) =>{
            console.log('Error at delete test', error);
            throw error;
        });
    });

    // find product by id
    test('Should test find product by id route', () =>{
        const prodId = '678a997ac66fc0c66edac80f';
        return request.get(`/product/${prodId}`)
        .then((res) =>{
            console.log('FIND PRODUCT BY ID TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find product by id test', error);
            throw error;
        });
    });

    // update one product
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
            console.log('PRODUCT EDIT TEST SUCCESS');
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at update product test', error);
            throw error;
        });
    });
});