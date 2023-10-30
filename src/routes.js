const express = require('express');
const routes = express.Router();

// Importando controllers
const homeController = require('./controller/homerController');
const registerController = require('./controller/registerController');
const loginController = require('./controller/loginController');

// middleware
const middleware = require('./middleware/middleware');

// rota home
routes.get('/', middleware.admAuth ,homeController.index);                      // rota GET home
routes.get('/logout', loginController.logout);                                  // rota GET de sair da sessão

// rota de cadastro
routes.get('/register', registerController.index);                              // rota GET de registro
routes.post('/register', registerController.create);                            // rota POST de cadastro

// rota de autenticação
routes.get('/login', loginController.index);                                    // rota GET de login
routes.post('/login', loginController.authenticate);                            // rota POST de login

module.exports = routes;
