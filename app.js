const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res, next) => {
    res.render('index.ejs');
});

io.sockets.on('connection', (socket) => {
    socket.on('username', (username) => {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('chat_message', (message) => {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

    socket.on('disconnect', (username) => {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>')
    });

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping', { pesan: "stop" });
    });
});

const server = http.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log('connected');
})