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

function updateOurUser(req, res) {
    var user = User.find({ firstName: req.body.firstName, surName: req.body.surName });

    user.exec(async function(err, docs) {
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
    });

}

module.exports = {
    updateOurUser: updateOurUser
};
