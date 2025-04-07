
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);


describe('User tests', () => {

    // user register
    test('Should test a Register of user', () =>{
        let datenow = Date.now();
        const userTest = {
            name: undefined,
            email: `${datenow}@gmail.com`,
            password: `${datenow}`
        };

        return request.post('/register').send(userTest)
        .then((res) =>{
            console.log('USER REGISTER TEST SUCCESS');
            expect(res.status).toEqual(400);
        })
        .catch((error) =>{
            console.log('Error at Register user test', error);
            throw error;
        });
    });

    // user login
    test('Should test a login user', () =>{
        const userObj = {
            email: 'vini@gmail.com',
            password: 'wrongpass'
        }
        return request.post('/login').send(userObj)
        .then((res) =>{
            console.log('USER LOGIN TEST SUCCESS')
            expect(res.status).toEqual(406);
        })
        .catch((error) =>{
            console.log('Error at user login test', error);
            throw error;
        })
    })

    // edit user
    test('Should test a user edit route', () => {
        const id = '67ed990693dda856d4a2fe36';
        const userDatas = {
            name: 'teste2'
        };
        return request.put(`/user/${id}`).send(userDatas)
        .then((res) => {
            console.log('USER UPDATED TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at test user edit route', error);
            throw error;
        });
    });
});

