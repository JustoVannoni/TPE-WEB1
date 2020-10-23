function loadPage() {
"use strict";
// boton responsive
document.querySelector(".buton_menu").addEventListener("click", toggleMenu);
function toggleMenu() {
    document.querySelector(".menu").classList.toggle("show");
}
}
document.addEventListener("DOMContentLoaded",loadPage);
