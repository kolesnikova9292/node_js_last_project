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
    //console.log(req.body)

    //добавить проверку на "если пароль введен верно"

    var query = { username: req.body.username };
    var user = User.find({ username: req.body.username });

    user.exec(async function(err, docs) {
        if (err) throw err;
        //console.log(docs);
        //const qwe = SHA256(req.body.password);
        //console.log(qwe);
        //console.log(docs[0].password);
        //const rty = qwe.words;
        console.log(SHA256(req.body.password).toString());

        if (SHA256(req.body.password).toString() === docs[0].password) {
            /* var updateUser = {
                firstName: docs.firstName,
                id: docs.id,
                image: docs.image,
                middleName: docs.middleName,
                permission: docs.permission,
                surName: docs.surName,
                username: docs.username,
                password: docs.password,

                accessToken: uuid(),
                refreshToken: uuid(),
                accessTokenExpiredAt: Date.now(),
                refreshTokenExpiredAt: Date.now() + 1 * 60000,
            };*/
            /* docs.accessToken = uuid();
            docs.refreshToken = uuid();
            docs.accessTokenExpiredAt = Date.now();
            docs.refreshTokenExpiredAt = Date.now() + 1 * 60000;
            docs.markModified('accessToken');
            docs.markModified('refreshToken');
            docs.markModified('accessTokenExpiredAt');
            docs.markModified('refreshTokenExpiredAt');
            await docs.save();
            res.json(docs);*/
            User.updateOne(
                { id: docs.id },
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
                    const currentUser = docs;
                    // console.log(User.find({ id: docs.id }));
                    // res.json(User.find({ id: docs.id }));
                    var user = User.find({ username: req.body.username });
                    user.exec(async function(err, docs) {
                        if (err) throw err;
                        console.log(docs[0]);
                        res.json(docs[0]);
                    });
                }
            );
        }
    });
    // console.log(user);

    /*mongoose.db('fifthHometask')
        .collection('users')
        .find(query)
        .toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            mongoose.close();
        });*/

    //тут везде надо доставать данные из БД
    //сделать апдейт этого юзера

    /* var newUser = {
       firstName: req.body.firstName,
       id: 1,
       image: '',
       middleName: req.body.middleName,
       permission: {
         chat: { C: true, R: true, U: true, D: true },
         news: { C: true, R: true, U: true, D: true },
         settings: { C: true, R: true, U: true, D: true }
       },
       surName: req.body.surName,
       username: req.body.username,
       password: req.body.password,

       accessToken: uuid(),
           refreshToken: uuid(),
           accessTokenExpiredAt: Date.now(),
           refreshTokenExpiredAt: Date.now() + 1 * 60000
     };*/

    /* var newUser = {
        firstName: 'req.body.firstName',
        id: 1,
        image: '',
        middleName: 'req.body.middleName',
        permission: {
            chat: { C: true, R: true, U: true, D: true },
            news: { C: true, R: true, U: true, D: true },
            settings: { C: true, R: true, U: true, D: true },
        },
        surName: 'req.body.surName',
        username: 'req.body.username',
        password: 'req.body.password',

        accessToken: uuid(),
        refreshToken: uuid(),
        accessTokenExpiredAt: Date.now(),
        refreshTokenExpiredAt: Date.now() + 1 * 60000,
    };
    res.json(currentUser);*/
}

module.exports = {
    getFunction: getFunction,
    postFunctionLogin: postFunctionLogin,
};
