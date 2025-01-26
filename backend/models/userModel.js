
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({}, {
    strict: false
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;