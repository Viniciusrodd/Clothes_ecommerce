
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
    test('Should test a Register of user', () =>{
        let datenow = Date.now();
        const userTest = {
            name: '',
            email: `${datenow}@gmail.com`,
            password: `${datenow}`
        };

        return request.post('/register').send(userTest)
        .then((res) =>{
            console.log(res._body.errorFields);
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at Register user test', error);
            throw error;
        });
    });

    test('Should test a login user', () =>{
        const userObj = {
            email: 'vini@gmail.com',
            password: 'wrongpass'
        }
        return request.post('/login').send(userObj)
        .then((res) =>{
            //console.log(res._body.fieldsExist)
            expect(res.status).toEqual(406);
        })
        .catch((error) =>{
            console.log('Error at user login test', error);
            throw error;
        })
    })
});

