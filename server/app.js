var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var server = http.createServer(app);
var io = require('socket.io').listen(server);

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

      console.log(Object.values(users));
      socket.emit('users:list', Object.values(users))
      //socket.send

      socket.broadcast
        .to(defaultRoom)
        .emit('users:add', users[socket.id]);
        console.log(updateUsers(defaultRoom))

      /*socket.emit('users:list', updateUsers(defaultRoom))
      socket.broadcast
        .to(defaultRoom)
        .emit('users:add', updateUsers(defaultRoom));
        console.log(updateUsers(defaultRoom))*/




     // socket.emit('users:list', Object.entries(users))
     // socket.emit('users:add', users[socket.id])
      //socket.send(Object.entries(users)).to().emit('users:list');
      //socket.broadcast.to(users[socket.id].activeRoom).emit('users:add', users[socket.id])

     // socket.broadcast.to(users[socket.id].activeRoom).json.emit('users:add', users[socket.id]);

      //socket.emit('users:add', users[socket.id])

      /*  socket.broadcast
        .to(users)
        .emit('users:add', users[socket.id]);*/
    });

    /*socket.on('users:list', (message) => {
      socket.send(message);
    });

    socket.on('users:add', (message) => {
      socket
        .broadcast
        .send(message);
    });*/

   /* socket.on('users:list', function (users) {
      socket.send(users);
    });

    socket.on('users:add', function (users) {
      socket
    .broadcast
    .send(users);
    });*/

    socket.on('message:add', function (data) {

      messageHistory.push({text: data.text, senderId: data.senderId, recipientId : data.recipientId});

      socket.send({text: data.text, senderId: data.senderId, recipientId : data.recipientId});
    });

    socket.on('message:history', function (data) {

      var messages = messageHistory.filter(word => word.recipientId == data.recipientId && word.userId == data.userId);
      socket.send(messageHistory);
      console.log(messageHistory)
    });
  });

module.exports = app;
