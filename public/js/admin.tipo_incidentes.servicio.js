'use strict';

let registrar_tipo_incidente = async() => {
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

let listar_tipo_incidentes = async() => {
    let tipo_incidentes;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/tipo-incidentes',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        tipo_incidentes = res.data.lista_incidentes;
    })
    .catch(function(err) {
        console.log(err);
    });

    return tipo_incidentes;
};
