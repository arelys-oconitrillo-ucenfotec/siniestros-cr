'use strict';

let listar_usuarios_normal_tarjeta = async() => {
    let usuarios_normales;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/usuarios-normales',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios_normales = res.data.lista_usuarios_normales;
    })
    .catch(function(err) {
        console.log(err);
        Swal.fire({
            'title': 'No se listaron los usuarios con tarjeta',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return usuarios_normales;
};


let obtener_usuario_normal_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-normal',
            responseType: 'json'
        });
        return response.data.usuario_normal;
    } catch (error) {
        console.log(error);
    }
};


