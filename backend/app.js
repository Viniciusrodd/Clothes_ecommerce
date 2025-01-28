
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');
const connection = require('./connection/mongoConnection');
const session = require('express-session');

app.use(session({
    secret: 'textoqualquerparaaumentarsegurançadesessão',
    resave: false, // Evita gravações desnecessárias quando a sessão não muda
    saveUninitialized: false, // Não cria sessões "vazias" automaticamente
    cookie: {
        maxAge: 3000000, // Tempo de vida do cookie em milissegundos (50 minutos aqui)
        httpOnly: true, // O cookie só pode ser acessado pelo servidor
        secure: false // true se estiver em produção com HTTPS
    }
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({credentials: true}));
app.use('/', router);


module.exports = app;