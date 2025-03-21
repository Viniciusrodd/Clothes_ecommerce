
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    cep: { type: String, default: '' },
    city: { type: String, default: '' },
    street: { type: String, default: '' }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: addressSchema, default: {} }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;