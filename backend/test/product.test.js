
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

describe('Product test', () =>{

    let productIdTest; 

    const productTest = {
        name: 'test',
        size: 'g',
        price: 20.00,
        description: 'Flex t-shirt'
    };

    // create product
    test('Should testing a product creation (without image)', () =>{
        return request.post('/product').send(productTest)
        .then((res) =>{
            console.log('CREATE PRODUCT TEST SUCCESS');
            expect(res.status).toEqual(200);
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
            console.log('FIND ALL PRODUCTS TEST SUCCESS');
            productIdTest = res.body.products.at(-1)._id; // last element
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at find products test', error);
            throw error;
        })
    });
    
    // find product by id
    test('Should test find product by id route', () =>{
        return request.get(`/product/${productIdTest}`)
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
    test('Should test a edit product route (without image)', () =>{
        const prodObj = {
            name: 'test update',
            size: 'g',
            price: 20.50,
            description: 'test description'
        };
        return request.put(`/product/${productIdTest}`).send(prodObj)
        .then((res) =>{
            console.log('PRODUCT EDIT TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at update product test', error);
            throw error;
        });
    });

    // delete product by id
    test('Should test delete products route', () =>{
        return request.delete(`/product/${productIdTest}`)
        .then((res) =>{
            console.log('DELETE PRODUCT TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at delete test', error);
            throw error;
        });
    });
});