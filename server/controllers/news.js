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
    console.log(111);
    console.log(req.headers.authorization);
    var user = User.find({ accessToken: req.headers.authorization });

    user.exec(function(err, docs) {
        if (err) throw err;
        console.log(222);
        // console.log(docs[0]);
        console.log(req.body);
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

            console.log(newNew);

            newNew
                .save()
                .then(function(doc) {
                    //console.log('Сохранен объект', doc);
                    //mongoose.disconnect();
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

function updateOurUser(req, res) {
    var warnString = '';

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        /*if (fields.name && fields.price && files.photo.size > 0) {
      var oldpath = files.photo.path;
      var newpath =
        path.join(process.cwd(), './server/public/assets/uploads/') +
        files.photo.name;

      fs.rename(oldpath, newpath, function(err) {
        if (err) {
          cb(err);
        } else {
          warnString = 'Картинка загружена';
          cb(warnString);
        }
      });
      db.get('products')
        .push({
          src: './assets/uploads/' + files.photo.name,
          name: fields.name,
          price: fields.price
        })
        .write();
    } else {
      warnString = 'Заполните все поля и загрузите картинку';
      cb(warnString);
    }*/
    });

    var user = User.find({
        firstName: req.body.firstName,
        surName: req.body.surName,
    });

    console.log(88888888888888);
    console.log(req.body);
}

module.exports = {
    getAllNews: getAllNews,
    createNewNew: createNewNew,
};
