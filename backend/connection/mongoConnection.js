const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/clothesCommerce')
    .then(() =>{
        console.log('Mongo DB connected');
    }).catch(error => console.log('Erro at mongoDB connection', error));

module.exports = mongoose;