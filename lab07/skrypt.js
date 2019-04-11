/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {
    let newGameRequest, newGameResponse;


    document.getElementById('newGameButton').addEventListener('click', (e) => {
        let size = document.getElementById('size').value.trim();
        let colors = document.getElementById('colors').value.trim();
        let steps = document.getElementById('steps').value.trim();

        let requestData = {
            size: size,
            colors: colors,
            steps: steps
        };

        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            newGameResponse(xhr);
        };
        xhr.open("POST", "http://localhost:3000/game/new", true);
        xhr.send(requestData);

        newGameResponse = (xhr) => {
            if (xhr.status === 200) {
                let jRes = JSON.parse(xhr.responseText),
                    el = document.getElementById('responseOutput');
                el.innerHTML = `Witaj z adresu ${jRes.ip}! Jest godzina ${jRes.tm}`;
            }
        };
    });
});
