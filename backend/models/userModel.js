
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    cep: String,
    city: String,
    street: String
})

const userSchema = new mongoose.Schema({}, {
    name: String,
    email: String,
    password: String,
    address: addressSchema
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;