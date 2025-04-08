
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const jwt = require('jsonwebtoken');
const secretToken = 'hfbdsab3o21h4b321khb';



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
            name: 'teste1'
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

    // verify token
    test('Should test a token verification', () => {
        const testUser = {
            id: 1, userName: 'testUser'
        };
        const validToken = jwt.sign(testUser, secretToken, { expiresIn: '1h' });

        return request.get('/authCheck').set('Cookie', [`token=${ validToken }`])
        .then((res) => {
            console.log('VERIFY TOKEN TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at testing token verification', error);
            throw error;
        })
    })

    // find user by id
    test('Should test the find user by id', () => {
        const userId = '67ed990693dda856d4a2fe36';
        return request.get(`/userData/${userId}`)
        .then((res) =>{
            console.log('FIND USER BY ID TEST SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at find user by id test: ',error);
            throw error;
        });
    });

    // user address update
    test('Should test user address update', () => {
        const userId = '67ed990693dda856d4a2fe36';
        const addressTest = {
            cep: '88819-012',
            city: 'city-teste',
            street: 'street-teste'
        };
        return request.put(`/userAddress/${userId}`).send(addressTest)
        .then((res) => {
            console.log('USER ADDRESS UPDATED SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at user address updated test: ', error);
            throw error;
        });
    });
});

