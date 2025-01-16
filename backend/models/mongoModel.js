
const mongoose = require('mongoose');

//schema
const clothesSchema = new mongoose.Schema({}, {
    strict: false //'strict: false' allows you add properties not defined yet.
})

//model
const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;