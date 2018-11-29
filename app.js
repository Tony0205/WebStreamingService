const express = require("express");
const app = new express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Log = require('log'),
      log = new Log('debug')

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/view/index.html');
});

app.get('/view/pafreecatv', function(req, res) {    
    res.sendFile(__dirname + '/view/pafreecatv.html');
});

app.get('/view/visualize', function(req, res) {
    res.sendFile(__dirname + '/view/visualize.html');
});


io.on('connection', function(socket) {
    console.log('a user connected');

    // stream object 이벤트가 발생했을 때...
    socket.on('stream object', function(streamURL) {
        console.log('stream arrive : ', streamURL);
        socket.broadcast.emit('live start', streamURL);
    });

});

http.listen(port, function(params) {
    log.info("Server start", port);
});