'use strict'

function guardar_contrasena(pidentificacion, pcorreo, pcontrasena) {
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
    mailerPassword
}; 

let obtener_usuario_normal_id = async(pidentificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: pidentificacion },
            url: 'http://localhost:3000/api/buscar/usuario-normal',
            responseType: 'json'
        });
        return response.data.usuario_normal;
    } catch (error) {
        console.log(error);
    }
};
