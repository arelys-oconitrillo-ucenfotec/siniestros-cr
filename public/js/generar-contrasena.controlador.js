'use strict'

const input_Correo = document.getElementById('txtCorreo');
const input_Identificacion = document.querySelector('#txtIdentificacionContrasena');
const botonGenerar = document.getElementById('btnGenerarClave');
//const botonOlvidoContrasena = document.getElementById('btnOlvidoContrasena');
const botonCancelar = document.getElementById('btnCancelar');

function recolectarDatos() {
    let correo = input_Correo.value;
    let identificacion = input_Identificacion.value;

    let errorBlancos = validarCampos(correo, identificacion);
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

function crearContrasena() {
    let correo = input_Correo.value;
    let identificacion = input_Identificacion.value;

    

    if (errorBlancos) {
        Swal.fire({
            'title': 'Sus datos no se pueden validar',
            'text': 'Revisar los campos resaltados en ROJO',
            'icon': 'warning'
        });
    } else {
        
        usuarioAceptado = respuesta.success;
        if (usuarioAceptado) {
            window.location.href = '';
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
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
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
        input_Correo.classList.add('input-error');
        error = true;
    }

    return error;
      
};


let cancelar = () => {
    window.location.href = 'bienvenido-sesion.html';
};

botonGenerar.addEventListener('click', recolectarDatos);

botonCancelar.addEventListener('click', cancelar);

