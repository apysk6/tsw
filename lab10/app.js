//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);
let users = [];

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

db.defaults({ messages: [], currentId: 1 }).write();

io.sockets.on('connect', (socket) => {
    console.log('Socket.io: połączono.');
    
    socket.on('setUsername', (data) => {
        let isAlreadyConnected = false;

        if (users.includes(data)) {
            isAlreadyConnected = true;
            socket.emit('checkUsername', isAlreadyConnected);
        }
        else {
            socket.nickname = data;
            users.push(socket.nickname);
            socket.emit('checkUsername', isAlreadyConnected);
        }
    });

    socket.on('sendMessage', (message) => {
        let currentId = db.get('currentId').value();
        db.get('messages').push({id:currentId, message: message}).write();
        db.update('currentId', n => n + 1).write()

        io.emit('sendMessage', message);
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
