const db = require('../db');
var nodemailer = require('nodemailer');
const mongoose = require('../connectDataBase').mongoose;
const User = require('../connectDataBase').User;
var SHA256 = require('crypto-js/sha256');
var uuid = require('uuid');

function getFunction(req, res, next) {
    const data = {
        msgsemail: req.flash('info')[0],
        products: db.get('products').value(),
        skills: db.get('skills').value(),
    };

    res.render('index', data);
}

function postFunctionAutharisation(req, res) {

    //res.json(newUser);
}

function authIfTokenExists(req, res) {

    //res.json(newUser);
}

module.exports = {
    getFunction: getFunction,
    postFunctionAutharisation: postFunctionAutharisation,
    authIfTokenExists: authIfTokenExists
};
