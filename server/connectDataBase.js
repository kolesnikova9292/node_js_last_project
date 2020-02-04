const mongoose = require('mongoose');
const Shema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSheme = new Shema({
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

mongoose.connect('mongodb://localhost:27017/fifthHometask');

const User = mongoose.model('users', userSheme);

module.exports = { mongoose: mongoose, User: User };
//module.exports = User;
