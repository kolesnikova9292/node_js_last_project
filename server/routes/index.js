var express = require('express');
var router = express.Router();

var postRegistrationRouter = require('../controllers/registration');
var postLoginRouter = require('../controllers/login');
var autharisationRouter = require('../controllers/autharisation');
var updateUserInfoRouter = require('../controllers/updateuserinfo');
var newsRouter = require('../controllers/news');

router.post(
    '/api/registration',
    postRegistrationRouter.postFunctionRegistration
);

router.post('/api/login', postLoginRouter.postFunctionLogin);

//сделать позже
router.post(
    '/api/refresh-token',
    autharisationRouter.postFunctionAutharisation
);

router.get('/api/profile', autharisationRouter.authIfTokenExists);

router.patch('/api/profile', updateUserInfoRouter.updateOurUser);

router.get('/api/news', newsRouter.getAllNews);

router.post('/api/news', newsRouter.createNewNew);

router.delete('/api/users/:id', updateUserInfoRouter.deleteUser);

router.delete('/api/users/:id', updateUserInfoRouter.deleteUser);

router.get('/api/users', updateUserInfoRouter.getAllUsers);

module.exports = router;
