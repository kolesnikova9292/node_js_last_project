const db = require('../db');
var nodemailer = require('nodemailer');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var SHA256 = require('crypto-js/sha256');
var uuid = require('uuid');

function postFunctionAutharisation(req, res) {
    //console.log(4444444);
    //console.log(req.body);
    let headers = new Headers();

    const token = localStorage.getItem('token-data');

    headers.append('authorization', 'Bearer ' + token['refreshToken']);

    res.json(token);
}

function authIfTokenExists(req, res) {
    console.log(4444444);
    console.log(req.headers.authorization);
    if (req.headers.authorization) {
        var user = User.find({ accessToken: req.headers.authorization });

        user.exec(function(err, docs) {
            if (err) throw err;
            console.log(222);
            console.log(docs[0]);
            console.log(docs[0].refreshTokenExpiredAt);
            //let ms = Date.parse('2019-05-15 07:11:10.673Z');
            console.log(Date.parse(docs[0].refreshTokenExpiredAt));
            console.log(Date.now());
            console.log(docs[0].refreshTokenExpiredAt < Date.now());
            if (
                docs[0] !== undefined &&
                Date.parse(docs[0].refreshTokenExpiredAt) > Date.now()
            ) {
                console.log(333);
                res.json(docs[0]);
            }
        });
    }
    // if(headers)
    //res.json(newUser);
}

module.exports = {
    postFunctionAutharisation: postFunctionAutharisation,
    authIfTokenExists: authIfTokenExists,
};
