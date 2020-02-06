const db = require('../db');
var nodemailer = require('nodemailer');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var SHA256 = require('crypto-js/sha256');
var uuid = require('uuid');

function getFunction(req, res, next) {
    const data = {
        msgsemail: req.flash('info')[0],
        products: db.get('products').value(),
        skills: db.get('skills').value(),
    };

    res.render('index', data);
}

function postFunctionRegistration(req, res) {
    //console.log(req.body.password);
    var newUser = new User({
        firstName: req.body.firstName,
        id: 1,
        image: '',
        middleName: req.body.middleName,
        permission: {
            chat: { C: true, R: true, U: true, D: true },
            news: { C: true, R: true, U: true, D: true },
            settings: { C: true, R: true, U: true, D: true },
        },
        surName: req.body.surName,
        username: req.body.username,
        password: SHA256(req.body.password),

        accessToken: uuid(),
        refreshToken: uuid(),
        accessTokenExpiredAt: Date.now(),
        refreshTokenExpiredAt: Date.now() + 1 * 60000 * 300,
    });

    newUser
        .save()
        .then(function(doc) {
            //console.log('Сохранен объект', doc);
            //mongoose.disconnect();
        })
        .catch(function(err) {
            console.log('Ошибка ' + err);
        });
    //db.get('users')
    //   .push(newUser)
    //  .write();
    res.json(newUser);
    //res.redirect('/');
}

module.exports = {
    getFunction: getFunction,
    postFunctionRegistration: postFunctionRegistration,
};
