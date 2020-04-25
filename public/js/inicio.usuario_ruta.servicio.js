'use strict';

let validar_credenciales = async (pcorreo, pcontrasena) => {
    let respuesta;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/validar_credenciales/ruta',
        headers: {},
        data: {
            correo: pcorreo,
            contrasena: pcontrasena
        }
    }).then(function(response) {
        respuesta = response;
        if(response.data.success){
            sessionStorage.setItem('conectado', response.data.success); //resultado viene de users.api
            sessionStorage.setItem('tipo_usuario', "ruta");
            sessionStorage.setItem('nombre', response.data.usuario_ruta.primer_nombre);
            sessionStorage.setItem('nombre_comercial', response.data.usuario_ruta.nombre_comercial);
            sessionStorage.setItem('apellido', response.data.usuario_ruta.primer_apellido);
            sessionStorage.setItem('correo', response.data.usuario_ruta.correo);
            sessionStorage.setItem('identificacion', response.data.usuario_ruta.identificacion);
            sessionStorage.setItem('identificacion_usuario_ruta', respuesta.data.usuario_ruta.identificacion);
        } else {
            console.log("Request fail error:");
            console.log(respuesta);
        }
    }).catch(function(error) {
        console.log(error);
    });

    return respuesta;
};
