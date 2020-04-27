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
            localStorage.setItem('conectado', response.success); //resultado viene de users.api
            localStorage.setItem('tipo_usuario', response.usuario_normal.rol);
            localStorage.setItem('nombre', response.usuario_normal.primer_nombre);
            localStorage.setItem('nombre_comercial', response.usuario_normal.nombre_comercial);
            localStorage.setItem('apellido', response.usuario_normal.primer_apellido);
            localStorage.setItem('correo', response.usuario_normal.correo);
            localStorage.setItem('identificacion', response.usuario_normal.identificacion);
        }
    });

    peticion.fail(function (response) {
        respuesta = response;
        console.log("Request fail error:" + respuesta);
    });

    return respuesta;
};
