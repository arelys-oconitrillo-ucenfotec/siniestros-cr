'use strict';

const enlaces = document.querySelectorAll('#nav_principal a');
const botonCerrarSesion = document.getElementById('btnCerrarSesion');

let conectado = sessionStorage.getItem('conectado');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');

if (conectado) {
    switch (tipoUsuario) {
        case 'administrador':

            break;
        case 'normal':
            enlaces[0].classList.add('ocultar');
            enlaces[1].classList.add('ocultar');
            break;
        case 'especializado':
            enlaces[0].classList.add('ocultar');
            enlaces[1].classList.add('ocultar');
            enlaces[2].classList.add('ocultar');
            break;
        case 'rutas':
            enlaces[0].classList.add('ocultar');
            enlaces[1].classList.add('ocultar');
            enlaces[2].classList.add('ocultar');
            enlaces[3].classList.add('ocultar');
            break;
        default:

            break;
    }
} else {
    window.location.href = 'inicio-sesion.html';
}

function cerrar_sesion() {
    sessionStorage.clear();
    window.location.href = 'inicio-sesion.html';
};

botonCerrarSesion.addEventListener('click', cerrar_sesion);
