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

db.defaults({ history: [], rooms: [], currentId: 1 }).write();

io.sockets.on('connect', (socket) => {
    console.log('Socket.io: połączono.');
    let rooms = db.get('rooms').value();
    io.emit('updateRooms', rooms);

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

    socket.on('connectToRoom', (roomName) => {
        socket.join(roomName);
        let rooms = Array.from(db.get('rooms').value());
        let createdRoom = false;

        rooms.forEach((room) => {
            if (room.room === roomName) {
                createdRoom = true;
            };
        });

        if (!createdRoom) {
            db.get('rooms').push({room: roomName}).write();
        };

        rooms = db.get('rooms').value();

        io.emit('updateRooms', rooms);
    });

    socket.on('restoreHistory', (roomName) => {
        let history = db.get('history').value();
        let currentRoomHistory = [];

        let messagesArray = Array.from(history);
        messagesArray.forEach((element) => {
            if (element.message.roomName === roomName) {
                currentRoomHistory.push(element);
            }
        });

        socket.emit('restoreHistory', currentRoomHistory);
    });

    socket.on('sendMessage', (message, roomName) => {
        let currentId = db.get('currentId').value();

        let archivedMessage = {
            message: message,
            roomName: roomName
        };

        db.get('history').push({id:currentId, message: archivedMessage}).write();
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
