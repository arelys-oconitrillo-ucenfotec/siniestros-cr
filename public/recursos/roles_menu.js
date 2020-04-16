'use strict';

const navPrincipal = document.querySelector('#nav_principal');

let conectado = sessionStorage.getItem('conectado');
let tipoUsuario = sessionStorage.getItem('tipo_usuario');
let nombre = sessionStorage.getItem('nombre');
let nombreComercial = sessionStorage.getItem('nombre_comercial');
let apellido = sessionStorage.getItem('apellido');

let obtener_menu = () => {
    if(conectado) {
        let menu_seleccionado = '';
        let cerrar_sesion_seleccionado = '';
        
        switch (tipoUsuario) {
            case 'admin':
                menu_seleccionado = obtener_menu_admin();
                cerrar_sesion_seleccionado = "registrar-usuarios-normales.html";
                break;
            case 'normal':
                menu_seleccionado = obtener_menu_usuario();
                cerrar_sesion_seleccionado = "registrar-usuarios-normales.html";
                break;
            case 'especializado':
                menu_seleccionado = obtener_menu_especializado();
                cerrar_sesion_seleccionado = "inicio-usuario-especializado.html";
                break;
            case 'ruta':
                menu_seleccionado = obtener_menu_ruta();
                cerrar_sesion_seleccionado = "inicio-usuario-ruta.html";
                break;
            default:
                console.log('no se encontro el tipo de usuario');
                break;
        }

        navPrincipal.innerHTML = menu_seleccionado;

        const botonCerrarSesion = document.getElementById('btnCerrarSesion');
        let cerrar_sesion = () => {
            sessionStorage.clear();
            window.location.href = cerrar_sesion_seleccionado;
        };
        
        botonCerrarSesion.addEventListener('click', cerrar_sesion);

    } else {
        window.location.href = 'registrar-usuarios-normales.html';
    }
};

let obtener_menu_usuario = () => {
    let opciones_menu = 
    '<a href="">' + nombre + ' ' + apellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_menu_especializado = () => {
    let opciones_menu =
    '<a href="">' + nombre + ' ' + apellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_menu_ruta = () => {
    let opciones_menu =
    '<a href="">' + nombre + ' ' + apellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_menu_admin = () => {
    let opciones_menu = 
    '<a href="">Usuarios</a>' +
    '<a href="">Incidentes</a>' +
    '<a href="">Vehiculos</a>' +
    '<a href="">' + nombre + ' ' + apellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};