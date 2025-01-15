
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.listen(2300, () =>{
    console.log('Server at backend side opens');
});