var path = require('path');
var os = require('os');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var robot = require('robotjs');
var qr = require('qr-image');
var port = "8016";

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/server', function(req, res){
  // 获取当前内网IP
  var interfaces = os.networkInterfaces();
  var localIp;
  for(var devName in interfaces){
    var interface = interfaces[devName];
    for(var i = 0; i < interface.length; i++){
      var alias = interface[i];
      if(interface[i].family == 'IPv4' 
         && 
         interface[i].address !== '127.0.0.1' 
         && 
        !interface[i].internal
        &&
        interface[i].address.substr(0, 7) == '192.168'){
        localIp = interface[i].address;
      }
    }
  };
  var url = 'http://' + localIp + ':' + port;
  // 生成二维码
  var qrStream = qr.imageSync(url);
  fs.writeFileSync(path.join(__dirname, 'public/images/local-ip.png'), qrStream);
  res.sendFile(path.join(__dirname, 'views/server.html'));
});

// 启动服务
http.listen(port, function(){
  console.log('已开始web服务, Port: 8016');
});

io.on('connection', function(socket){
  console.log('已初始化 socket 连接');
  socket.emit('ready', {status: 'ready ...'});

  socket.on('setMouse', function(data){
    console.log(data);
    var prevMousePos = robot.getMousePos();
    switch(data.action){
      case "up":
        robot.moveMouse(prevMousePos.x, prevMousePos.y - 10);
        break;
      case "down":
        robot.moveMouse(prevMousePos.x, prevMousePos.y + 10);
        break;
      case "right":
        robot.moveMouse(prevMousePos.x + 10, prevMousePos.y);
        break;
      case "left":
        robot.moveMouse(prevMousePos.x - 10, prevMousePos.y);
        break;
      case "click":
        robot.mouseClick();
        break;
    }
  });

  socket.on('disconnect', function(){
    console.log('已断开 socket 连接');
  });
});
