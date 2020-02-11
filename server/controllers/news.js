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
                id: uuid(),
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

function updateTheNew(req, res) {
    console.log(req.body)
    console.log(req.params.id)
    const idOdNew = req.params.id;

    var this_new = New.find({ id: idOdNew });

    this_new.exec(function(err, docs) {
        if (err) throw err;

        if (docs[0] !== undefined) {


            var objectForUpdating = new Object();
            objectForUpdating.title = req.body.title;
            objectForUpdating.text = req.body.text;
console.log(111)
console.log(objectForUpdating)

            New.updateOne(
                { id: idOdNew },
                objectForUpdating,
                function(err, result) {
                    var news = New.find({});

                    news.exec(async function(err, news) {
                        if (err) throw err;
                        res.json(news);
                    });
                    

                });
            }
        });
    }

    function deleteTheNew(req, res) {
        const idOfNew = req.params.id;
    
        var newDelete = New.deleteOne({ id: idOfNew })
    
        newDelete.exec(function(err, users) {
            if (err) throw err;
            var news = New.find({});

            news.exec(async function(err, news) {
                if (err) throw err;
                res.json(news);
            });
           // res.json(users);
        });
    
    }



module.exports = {
    getAllNews: getAllNews,
    createNewNew: createNewNew,
    updateTheNew: updateTheNew,
    deleteTheNew: deleteTheNew
};
