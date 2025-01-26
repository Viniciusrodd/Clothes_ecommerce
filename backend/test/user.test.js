
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


describe('User tests', () => {
    test('Should test a register of user')
})
*/
