var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen('8016', function(){
  console.log('开始web服务: 8016...');
});

