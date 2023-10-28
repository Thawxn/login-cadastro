const express = require('express');
const routes = express.Router();

// Importando controllers
const homeController = require('./controller/homerController');
const loginController = require('./controller/loginController');

// rota home
routes.get('/', homeController.index);

// rota login
routes.post('/register', loginController.create)

module.exports = routes;
