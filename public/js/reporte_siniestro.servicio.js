'use strict';

let conectado = localStorage.getItem('conectado');
let tipo_usuario = localStorage.getItem('tipo_usuario');
let identificacion_usuario_logueado = localStorage.getItem('identificacion');

let listar_reporte_siniestros = async() => {
    let reporte_siniestros;
 
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/reporte-siniestros',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        reporte_siniestros = res.data.lista_reportes_siniestros;
    })
    .catch(function(err) {
        console.log(err);
    });

    return reporte_siniestros;
};

let listar_reporte_siniestros_usuario_logueado = async() => {
    let lista_reporte_siniestros = await obtener_reportes_siniestro_por_id(identificacion_usuario_logueado);

    return lista_reporte_siniestros;
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

let obtener_reportes_siniestro_por_id = async(p_usuario_identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { usuario_identificacion: p_usuario_identificacion },
            url: 'http://localhost:3000/api/buscar/reporte-siniestro/usuario',
            responseType: 'json'
        });
        return response.data.lista_reporte_siniestroDB;
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