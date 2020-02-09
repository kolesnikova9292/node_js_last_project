const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var SHA256 = require('crypto-js/sha256');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
const New = require('../connectDataBase').New;
var formidable = require('formidable');

function getAllNews(req, res) {
    var news = New.find({});

    news.exec(async function(err, news) {
        if (err) throw err;
        res.json(news);
    });
}

function createNewNew(req, res) {
    var user = User.find({ accessToken: req.headers.authorization });

    user.exec(function(err, docs) {
        if (err) throw err;

        if (docs[0] !== undefined) {
            var newNew = new New({
                created_at: Date.now(),
                text: req.body.text,
                title: req.body.title,
                user: {
                    firstName: docs[0].firstName,
                    id: docs[0]._id,
                    image: docs[0].image,
                    middleName: docs[0].middleName,
                    surName: docs[0].surName,
                    username: docs[0].username,
                },
            });

            newNew
                .save()
                .then(function(doc) {
                    var news = New.find({});

                    news.exec(async function(err, news) {
                        if (err) throw err;
                        res.json(news);
                    });
                })
                .catch(function(err) {
                    console.log('Ошибка ' + err);
                });
        }
    });
}

module.exports = {
    getAllNews: getAllNews,
    createNewNew: createNewNew,
};
