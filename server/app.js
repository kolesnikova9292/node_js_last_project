var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const User = require('./connectDataBase').User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../build')));

app.use(require('./routes'));
//app.use(require('./connectDataBase'));

server.listen(3000, () => {
    console.log('server listen on port 3000');
});

const users = {};
const rooms = ['general', 'random'];
const messageHistory = [];

io.on('connection', function (socket) {
  let updateUsers = room => {
    // здесь будет список пользователей в комнате room
    let usersRoom = [];
    for (let i in users) {
      // в цикле проходим всех пользователей и если команты совпадают пушим в массив
      if (users[i].activeRoom === room) {
        usersRoom.push(users[i].username);
      }
    }
    return usersRoom;
  };

    // событие наступает когда пользователь впервые заходит в чат
    socket.on('users:connect', function (user) {
      if (Object.values(users).filter(e => e.username === user.username).length <= 0){
              // установим комнату по умолчанию
      let defaultRoom = rooms[0];
      // создадим объект пользователя
      users[socket.id] = {};
      // присвоем ему его имя или по умолчанию Гость
      users[socket.id].username = user.username || 'Guest';
      // запомним его комнату
      users[socket.id].activeRoom = defaultRoom;

      users[socket.id].socketId = socket.id;
      users[socket.id].userId = user.userId;
     // users[socket.id].userId = userId;
      // присоеденим его к команте по умолчанию
      socket.join(defaultRoom);

      //console.log(Object.values(users));
      socket.emit('users:list', Object.values(users))
      //socket.send

      socket.broadcast
        .to(defaultRoom)
        .emit('users:add', users[socket.id]);
      //  console.log(updateUsers(defaultRoom))

      }
    });

    socket.on('message:add', function (data) {
    //  console.log(data);
      messageHistory.push({text: data.text, senderId: data.senderId, recipientId : data.recipientId});

      socket.emit('message:add', { text: data.text,  senderId: data.senderId, recipientId: data.recipientId})

     // messageHistory.push({text: data.text, senderId: data.senderId, recipientId : data.recipientId});

     // socket.send({text: data.text, senderId: data.senderId, recipientId : data.recipientId});
    });

    socket.on('message:history', function (data) {
     //console.log(data)

   //  console.log(messageHistory)

    //var messages = messageHistory.filter(word => word.senderId == data.userId && word.recipientId == data.recipientId);
   // var messages = messageHistory.filter(word => word.recipientId == data.userId && word.senderId == data.recipientId ||
   //   word.senderId == data.userId && word.recipientId == data.recipientId);
   messageHistory.forEach(element => {
    // console.log(element)
     if(element.senderId == data.userId){
     //  console.log(11111)
     }
   });
   var messages = messageHistory.filter(word => word.senderId == data.userId && word.recipientId == data.recipientId || 
                                        word.recipientId == data.userId && word.senderId == data.recipientId);
  //  console.log(messages)

    socket.emit('message:history', messages)
     /* socket.send(messageHistory);
      console.log(messageHistory)*/
    });

    socket.on('disconnect', function (data) {
      let defaultRoom = rooms[0];
      console.log(socket.id);
      console.log(users)

      socket.broadcast
        .to(defaultRoom)
        .emit('users:leave', socket.id);

        delete users[socket.id]



      /*var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
console.log(localStorage)*/
     /* if (typeof window !== "undefined") {
        console.log(11111)
      var myStorage = window.localStorage;
      //let headers = new Headers();
      console.log(data)
      const token = myStorage.getItem('token-data');

      const accessToken = token['accessToken'];

      var user = User.find({ accessToken: accessToken });

        user.exec(function(err, docs) {
            if (err) throw err;

            if (
                docs[0] !== undefined 
            ) {
                //res.json(docs[0]);
                console.log(docs[0])
            }
        });
      }*/



      
     });
  });

module.exports = app;
