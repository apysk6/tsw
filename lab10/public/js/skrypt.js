//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */

'use strict';
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        const loginForm = document.getElementById('loginForm');
        const setUsernameButton = document.getElementById('setUsername');
        const usernameInput = document.getElementById('usernameInput');

        const setUsernameClick = () => {
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
                }
            });
        };

        setUsernameButton.addEventListener('click', setUsernameClick);
    }
};