'use strict'

function guardar_contrasena(pidentificacion, pcontrasena) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/guardar_contrasena',
        params: {identificacion: pidentificacion},
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            contrasena: pcontrasena
        }
    })
}; 