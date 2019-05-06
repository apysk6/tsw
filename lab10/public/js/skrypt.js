//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

'use strict';
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const loginForm = document.getElementById('loginForm');
        const setUsernameButton = document.getElementById('setUsername');
        const chatForm = document.getElementById('chatForm');
        const sendMessageButton = document.getElementById('sendMessageButton');
        const messageText = document.getElementById('messageText');
        const messagesBox = document.getElementById('messagesBox');
        const menu = document.getElementById('menu');
        const newRoomButton = document.getElementById('newRoomButton');

        let setUsernameClick = () => {
            let username = document.getElementById('usernameInput').value.trim();
            localStorage.setItem('roomName', 'ogolny');

            let socket = io.connect(`http://${location.host}`);

            socket.on('connect', () => {
                socket.emit('setUsername', username);
                connectToRoom('ogolny');
            });

            let connectToRoom = (roomName) => {
                socket.emit('connectToRoom', roomName);
                socket.emit('restoreHistory', roomName);
            };

            socket.on('checkUsername', (isAlreadyConnected) => {
                if (isAlreadyConnected) {
                    alert("Wybrana nazwa użytkownika jest zajęta!");
                    socket.disconnect();
                    document.getElementById('usernameInput').value = '';
                }
                else {
                    loginForm.style.display = "none";
                    chatForm.style.display = "flex";
                    menu.style.display = "flex";
                }
            });

            socket.on('sendMessage', (message) => {
                insertMessage(message);
            });

            socket.on('restoreHistory', (messages) => {
                let messagesArray = Array.from(messages);
                messagesArray.forEach((element) => {
                    insertMessage(element.message);
                });
            });

            socket.on('updateRooms', (rooms) => {
                rooms.forEach((room) => {
                    let roomLabel = document.createElement('p');
                    roomLabel.innerHTML = room;
                    menu.appendChild(roomLabel);
                });
            });

            let insertMessage = (message) => {
                let newMessage = document.createElement('div');
                newMessage.setAttribute('id', 'singleMessage');
                newMessage.innerHTML = message;
    
                messagesBox.appendChild(newMessage);
                messagesBox.scrollTop = messagesBox.scrollHeight;
            };

            let sendMessageButtonClick = () => {
                let message = messageText.value.trim();
                let roomName = localStorage.getItem('roomName');
                message = '<b>' + new Date().toLocaleString() + ' ' + username + '</b> ' + message;
                socket.emit('sendMessage', message, roomName);

                messageText.value = '';
            };

            const newRoomClick = () => {
                let newRoomName = document.getElementById('newRoomName').value.trim();
                let newRoomLabel = document.createElement('p');
                newRoomLabel.innerHTML = newRoomName;
                menu.appendChild(newRoomLabel);

                while (messagesBox.firstChild) {
                    messagesBox.removeChild(messagesBox.firstChild);
                }
    
                connectToRoom(newRoomName);
                localStorage.setItem('roomName', newRoomName);
            }

            sendMessageButton.addEventListener('click', sendMessageButtonClick);
            newRoomButton.addEventListener('click', newRoomClick)
        };

        const buildUI = () => {
            chatForm.style.display = 'none';
            menu.style.display = 'none';

            setUsernameButton.addEventListener('click', setUsernameClick);
        };

        buildUI();
    }
};