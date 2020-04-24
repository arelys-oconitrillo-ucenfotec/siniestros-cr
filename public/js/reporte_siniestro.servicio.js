'use strict';

const identificacion_usuario_logueado = sessionStorage.getItem('identificacion');

let listar_reporte_siniestros = async() => {
    let reporte_siniestros;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/reporte-siniestros',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        reporte_siniestros = res.data.lista_reporte_siniestros;
    })
    .catch(function(err) {
        console.log(err);
    });

    return reporte_siniestros;
};


let registrar_reporte_siniestro = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/reporte-siniestro',
        headers: {},
        data: {
            usuario_identificacion: identificacion_usuario_logueado,
            descripcion: txtDescripcion.value,
            latitud: txtLatitud.value,
            longitud: txtLongitud.value,
            ruta_id: sltRuta.value,
            tipo_siniestro: sltSiniestro.value
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

let obtener_reporte_siniestro_por_id = async(usuario_identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { usuario_identificacion: usuario_identificacion },
            url: 'http://localhost:3000/api/buscar/reporte-siniestro',
            responseType: 'json'
        });
        return response.data.reporte_siniestro;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_reporte_siniestro = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/reporte-siniestro',
        headers: {},
        data: {
            _id: id,
            descripcion: txtDescripcion.value,
            latitud: txtLatitud.value,
            longitud: txtLongitud.value,
            ruta_id: sltRuta.value,
            tipo_siniestro: sltSiniestro.value
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
                window.location.href = 'admin-listar-reporte-siniestro.html';
            });
        } else {
            Swal.fire({
                'title': 'Error al modificar el reporte siniestro',
                'text': 'No fue posible modificar el reporte siniestro',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};