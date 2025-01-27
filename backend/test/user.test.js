
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
/*
test('Should testing if "/test" its working', () =>{
    return request.get('/test')
    .then((res) =>{
        expect(res.statusCode).toEqual(200);
    }).catch(error => console.log(error));
})
*/

describe('User tests', () => {
    let datenow = Date.now();
    const userTest = {
        name: '',
        email: `${datenow}@gmail.com`,
        password: `${datenow}`
    };
    test('Should test a Register of user', () =>{
        return request.post('/register').send(userTest)
        .then((res) =>{
            console.log(res._body.errorFields);
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at Register user test', error);
            throw error;
        })
    })
})

