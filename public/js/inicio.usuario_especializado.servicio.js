'use strict';

function validar_credenciales(pcorreo, pcontrasena) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/validar_credenciales/especializado',
        type: 'post',
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
            sessionStorage.setItem('tipo_usuario', "especializado");
            sessionStorage.setItem('nombre', response.usuario_especializado.primer_nombre);
            sessionStorage.setItem('nombre_comercial', response.usuario_especializado.nombre_comercial);
            sessionStorage.setItem('apellido', response.usuario_especializado.primer_apellido);
            sessionStorage.setItem('correo', response.usuario_especializado.correo);
            sessionStorage.setItem('identificacion', response.usuario_especializado.identificacion);
        }
    });

    peticion.fail(function (response) {
        respuesta = response;
        console.log("Request fail error:" + respuesta);
    });

    return respuesta;
};
