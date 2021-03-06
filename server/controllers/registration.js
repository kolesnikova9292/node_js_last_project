const db = require('../db');
var nodemailer = require('nodemailer');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var SHA256 = require('crypto-js/sha256');
var uuid = require('uuid');

function postFunctionRegistration(req, res) {
    var newUser = new User({
        id: uuid(),
        firstName: req.body.firstName,
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

        accessToken: null,
        refreshToken: null,
        accessTokenExpiredAt: null,
        refreshTokenExpiredAt: null,
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

    res.json(newUser);
}

module.exports = {
    postFunctionRegistration: postFunctionRegistration,
};
