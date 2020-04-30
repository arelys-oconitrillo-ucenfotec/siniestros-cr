'use strict';

const navPrincipal = document.querySelector('#nav_principal');

let menuConectado = localStorage.getItem('conectado');
let menuTipoUsuario = localStorage.getItem('tipo_usuario');
let menuNombre = localStorage.getItem('nombre');
let menuNombreComercial = localStorage.getItem('nombre_comercial');
let menuApellido = localStorage.getItem('apellido');
let menuIdentificacion = localStorage.getItem('identificacion');
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
                establecer_editar_perfil_ruta();
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
        '<a href="reporte-siniestro.html">Reportar</a>' +
        '<a href="listar-reporte-siniestro.html">Listar</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Asistencias</button>' +
        '<div class="dropdown-content">' +
        '<a href="admin-listar-tipo-asistencia.html">Listar tipos asistencias</a>' +
        '<a href="reporte-asistencia.html">Reportar</a>' +
        '<a href="listar-reporte-asistencia.html">Listar mis reportes</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Vehículos</button>' +
        '<div class="dropdown-content">' +
            '<a href="admin-registrar-vehiculo.html">Registrar</a>' +
            '<a href="admin-listar-vehiculo.html">Listar</a>' +
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
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

    return opciones_menu;
};

let obtener_menu_ruta = () => {
    let opciones_menu =
    '<div class="dropdown">' +
        '<button class="dropbtn">Rutas</button>' +
        '<div class="dropdown-content">' +
        '<a href="admin-registrar-ruta.html">Registar</a>' +
        '<a href="admin-listar-rutas.html">Listar</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' + menuApellido + '</button>' +
        '<div class="dropdown-content">' +
            '<button id="btnEditarPerfilRuta">Editar</button>' +
            '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>' +
        '</div>' +
    '</div>';

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
            '<a href="admin-listar-vehiculo.html">Listar Vehículos</a>' +
            '<a href="admin-registrar-vehiculo-caracteristica.html">Registrar Característica</a>' +
            '<a href="admin-listar-vehiculo-caracteristica.html">Listar Características</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Tipos Incidentes</button>' +
        '<div class="dropdown-content">' +
            '<a href="admin-registrar-tipo-incidente.html">Registrar Incidente</a>' +
            '<a href="admin-listar-tipo-incidente.html">Listar Incidentes</a>' +
        '</div>' +
    '</div>' +
    '<div class="dropdown">' +
        '<button class="dropbtn">Asistencias</button>' +
        '<div class="dropdown-content">' +
            '<a href="admin-registrar-tipo-asistencia.html">Registrar</a>' +
            '<a href="admin-listar-tipo-asistencia.html">Listar</a>' +
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

let establecer_editar_perfil_ruta = () => {
    const botonEditarPerfilRuta = document.getElementById('btnEditarPerfilRuta');
    let editar_perfil_ruta = () => {
        localStorage.setItem('identificacion_usuario_ruta', menuIdentificacion);
        window.location.href = 'editar-usuario-ruta.html'; 
    };
    botonEditarPerfilRuta.addEventListener('click', editar_perfil_ruta);
};

let establecer_cerrar_sesion = () => {
    const botonCerrarSesion = document.getElementById('btnCerrarSesion');
    let cerrar_sesion = () => {
        localStorage.clear();
        localStorage.clear();
        window.location.href = cerrar_sesion_seleccionado;
    };
    botonCerrarSesion.addEventListener('click', cerrar_sesion);
};