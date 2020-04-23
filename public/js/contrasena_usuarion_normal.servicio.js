'use strict'

function crear_contrasena(pcorreo, pcontrasena) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/validar_credenciales',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            correo: pcorreo,
            contrasena: pcontrasena
        }
    });

    peticion.done(function (response) {
        respuesta = response;
        if(respuesta.success){
            sessionStorage.setItem('conectado', response.success); //resultado viene de users.api
            sessionStorage.setItem('tipo_usuario', response.usuario_normal.rol);
            sessionStorage.setItem('nombre', response.usuario_normal.primer_nombre);
            sessionStorage.setItem('nombre_comercial', response.usuario_normal.nombre_comercial);
            sessionStorage.setItem('apellido', response.usuario_normal.primer_apellido);
            sessionStorage.setItem('correo', response.usuario_normal.correo);
            sessionStorage.setItem('identificacion', response.usuario_normal.identificacion);
        }
    });

    peticion.fail(function (response) {
        respuesta = response;
        console.log("Request fail error:" + respuesta);
    });

    return respuesta;
};