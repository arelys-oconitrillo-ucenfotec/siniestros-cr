'use strict';

const identificacion_usuario_logueado = sessionStorage.getItem('identificacion');

let listar_reporte_asistencias = async() => {
    let reporte_asistencias;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/reporte-asistencias',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        reporte_asistencias = res.data.lista_reporte_asistencias;
    })
    .catch(function(err) {
        console.log(err);
    });

    return reporte_asistencias;
};


let registrar_reporte_asistencia = async() => {
    console.log(identificacion_usuario_logueado);
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/reporte-asistencia',
        headers: {},
        data: {
            usuario_identificacion: identificacion_usuario_logueado,
            tipo_asistencia: sltTipoAsistencia.value,
            provincia: sltProvincia.value,
            canton: sltCanton.value,
            distrito: sltDistrito.value,
            otras_senas: txtOtrasSenas.value
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

let obtener_reporte_asistencia_por_id = async(usuario_identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { usuario_identificacion: usuario_identificacion },
            url: 'http://localhost:3000/api/buscar/reporte-asistencia',
            responseType: 'json'
        });
        return response.data.reporte_asistencia;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_reporte_asistencia = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/reporte-asistencia',
        headers: {},
        data: {
            _id: id,
            usuario_identificacion: identificacion_usuario_logueado,
            tipo_asistencia: sltUsuariosEsp.value,
            provincia: sltProvincia.value,
            canton: sltCanton.value,
            distrito: sltDistrito.value,
            otras_senas: txtOtrasSenas.value
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
                window.location.href = 'admin-listar-reporte-asistencia.html';
            });
        } else {
            Swal.fire({
                'title': 'Error al modificar el reporte asistencia',
                'text': 'No fue posible modificar el reporte asistencia',
                'icon': 'warning'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};