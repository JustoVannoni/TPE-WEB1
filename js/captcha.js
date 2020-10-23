function loadPage() {
"use strict";
//captcha
function Captcha(){   
    let a = Math.floor((Math.random() *8) +1);
    let b = Math.floor((Math.random() *8) +1);
    let c = Math.floor((Math.random() *8) +1);
    let d = Math.floor((Math.random() *8) +1);
    let e = Math.floor((Math.random() *8) +1);
    let code= a +''+ b +''+''+ c +''+ d +''+ e;
    document.getElementById("Captcha").innerHTML = code;
    document.getElementById("Captcha").value = code;
}
Captcha();
//validar captcha
function ValidacionCaptcha() {
    event.preventDefault;    
    let captcha = document.getElementById("Captcha").value;
    let TextoIngresado =document.querySelector("#TextoCaptcha").value;    
        if (captcha===TextoIngresado){
            return alert("El captcha ingresado es correcto");
                                                       
        }
        else{
            return alert("El captcha ingresado es incorrecto");                        
        }    
}
// correcion de la anterior entrega, uso de codigo en el html
let boton_validar =document.getElementById("validar");
boton_validar.addEventListener("click", function (a){
    a.preventDefault();
    ValidacionCaptcha();
});
}
document.addEventListener("DOMContentLoaded",loadPage);