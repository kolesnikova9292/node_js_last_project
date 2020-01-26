var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../build')));

app.use(require('./routes'));

app.listen(3000, () => {
  console.log('server listen on port 3000');
});

module.exports = app;
