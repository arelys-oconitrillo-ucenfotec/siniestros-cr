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

let obtener_siniestro_por_nombre = async(nombre_siniestro) => {
    try {
        const response = await axios({
            method: 'get',
            params: { nombre_siniestro: nombre_siniestro },
            url: 'http://localhost:3000/api/buscar/tipo-incidente',
            responseType: 'json'
        });
        return response.data.tipo_incidente;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_siniestro = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/tipo-incidente',
        headers: {},
        data: {
          _id: id,
          nombre_siniestro: txtNombreSiniestro.value,
          icono: txtUrlImg.value,
        }   
    })
    .then(function(res) {
        console.log(res);
        if(res.data.resultado){
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos fueron modificados',
                'icon': 'success'
            })
            .then(function() {
                window.location.href = 'admin-listar-tipo-incidente.html';
            });
        } else {
            Swal.fire({
                'title': 'Error al modificar el usuario',
                'text': 'No fue posible modificar el usuario',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};