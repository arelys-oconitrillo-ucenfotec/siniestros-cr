'use strict';

const inputCorreo = document.getElementById('txtCorreo');
const inputContrasena = document.getElementById('txtContrasena');
const botonIngresar = document.getElementById('btnIngresar');

function obtenerDatos() {
    let correo = inputCorreo.value;
    let contrasena = inputContrasena.value;

    let errorBlancos = validar(correo, contrasena);
    let usuarioAceptado = false;

    if (!errorBlancos) {
        usuarioAceptado = validar_credenciales(correo, contrasena);
        if (usuarioAceptado) {
            window.location.href = 'bienvenido-sesion.html';
        }
    }

    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
        //}
    }

};

function validar(pcorreo, pcontrasena) {
    let error = false;

    if (pcorreo == '') {
        error = true;
        inputCorreo.classList.add('error_input');
    } else {
        inputCorreo.classList.remove('error_input');
    }

    if (!/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/.test(inputCorreo.value)) {
        inputCorreo.classList.add('error_input');
        error = true;
    }

    if (pcontrasena == '') {
        error = true;
        inputContrasena.classList.add('error_input');
    } else {
        inputContrasena.classList.remove('error_input');
    }

    return error;

};

botonIngresar.addEventListener('click', obtenerDatos);
