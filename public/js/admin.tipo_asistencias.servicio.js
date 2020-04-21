'use strict';

let listar_tipo_asistencias = async() => {
    let tipo_asistencias;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/tipo-asistencias',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        tipo_asistencias = res.data.lista_asistencias;
    })
    .catch(function(err) {
        console.log(err);
    });

    return tipo_asistencias;
};


let registrar_tipo_asistencia = async() => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/tipo-asistencia',
        headers: {},
        data: {
            nombre_asistencia: txtNombreAsistencia.value
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

let obtener_asistencia_por_nombre = async(nombre_asistencia) => {
    try {
        const response = await axios({
            method: 'get',
            params: { nombre_asistencia: nombre_asistencia },
            url: 'http://localhost:3000/api/buscar/tipo-asistencia',
            responseType: 'json'
        });
        return response.data.tipo_asistencia;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_asistencia = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/tipo-asistencia',
        headers: {},
        data: {
          _id: id,
          nombre_asistencia: txtNombreAsistencia.value
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
                window.location.href = 'admin-listar-tipo-asistencia.html';
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