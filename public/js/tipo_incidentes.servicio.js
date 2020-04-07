'use strict';

let registrar_usuario = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-incidente',
        headers: {},
        data: {
            tipo_siniestro: txtNombreSiniestro.value,
            icono: txtIcono.value
        }   
    })
    .then(function(res) {
        console.log(res);
        response = res;
    })
    .catch(function(err) {
        console.log(err);
    });

    return response;
}

