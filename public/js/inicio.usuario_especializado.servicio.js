'use strict';

let validar_credenciales = async (pcorreo, pcontrasena) => {
    let respuesta;

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/validar_credenciales/especializado',
        headers: {},
        data: {
            correo: pcorreo,
            contrasena: pcontrasena
        }
    }).then(function(response) {
        respuesta = response;
        if(response.data.success){
            sessionStorage.setItem('conectado', response.data.success); //resultado viene de users.api
            sessionStorage.setItem('tipo_usuario', "especializado");
            sessionStorage.setItem('nombre', response.data.usuario_especializado.primer_nombre);
            sessionStorage.setItem('nombre_comercial', response.data.usuario_especializado.nombre_comercial);
            sessionStorage.setItem('apellido', response.data.usuario_especializado.primer_apellido);
            sessionStorage.setItem('correo', response.data.usuario_especializado.correo);
            sessionStorage.setItem('identificacion', response.data.usuario_especializado.identificacion);
            sessionStorage.setItem('identificacion_usuario_especializado', respuesta.data.usuario_especializado.identificacion);
        } else {
            console.log("Request fail error:");
            console.log(respuesta);
        }
    }).catch(function(error) {
        console.log(error);
    });

    return respuesta;
};
