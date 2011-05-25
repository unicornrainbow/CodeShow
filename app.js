var sys = require('sys'),
    path = require('path'),
    http = require('http'),
    io   = require('socket.io'),
    paperboy = require('paperboy'),

    PORT = 8003,
    WEBROOT = path.join(path.dirname(__filename), 'public')

server = http.createServer(function(req, res){
  paperboy.deliver(WEBROOT, req, res)
});
server.listen(PORT, "0.0.0.0");

// socket.io
var socket = io.listen(server);
var connection = 0;
socket.on('connection', function(client){
  client.on('message', function(data){
    socket.broadcast(data);
  });
});


