//to import mongodb
var MongoClient = require('mongodb').MongoClient;
//mydb is the new database we want to create
var url = 'mongodb://localhost:27017/fifthHometask';
//make client connect
MongoClient.connect(url, function(err, client) {
    var db = client.db('fifthHometask');
    if (err) throw err;
    //customers is a collection we  want to create
    db.createCollection('users', function(err, result) {
        if (err) throw err;
        console.log('database and Collection created!');
        client.close();
    });
});
