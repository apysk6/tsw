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

        let setUsernameClick = () => {
            let username = document.getElementById('usernameInput').value.trim();

            let socket = io.connect(`http://${location.host}`);

            socket.on('connect', () => {
                socket.emit('setUsername', username);
            });

            socket.on('checkUsername', (isAlreadyConnected) => {
                console.log(isAlreadyConnected);
                if (isAlreadyConnected) {
                    alert("Wybrana nazwa użytkownika jest zajęta!");
                }
                else {
                    loginForm.style.display = "none";
                    chatForm.style.display = "flex";
                }
            });

            socket.on('sendMessage', (message) => {
                let newMessage = document.createElement('div');
                newMessage.setAttribute('id', 'singleMessage');
                newMessage.innerHTML = message;
    
                messagesBox.appendChild(newMessage);
            });

            let sendMessageButtonClick = () => {
                let message = messageText.value.trim();
                message = '<b>' + new Date().toLocaleString() + ' ' + username + '</b> ' + message;
                socket.emit('sendMessage', message);

                messageText.value = '';
            };

            sendMessageButton.addEventListener('click', sendMessageButtonClick);
        };

        const buildUI = () => {
            chatForm.style.display = 'none';

            setUsernameButton.addEventListener('click', setUsernameClick);
        };

        buildUI();
    }
};