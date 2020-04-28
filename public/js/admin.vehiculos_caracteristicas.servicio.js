'use strict';

let listar_vehiculo_caracteristicas = async() => {
    let vehiculo_caracteristicas;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/vehiculo-caracteristicas',
        responseType: 'json'
    }).then(function(res) {
        vehiculo_caracteristicas = res.data.lista_caracteristicas;
    })
    .catch(function(error) {
        console.log(error);
        Swal.fire({
            'title': 'Sus datos no se pudieron listar',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return vehiculo_caracteristicas;
};

let obtener_vehiculo_caracteristica_por_id = async(pId) => {
    let vehiculo_caracteristica;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/obtener/vehiculo-caracteristica',
        responseType: 'json',
        params: {
            id: pId
        }   
    }).then(function(res) {
        vehiculo_caracteristica = res.data.vehiculo_caracteristica;
    })
    .catch(function(error) {
        console.log(error);
        Swal.fire({
            'title': 'No se encontro la caracteristica',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return vehiculo_caracteristica;
};


let registrar_vehiculo_caracteristica = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/vehiculo-caracteristica',
        headers: {},
        data: {
            caracteristica: txtCaracteristica.value
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
};

let modificar_vehiculo_caracteristica = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/vehiculo-caracteristica',
        headers: {},
        data: {
            _id: id,
            caracteristica: txtCaracteristica.value
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
                window.location.href = 'admin-listar-vehiculo-caracteristica.html';
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
};