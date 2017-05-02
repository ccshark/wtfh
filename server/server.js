var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var socket = require('socket.io');
var http = require('http');

var  server = http.createServer(app);
io = socket.listen(server);

var databaseConfig = require('./config/database');
var router = require('./app/routes');

mongoose.connect(databaseConfig.url);
//mongoose.connection.on('open', function () {

/*socket.on('connection', function(connection) {
    console.log('User Connected');
    connection.on('message', function(msg){
        socket.emit('message', msg);
    });
}); */

io.sockets.on('connection', function(connection) {
    console.log("connected to the socket");
    connection.on('join', function(room) {
        console.log("someone joined the room: " + room);
        connection.join(room);
        io.sockets.in(room).emit('new-user', { message: 'new user joined the room' });
    });
});

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

server.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

router(app);
//});
