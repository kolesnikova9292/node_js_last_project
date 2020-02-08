const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var SHA256 = require('crypto-js/sha256');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;

function getFunction(req, res, next) {
    const data = {
        msgsemail: req.flash('info')[0],
        products: db.get('products').value(),
        skills: db.get('skills').value(),
    };

    res.render('index', data);
}

function postFunctionLogin(req, res) {
    console.log(111);
    //console.log(req.body)

    //добавить проверку на "если пароль введен верно"

    var query = { username: req.body.username };
    var user = User.find({ username: req.body.username });

    user.exec(function(err, docs) {
        if (err) throw err;
        console.log(222);
        if (
            docs[0] !== undefined &&
            SHA256(req.body.password).toString() === docs[0].password
        ) {
            console.log(333);
            console.log(docs);
            User.updateOne(
                { username: docs[0].username },
                {
                    accessToken: uuid(),
                    refreshToken: uuid(),
                    accessTokenExpiredAt: Date.now(),
                    refreshTokenExpiredAt: Date.now() + 1 * 60000 * 300,
                },
                function(err, result) {
                    // mongoose.disconnect();
                    if (err) return console.log(err);
                    //console.log(docs);
                    //const currentUser = docs;
                    // console.log(User.find({ id: docs.id }));
                    // res.json(User.find({ id: docs.id }));
                    var user = User.find({ username: req.body.username });
                    user.exec(async function(err, docs) {
                        if (err) throw err;
                        //console.log(docs[0]);
                        res.json(docs[0]);
                    });
                }
            );
        } //else res.json(null);
    });
}

module.exports = {
    getFunction: getFunction,
    postFunctionLogin: postFunctionLogin,
};
