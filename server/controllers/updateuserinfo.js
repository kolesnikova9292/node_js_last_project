const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var SHA256 = require('crypto-js/sha256');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var formidable = require('formidable');

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
    /*user.exec(async function(err, docs) {
        if (err) throw err;


            User.updateOne(
                { id: docs.id },
                {
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    surName: req.body.surName,
                    password: SHA256(req.body.newPassword),
                    image: req.body.avatar

                },
                function(err, result) {
                    // mongoose.disconnect();
                    if (err) return console.log(err);
                    //console.log(docs);
                    const currentUser = docs;
                    // console.log(User.find({ id: docs.id }));
                    // res.json(User.find({ id: docs.id }));
                    var user = User.find({ firstName: req.body.firstName, surName: req.body.surName });
                    user.exec(async function(err, docs) {
                        if (err) throw err;
                        console.log(docs[0]);
                        res.json(docs[0]);
                    });
                }
            );
    });*/
}

function deleteUser(req, res) {}

function getAllUsers(req, res) {
    var users = User.find({});

    users.exec(async function(err, users) {
        if (err) throw err;
        res.json(users);
    });
}

module.exports = {
    updateOurUser: updateOurUser,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers,
};
