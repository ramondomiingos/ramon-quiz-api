const express  = require('express');
const { check, validationResult } = require('express-validator');


const routes = express.Router();

const UserController = require('./controllers/UserController');
const QuestionController = require('./controllers/QuestionController');

routes.post('/new-user/',UserController.create,  UserController.auth);
routes.post('/auth/', UserController.auth);
routes.get('/profile/', UserController.verifyJWT, UserController.profile);
//routes.put('/profile/', UserController.verifyJWT, UserController.update);

routes.post('/question/', UserController.verifyJWT, QuestionController.create);
routes.get('/question/:id', QuestionController.find);
//routes.put('/question/:id', UserController.verifyJWT, QuestionController.update);
//routes.delete('/question/:id', UserController.verifyJWT, QuestionController.delete);

//routes.post('/answers/', UserController.verifyJWT, AnswersController.create);
//routes.get('/answers/', UserController.verifyJWT, AnswersController.find);

module.exports = routes