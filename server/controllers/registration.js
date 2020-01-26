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
  db.get('users')
    //.push({ id: 1, title: 'lowdb is awesome' })
    .push({ id: 1, title: 'lowdb is awesome' })
    .write();
  res.redirect('/');
  /*if (
        !req.body &&
        !req.body.concerts &&
        !req.body.cities &&
        !req.body.years
      ) {
        req.flash('info', 'Заполните нужные поля');
        res.redirect('/admin#status');
      } else {
        Object.keys(req.body).forEach((item, i) => {
          if (req.body[item]) {
            db.get(`skills[${i}]`)
              .set('number', req.body[item])
              .write();
          }
        });
    
        req.flash('info', 'Данные обновлены');
    
        res.redirect('/admin#status');
      }*/
}

module.exports = {
  getFunction: getFunction,
  postFunctionRegistration: postFunctionRegistration
};
