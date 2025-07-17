// libs
require('dotenv').config();
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../app');
const request = supertest(app);
const secretToken = process.env.SECRET_TOKEN;


// mongodb connection
beforeAll(async () =>{
    await mongoose.connect('mongodb://localhost:27017/clothesCommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000 // garante que falhe rápido se não conectar
    });
    console.log('MongoDB database connected');
});

// mongoDB Disconnect
afterAll(async () => {
    await mongoose.disconnect();
    console.log('Mongoose disconnected after tests');
});


// tests
let userIdTest;
describe('User tests', () => {
    let datenow = Date.now();
    const userTest = {
        name: 'test',
        email: `${datenow}@gmail.com`,
        password: `test123`
    };

    // user register
    test('Should test a Register of user', () =>{
        return request.post('/register').send(userTest)
        .then((res) =>{
            console.log('USER REGISTER TEST SUCCESS');
            userIdTest = res.body.user._id; // user created id
            expect(res.status).toEqual(200);
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
            password: 'vini123'
        }
        return request.post('/login').send(userObj)
        .then((res) =>{
            console.log('USER LOGIN TEST SUCCESS')
            expect(res.status).toEqual(200);
        })
        .catch((error) =>{
            console.log('Error at user login test', error);
            throw error;
        })
    })

    // edit user
    test('Should test a user edit route', () => {
        const userDatas = {
            name: 'test updated'
        };
        return request.put(`/user/${userIdTest}`).send(userDatas)
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
        return request.get(`/userData/${userIdTest}`)
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
        const addressTest = {
            cep: '88819-012',
            city: 'city-updated',
            street: 'street-updated'
        };
        return request.put(`/userAddress/${userIdTest}`).send(addressTest)
        .then((res) => {
            console.log('USER ADDRESS UPDATED SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at user address updated test: ', error);
            throw error;
        });
    });

    // isClient field add
    test('Should test a add at isClient field of users', () =>{
        return request.post(`/isClientAdd/${userIdTest}`)
        .then((res) => {
            console.log('ADD isClient FIELD OF USERS SUCCESS');
            expect(res.status).toEqual(200);
        })
        .catch((error) => {
            console.log('Error at add isClient field test: ', error);
            throw error;
        })
    })
});