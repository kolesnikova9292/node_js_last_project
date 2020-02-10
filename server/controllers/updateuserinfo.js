const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');
var SHA256 = require('crypto-js/sha256');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

function updateOurUser(req, res) {
    var warnString = '';

    var form = new formidable.IncomingForm();
    console.log(111);

    form.parse(req, function(err, fields, files) {
        var user = User.find({ accessToken: req.headers.authorization });

        user.exec(function(err, docs) {
            if (err) throw err;

            if (docs[0] !== undefined) {


                var objectForUpdating = new Object();
                objectForUpdating.firstName = fields.firstName;
                objectForUpdating.surName = fields.surName;
                objectForUpdating.middleName = fields.middleName;

                if (
                    fields.oldPassword !== '' &&
                    fields.newPassword !== '' && SHA256(fields.oldPassword).toString() ===
                    docs[0].password
                ) {
                    objectForUpdating.password =  SHA256(
                        fields.newPassword
                    )
                }

                if (files.avatar != null) {
                    console.log(333);
                    var oldpath = files.avatar.path;
                    var newpath =
                        path.join(
                            process.cwd(),
                            './build/assets/img/'
                        ) + files.avatar.name;

                    fs.rename(oldpath, newpath, function(err) {
                        if (err) {
                            // cb(err);
                        } else {
                            warnString = 'Картинка загружена';
                            //cb(warnString);
                        }
                    });

                    console.log(444);

                    objectForUpdating.image = './assets/img/' + files.avatar.name;
                }

                User.updateOne(
                    { accessToken: req.headers.authorization },
                    objectForUpdating,
                    function(err, result) {

                        var user = User.find({
                            accessToken: req.headers.authorization,
                        });
            
                        user.exec(function(err, docs) {
                            if (docs[0] !== undefined) {
                                res.json(docs[0]);
                            }
                        });

                    });





               /* User.updateOne(
                    { accessToken: req.headers.authorization },
                    {
                        firstName: fields.firstName,
                        surName: fields.surName,
                        middleName: fields.middleName,
                    },
                    function(err, result) {
                        if (
                            fields.oldPassword !== '' &&
                            fields.newPassword !== ''
                        ) {
                            var user = User.find({
                                accessToken: req.headers.authorization,
                            });

                            user.exec(function(err, docs) {
                                console.log(req.body.oldPassword);
                                console.log(
                                    SHA256(req.body.oldPassword).toString()
                                );
                                console.log(docs[0].password);

                                console.log(111);

                                if (
                                    docs[0] !== undefined &&
                                    SHA256(fields.oldPassword).toString() ===
                                        docs[0].password
                                ) {
                                    console.log(222);
                                    User.updateOne(
                                        {
                                            accessToken:
                                                req.headers.authorization,
                                        },
                                        {
                                            password: SHA256(
                                                fields.newPassword
                                            ),
                                        }
                                    );
                                }
                            });
                        }

                        console.log(222);
                        console.log(files.avatar);

                        if (files.avatar != null) {
                            console.log(333);
                            var oldpath = files.avatar.path;
                            var newpath =
                                path.join(
                                    process.cwd(),
                                    './public/assets/img/'
                                ) + files.avatar.name;

                            fs.rename(oldpath, newpath, function(err) {
                                if (err) {
                                    // cb(err);
                                } else {
                                    warnString = 'Картинка загружена';
                                    //cb(warnString);
                                }
                            });

                            console.log(444);

                            User.updateOne(
                                {
                                    accessToken: req.headers.authorization,
                                },
                                {
                                    //image: './assets/img/' + files.avatar.name,
                                    image: 'fjdfjdfjh',
                                }
                            );
                            console.log(555);
                        }
                    }
                );
            }*/

            
        }
    });
})
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
