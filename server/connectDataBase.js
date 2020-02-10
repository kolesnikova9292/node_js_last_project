const mongoose = require('mongoose');
const Shema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSheme = new Shema({
    id: String,
    firstName: String,
    image: String,
    middleName: String,
    permission: {
        chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
        settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    },
    surName: String,
    username: String,
    password: String,

    accessToken: String,
    refreshToken: String,
    accessTokenExpiredAt: Date,
    refreshTokenExpiredAt: Date,
});

const newsSheme = new Shema({
    id: String,
    created_at: Date,
    text: String,
    title: String,
    user: {
        firstName: String,
        id: String,
        image: String,
        middleName: String,
        surName: String,
        username: String,
    },
});

mongoose.connect('mongodb://localhost:27017/fifthHometask');

const User = mongoose.model('users', userSheme);
const New = mongoose.model('news', newsSheme);

module.exports = { mongoose: mongoose, User: User, New: New };
//module.exports = User;
