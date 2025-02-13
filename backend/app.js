
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');
const connection = require('./connection/mongoConnection');
const cookieParser = require('cookie-parser'); 

/*
app.use(session({
    secret: 'textoqualquerparaaumentarsegurançadesessão',
    resave: false, // Evita gravações desnecessárias quando a sessão não muda
    saveUninitialized: false, // Não cria sessões "vazias" automaticamente
    cookie: {
        maxAge: 3000000, // Tempo de vida do cookie em milissegundos (50 minutos aqui)
        httpOnly: true, // O cookie só pode ser acessado pelo servidor
        secure: false, // true se estiver em produção com HTTPS
        sameSite: 'lax'
    }
}))
*/

app.use(cookieParser()); //Middleware allows to us reading cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use('/', router);


module.exports = app;