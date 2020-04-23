'use strict';

let listar_rutas = async() => {
    let rutas;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/rutas',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        rutas = res.data.lista_rutas;
    })
    .catch(function(err) {
        console.log(err);
    });

    return rutas;
};


let registrar_ruta = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/ruta',
        headers: {},
        data: {
            nombre_ruta: txtNombreRuta.value,
            latitud_inicio: txtLatInicio.value,
            longitud_inicio: txtLongInicio.value,
            latitud_fin: txtLatFin.value,
            longitud_fin: txtLongFin.value
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

let obtener_ruta_por_nombre = async(nombre_ruta) => {
    try {
        const response = await axios({
            method: 'get',
            params: { nombre_ruta: nombre_ruta },
            url: 'http://localhost:3000/api/buscar/ruta',
            responseType: 'json'
        });
        return response.data.ruta;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_ruta = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/ruta',
        headers: {},
        data: {
            _id: id,
            nombre_ruta: txtNombreRuta.value,
            latitud_inicio: txtLatInicio.value,
            longitud_inicio: txtLongInicio.value,
            latitud_fin: txtLatFin.value,
            longitud_fin: txtLongFin.value
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
                window.location.href = 'admin-listar-ruta.html';
            });
        } else {
            Swal.fire({
                'title': 'Error al modificar la ruta',
                'text': 'No fue posible modificar la ruta',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};