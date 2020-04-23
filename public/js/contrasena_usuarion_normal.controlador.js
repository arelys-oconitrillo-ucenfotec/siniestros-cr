'use strict'

const inputCorreo = document.getElementById('txtCorreo');
const inputContrasena = document.getElementById('txtContrasena');
const botonGenerar = document.getElementById('btnGenerar');

function crearContrasena() {
    let correo = inputCorreo.value;
    let contrasena = inputContrasena.value;

    let errorBlancos = validarCampos(correo, contrasena);
    let usuarioAceptado = false;

    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
    } else {
        let respuesta = crear_contrasena(correo,contrasena);
        usuarioAceptado = respuesta.success;
        if (usuarioAceptado) {
            window.location.href = 'admin-listar-tipo-incidente.html';
        } else {
            Swal.fire({
                'title': 'Sus datos no se pueden validar',
                'text': 'Usuario o contraseña incorrectos',
                'icon': 'warning'
            });
        }
    }

};

let validarCampos = () => {
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

botonIngresar.addEventListener('click', obtenerDatos);