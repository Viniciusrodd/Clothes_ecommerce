
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
    address: { type: addressSchema, default: {} },
    cellPhone: { type: String, required: true },
    cpf: { type: String, required: true },
    isClient: { type: Boolean, required: false, default: false }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;