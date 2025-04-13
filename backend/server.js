
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 2300;

app.listen(PORT, '0.0.0.0', () =>{
    console.log(`Server at backend side opens in ${PORT}`);
});