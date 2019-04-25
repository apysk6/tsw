//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);
let users = [];

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

io.sockets.on('connect', (socket) => {
    console.log('Socket.io: połączono.');
    socket.on('message', (data) => {
        socket.emit('echo', `No tak, tak – dostałem: ${data}`);
    });

    socket.on('setUsername', (data) => {
        let isAlreadyConnected = false;

        if (users.indexOf(data) > -1) {
            isAlreadyConnected = true;
            socket.emit('checkUsername', isAlreadyConnected);
        }
        else {
            socket.nickname = data;
            users.push(socket.nickname);
            socket.emit('checkUsername', isAlreadyConnected);
        }
    });

    socket.on('disconnect', () => {
        users.splice(users.indexOf(socket.username), 1);
    });

    socket.on('error', (err) => {
        console.dir(err);
    });
});

httpServer.listen(3000, () => {
    console.log('Serwer HTTP działa na pocie 3000');
});
