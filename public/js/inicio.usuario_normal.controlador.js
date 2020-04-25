'use strict';

const inputCorreo = document.getElementById('txtCorreo');
const inputContrasena = document.getElementById('txtContrasena');
const botonIngresar = document.getElementById('btnIngresar');
const botonOlvidoContrasena = document.getElementById('btnOlvidoContrasena');

function obtenerDatos() {
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
            if(respuesta.usuario_normal.rol == "admin"){
                window.location.href = 'admin-listar-usuarios-normales.html';
            } else {
                window.location.href = 'editar-usuario-normal.html';
            }
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

let generarClave = () => {
    window.location.href = 'generar-contrasena.html';
};

botonIngresar.addEventListener('click', obtenerDatos);
botonOlvidoContrasena.addEventListener('click', generarClave);

