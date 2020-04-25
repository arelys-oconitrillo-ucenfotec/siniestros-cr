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

        switch (menuTipoUsuario) {
            case 'admin':
                navPrincipal.innerHTML = obtener_menu_admin();
                cerrar_sesion_seleccionado = "registrar-usuarios-normales.html";
                establecer_editar_perfil_normal();
                break;
            case 'normal':
                navPrincipal.innerHTML = obtener_menu_usuario();
                cerrar_sesion_seleccionado = "registrar-usuarios-normales.html";
                establecer_editar_perfil_normal();
                break;
            case 'especializado':
                navPrincipal.innerHTML = obtener_menu_especializado();
                cerrar_sesion_seleccionado = "inicio-usuario-especializado.html";
                establecer_editar_perfil_especializado();
                break;
            case 'ruta':
                navPrincipal.innerHTML = obtener_menu_ruta();
                cerrar_sesion_seleccionado = "inicio-usuario-ruta.html";
                break;
            default:
                console.log('no se encontro el tipo de usuario');
                break;
        }

        establecer_cerrar_sesion();

    } else {
        window.location.href = 'registrar-usuarios-normales.html';
    }
};

let obtener_menu_usuario = () => {
    let opciones_menu = 
    '<div class="dropdown">' +
        '<button class="dropbtn">Siniestros</button>' +
        '<div class="dropdown-content">' +
        '<a href="reporte-siniestro.html">Registrar</a>' +
        '<a href="listar-siniestros.html">Listar</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Asistencias</button>' +
        '<div class="dropdown-content">' +
        '<a href="reporte-asistencia.html">Registrar</a>' +
        '<a href="listar-asistencias.html">Listar</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfilNormal">Editar</button>' +
            '<a href="usuario-listar-tarjeta.html">Tarjetas Asociadas</a>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

    return opciones_menu;
};

let obtener_menu_especializado = () => {
    let opciones_menu =
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfilEsp">Editar</button>' +
            '<a href="">Tarjetas Asociadas</a>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

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
        '<button class="dropbtn">Reportes</button>' +
        '<div class="dropdown-content">' +
            '<a href="listar-reporte-asistencia.html">Asistencias</a>' +
            '<a href="listar-reporte-siniestro.html">Siniestros</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfilNormal">Editar</button>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

    return opciones_menu;
};

let establecer_editar_perfil_normal = () => {
    const botonEditarPerfilNormal = document.getElementById('btnEditarPerfilNormal');
    let editar_perfil_normal = () => {
        localStorage.setItem('identificacion_usuario_normal', menuIdentificacion);
        window.location.href = 'editar-usuario-normal.html'; 
    };
    botonEditarPerfilNormal.addEventListener('click', editar_perfil_normal);
};

let establecer_editar_perfil_especializado = () => {
    const botonEditarPerfilEsp = document.getElementById('btnEditarPerfilEsp');
    let editar_perfil_esp = () => {
        localStorage.setItem('identificacion_usuario_especializado', menuIdentificacion);
        window.location.href = 'editar-usuario-especializado.html'; 
    };
    botonEditarPerfilEsp.addEventListener('click', editar_perfil_esp);
};

let establecer_cerrar_sesion = () => {
    const botonCerrarSesion = document.getElementById('btnCerrarSesion');
    let cerrar_sesion = () => {
        sessionStorage.clear();
        window.location.href = cerrar_sesion_seleccionado;
    };
    botonCerrarSesion.addEventListener('click', cerrar_sesion);
};