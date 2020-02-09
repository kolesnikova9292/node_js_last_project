const db = require('../db');
var nodemailer = require('nodemailer');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var SHA256 = require('crypto-js/sha256');
var uuid = require('uuid');

function postFunctionAutharisation(req, res) {
    let headers = new Headers();

    const token = localStorage.getItem('token-data');

    headers.append('authorization', 'Bearer ' + token['refreshToken']);

    res.json(token);
}

function authIfTokenExists(req, res) {
    if (req.headers.authorization) {
        var user = User.find({ accessToken: req.headers.authorization });

        user.exec(function(err, docs) {
            if (err) throw err;

            if (
                docs[0] !== undefined &&
                Date.parse(docs[0].refreshTokenExpiredAt) > Date.now()
            ) {
                res.json(docs[0]);
            }
        });
    }
}

module.exports = {
    postFunctionAutharisation: postFunctionAutharisation,
    authIfTokenExists: authIfTokenExists,
};
