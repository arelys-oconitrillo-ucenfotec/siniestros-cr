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
            localStorage.setItem('conectado', response.data.success); //resultado viene de users.api
            localStorage.setItem('tipo_usuario', "especializado");
            localStorage.setItem('nombre', response.data.usuario_especializado.primer_nombre);
            localStorage.setItem('nombre_comercial', response.data.usuario_especializado.nombre_comercial);
            localStorage.setItem('apellido', response.data.usuario_especializado.primer_apellido);
            localStorage.setItem('correo', response.data.usuario_especializado.correo);
            localStorage.setItem('identificacion', response.data.usuario_especializado.identificacion);
            localStorage.setItem('identificacion_usuario_especializado', respuesta.data.usuario_especializado.identificacion);
        } else {
            console.log("Request fail error:");
            console.log(respuesta);
        }
    }).catch(function(error) {
        console.log(error);
    });

    return respuesta;
};
