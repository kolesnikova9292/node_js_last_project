const db = require('../db');
var nodemailer = require('nodemailer');

function getFunction(req, res, next) {
  const data = {
    msgsemail: req.flash('info')[0],
    products: db.get('products').value(),
    skills: db.get('skills').value()
  };

  res.render('index', data);
}

function postFunctionRegistration(req, res) {

  var newUser = {
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
    password: req.body.password
  };
  db.get('users')
    .push(newUser)
    .write();
    res.json(newUser);
  //res.redirect('/');
}

module.exports = {
  getFunction: getFunction,
  postFunctionRegistration: postFunctionRegistration
};
