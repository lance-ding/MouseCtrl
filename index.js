var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen('8016', function(){
  console.log('已开始web服务, Port: 8016');
});

io.on('connection', function(socket){
  console.log('已初始化 socket 连接');

  socket.emit('ready', {some: 'data'});
  socket.on('toServer', function(data){
    console.log(data.some);
  });

  socket.on('disconnect', function(){
    console.log('已断开 socket 连接');
  });
});
