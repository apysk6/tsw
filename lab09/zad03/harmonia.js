/* jshint esversion: 6, browser: true, devel: true */
document.addEventListener('DOMContentLoaded', () => {

    let headers = Array.from(document.querySelectorAll('.hd'));
    
    headers.forEach((header) => {
        header.addEventListener('mouseover', () => {
            header.nextSibling.nextSibling.style.display = "inline-block";
        });

        header.addEventListener('mouseout', () => {
            header.nextSibling.nextSibling.style.display = "none";
        });
    });  
});