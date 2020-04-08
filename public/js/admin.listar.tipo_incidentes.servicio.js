'use strict';

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
