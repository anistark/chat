var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var path = require('path');

// Routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/views/chat/index.html');
});

// Folders Used
app.use('/bower_components', express.static(path.join(process.cwd(), 'bower_components')))
app.use('/public', express.static(path.join(process.cwd(), 'public')))

// Socket io chat message
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
