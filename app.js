var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');
var server = http.createServer(app).listen(8080);
console.log("listening in port 8080");

var io = require('socket.io')(server);


app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res) {
    res.writeHead(200);
    res.end(fs.readFileSync('index.html'));
});

io.on('connection', function(socket) {
    console.log("a socket has connected");
    socket.on('message', function(person, message) {
        socket.broadcast.emit('message', person, message);
    });
});
