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


let registrar_tipo_incidente = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/tipo-incidente',
        headers: {},
        data: {
            nombre_siniestro: txtNombreSiniestro.value,
            icono: txtUrlImg.value
        }   
    })
    .then(function(response) {
        console.log(response);
        if(response.data.resultado){
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos se enviaron adecuadamente',
                'icon': 'success'
            }).then(() => {
                limpiar();
            });
        } else {
            Swal.fire({
                'title': 'Sus datos no se pudieron enviar',
                'text': 'Ocurrió un error, es posible que sus datos sean incorrectos o ya existen',
                'icon': 'warning'
            });
        }
        
    })
    .catch(function(error) {
        console.log(error);
        Swal.fire({
            'title': 'Sus datos no se pudieron guardar',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });
}
