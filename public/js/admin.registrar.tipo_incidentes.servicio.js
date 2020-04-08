'use strict';


let registrar_tipo_incidente = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/tipo-incidente',
        headers: {},
        data: {
            nombre_siniestro: txtNombreSiniestro.value,
            icono: txtUrlImg.value
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
