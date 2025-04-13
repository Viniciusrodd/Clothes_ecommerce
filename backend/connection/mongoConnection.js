const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() =>{
        console.log('Mongo DB connected');
    }).catch(error => console.log('Erro at mongoDB connection', error));

module.exports = mongoose;