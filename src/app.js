require('dotenv').config();

// importando fremaworks e bibliotecas
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Connectando ao banco de dados com mongoose
mongoose.connect(process.env.CONNECTIONSTRING, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Conectei com o banco de dados.')
        app.emit('ok')
    })
    .catch(err => {
        console.err('ERRO AO TENTAR SE CONECTAR AO BANCO DE DADOS: ', err)
    });

// importando rotas dentro da aplicação
const routes = require('./routes');

// view engine
app.set('views', (path.resolve(__dirname, 'views')));
app.set('view engine', 'ejs' );

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// permitindo rotas
app.use(routes);

module.exports = app;