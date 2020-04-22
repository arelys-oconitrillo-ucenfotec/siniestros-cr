'use strict';

const navPrincipal = document.querySelector('#nav_principal');

let menuConectado = sessionStorage.getItem('conectado');
let menuTipoUsuario = sessionStorage.getItem('tipo_usuario');
let menuNombre = sessionStorage.getItem('nombre');
let menuNombreComercial = sessionStorage.getItem('nombre_comercial');
let menuApellido = sessionStorage.getItem('apellido');
let menuIdentificacion = sessionStorage.getItem('identificacion');
let cerrar_sesion_seleccionado = '';

let obtener_menu = () => {
    if(menuConectado) {
        let menu_seleccionado = '';
        
        switch (menuTipoUsuario) {
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

        establecer_eventos_botones();

    } else {
        window.location.href = 'registrar-usuarios-normales.html';
    }
};

let obtener_menu_usuario = () => {
    let opciones_menu = 
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfil">Editar</button>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

    return opciones_menu;
};

let obtener_menu_especializado = () => {
    let opciones_menu =
    '<a href="">' + menuNombre + ' ' + menuApellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_menu_ruta = () => {
    let opciones_menu =
    '<a href="">' + menuNombre + ' ' + menuApellido + '</a>' +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_menu_admin = () => {
    let opciones_menu = 
    '<div class="dropdown">' +
        '<button class="dropbtn">Usuarios</button>' +
        '<div class="dropdown-content">' +
        '<a href="admin-listar-usuarios-normales.html">Usuarios</a>' +
        '<a href="admin-listar-usuarios-especializados.html">Especializados</a>' +
        '<a href="admin-listar-usuarios-rutas.html">Encargados de Ruta</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Vehículos</button>' +
        '<div class="dropdown-content">' +
            '<a href="admin-listar-vehiculo.html">Vehículos</a>' +
            '<a href="admin-listar-vehiculo-caracteristica.html">Características</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Asistencias</button>' +
        '<div class="dropdown-content">' +
            '<a href="admin-listar-tipo-asistencia.html">Asistencias</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfil">Editar</button>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

    return opciones_menu;
};

let establecer_eventos_botones = () => {
    const botonEditarPerfil = document.getElementById('btnEditarPerfil');
    let editar_perfil = () => {
        localStorage.setItem('identificacion_usuario_normal', menuIdentificacion);
        window.location.href = 'editar-usuario-normal.html'; 
    };
    botonEditarPerfil.addEventListener('click', editar_perfil);

    const botonCerrarSesion = document.getElementById('btnCerrarSesion');
    let cerrar_sesion = () => {
        sessionStorage.clear();
        window.location.href = cerrar_sesion_seleccionado;
    };
    botonCerrarSesion.addEventListener('click', cerrar_sesion);
};