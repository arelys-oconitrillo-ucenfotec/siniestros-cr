'use strict';

function validar_credenciales(pcorreo, pcontrasena) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/validar_credenciales',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        //responseType: 'json',
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
            nombre, apellido1, email
        }
    });

    peticion.fail(function (response) {
        respuesta = response;
        console.log("Request fail error:" + respuesta);
    });

    return respuesta;
};
