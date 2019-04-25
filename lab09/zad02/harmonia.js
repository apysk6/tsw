/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {

    let headers = Array.from(document.querySelectorAll('.hd'));
    
    headers.forEach((header) => {
        header.addEventListener('click', (header) => {

            if (header.nextSibling.nextSibling.style.display === "none") {
                header.nextSibling.nextSibling.style.display = "block";
            }
            else {
                header.nextSibling.nextSibling.style.display = "none";
            };
        });
    });  
});