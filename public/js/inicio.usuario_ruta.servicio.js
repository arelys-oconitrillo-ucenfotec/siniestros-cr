'use strict';

let validar_credenciales = async (pcorreo, pcontrasena) => {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/validar_credenciales/ruta',
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
            sessionStorage.setItem('conectado', response.success); 
            sessionStorage.setItem('tipo_usuario', "ruta");
            sessionStorage.setItem('nombre', response.usuario_ruta.primer_nombre);
            sessionStorage.setItem('nombre_comercial', response.usuario_ruta.nombre_comercial);
            sessionStorage.setItem('apellido', response.usuario_ruta.primer_apellido);
            sessionStorage.setItem('correo', response.usuario_ruta.correo);
            sessionStorage.setItem('identificacion', response.usuario_ruta.identificacion);
        }
    });

    peticion.fail(function (response) {
        respuesta = response;
        console.log("Request fail error:" + respuesta);
    });

    return respuesta;
};
