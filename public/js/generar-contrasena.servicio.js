'use strict'

function guardar_contrasena(p_id, pidentificacion, pcorreo, pcontrasena) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:3000/api/guardar_contrasena',
        params: {_id: p_id, identificacion: pidentificacion},
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            contrasena: pcontrasena,
        }
    })   
}; 

let obtener_usuario_normal_identificacion = async(pidentificacion) => {
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
