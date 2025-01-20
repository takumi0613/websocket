let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http,{
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.join('all');
    io.sockets.emit('count', socket.client.conn.server.clientsCount);
    socket.on('message', (data) => {
        console.log('message', data);
        socket.broadcast.emit('message', data);
    });
});

io.on('disconnect', () => {
    console.log('user disconnected');
});

http.listen(5000, () => {
    console.log('listening on *:5000');
});