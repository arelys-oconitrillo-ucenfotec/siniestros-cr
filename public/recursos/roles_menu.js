'use strict';

const navPrincipal = document.querySelector('#nav_principal');

let menuConectado = sessionStorage.getItem('conectado');
let menuTipoUsuario = sessionStorage.getItem('tipo_usuario');
let menuNombre = sessionStorage.getItem('nombre');
let menuNombreComercial = sessionStorage.getItem('nombre_comercial');
let menuApellido = sessionStorage.getItem('apellido');
let menuapellido = sessionStorage.getItem('identificacion');

let obtener_menu = () => {
    if(menuConectado) {
        let menu_seleccionado = '';
        let cerrar_sesion_seleccionado = '';
        
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
    '<div class="dropdown">' +
        '<button class="dropbtn">' + menuNombre + ' ' +menuApellido +'</button>' +
        '<div class="dropdown-content">' +
        obtener_boton_editar_perfil() +
        '<a href="usuario-listar-tarjeta.html">Tarjetas Asociadas</a>' +
        '</div>' +
    '</div>' +
    
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

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
    obtener_boton_editar_perfil() +
    '<button type="button" id="btnCerrarSesion">Cerrar Sesión</button>';

    return opciones_menu;
};

let obtener_boton_editar_perfil = () => {
    let boton_editar_perfil = document.createElement('button');
    boton_editar_perfil.type = 'button';
    boton_editar_perfil.innerText = 'Editar'; 

    boton_editar_perfil.addEventListener('click', ()=> {
        localStorage.setItem('menuIdentificacion_usuario_normal', menuIdentificacion);
        window.location.href = 'editar-usuario-normal.html'; 
    });
    console.log(boton_editar_perfil.innerHTML);
    return boton_editar_perfil.outerHTML;
};