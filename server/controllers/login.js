const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var SHA256 = require('crypto-js/sha256');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;

function postFunctionLogin(req, res) {
    var user = User.find({ username: req.body.username });

    user.exec(function(err, docs) {
        if (err) throw err;
        if (
            docs[0] !== undefined &&
            SHA256(req.body.password).toString() === docs[0].password
        ) {
            User.updateOne(
                { username: docs[0].username },
                {
                    accessToken: uuid(),
                    refreshToken: uuid(),
                    accessTokenExpiredAt: Date.now(),
                    refreshTokenExpiredAt: Date.now() + 1 * 60000 * 300,
                },
                function(err, result) {
                    if (err) return console.log(err);
                    var user = User.find({ username: req.body.username });
                    user.exec(async function(err, docs) {
                        if (err) throw err;

                        res.json(docs[0]);
                    });
                }
            );
        }
    });
}

module.exports = {
    postFunctionLogin: postFunctionLogin,
};
