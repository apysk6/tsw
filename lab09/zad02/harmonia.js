/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {

    let headers = Array.from(document.querySelectorAll('.hd'));
    
    headers.forEach((header) => {
        header.addEventListener('click', (header) => {

            if (header.nextSibling.nextSibling.style.display === "none") {
                text.style.display = "block";
            }
            else {
                text.style.display = "none";
            };
        });
    });  
});