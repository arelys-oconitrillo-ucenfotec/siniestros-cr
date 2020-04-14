'use strict';

const inputCorreo = document.getElementById('txtCorreo');
const inputContrasena = document.getElementById('txtContrasena');
const botonIngresar = document.getElementById('btnIngresar');

function obtenerDatos() {
    console.log("obtenerDatos");
    let correo = inputCorreo.value;
    let contrasena = inputContrasena.value;

    let errorBlancos = validarUsuario(correo, contrasena);
    let usuarioAceptado = false;

    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
    } else {
        let respuesta = validar_credenciales(correo,contrasena);
        usuarioAceptado = respuesta.success;
        if (usuarioAceptado) {
            window.location.href = 'bienvenido-sesion.html';
        } else {
            Swal.fire({
                'title': 'Sus datos no se pueden validar',
                'text': 'Usuario o contraseña incorrectos',
                'icon': 'warning'
            });
        }
    }

};

let validarUsuario = () => {
    let campos_requeridos = document.querySelectorAll('#frm-inicio-sesion [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == '') {
            campos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('input-error');
        }
    }

    if (!/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/.test(inputCorreo.value)) {
        inputCorreo.classList.add('input-error');
        error = true;
    }

    return error;
      
};


/*function validarUsuario(pcorreo, pcontrasena) {
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

};*/

botonIngresar.addEventListener('click', obtenerDatos);
