const db = require('../db');
var nodemailer = require('nodemailer');
var uuid = require('uuid');

function getFunction(req, res, next) {
  const data = {
    msgsemail: req.flash('info')[0],
    products: db.get('products').value(),
    skills: db.get('skills').value()
  };

  res.render('index', data);
}

function postFunctionLogin(req, res) {
    //console.log(req.body)


    //добавить проверку на "если пароль введен верно"

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

      var newUser = {
        firstName: 'req.body.firstName',
        id: 1,
        image: '',
        middleName: 'req.body.middleName',
        permission: {
          chat: { C: true, R: true, U: true, D: true },
          news: { C: true, R: true, U: true, D: true },
          settings: { C: true, R: true, U: true, D: true }
        },
        surName: 'req.body.surName',
        username: 'req.body.username',
        password: 'req.body.password',

        accessToken: uuid(),
            refreshToken: uuid(),
            accessTokenExpiredAt: Date.now(),
            refreshTokenExpiredAt: Date.now() + 1 * 60000
      };

      res.json(newUser);

}

module.exports = {
  getFunction: getFunction,
  postFunctionLogin: postFunctionLogin
};
