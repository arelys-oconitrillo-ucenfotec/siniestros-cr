'use strict';
let listar_usuarios_rutas = async() => {
    let usuarios_rutas;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/usuarios-rutas',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios_rutas = res.data.lista_usuarios_rutas;
    })
    .catch(function(err) {
        console.log(err);
        Swal.fire({
            'title': 'No se listaron los usuarios',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return usuarios_rutas;
};

let registrar_usuario_ruta = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/usuario-ruta',
        headers: {},
        data: {
            tipo_identificacion: sltTipoIdentificacion.value,
            identificacion: txtIdentificacion.value,
            razon_social: txtRazonSocial.value,
            nombre_comercial: txtNombreComercial.value,
            primer_nombre: txtPrimerNombre.value,
            segundo_nombre: txtSegundoNombre.value,
            primer_apellido: txtPrimerApellido.value,
            segundo_apellido: txtSegundoApellido.value,
            genero: document.querySelector('#field-genero input[type=radio]:checked').value,
            correo: txtEmail.value,
            telefono: txtTelefono.value,
            fotografia: txtUrlImg.value,
            rol: 'ruta',
            codigo_activacion: ' ',
            contrasena: ' ',
            estado: 'inactivo'
        }   
    })
    .then(function(res) {
        console.log(res);
        if(res.data.resultado){
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos se enviaron adecuadamente',
                'icon': 'success'
            }).then(() => {
                limpiar();
            });
        } else {
            Swal.fire({
                'title': 'No se registró el usuario',
                'text': 'Ocurrió un error, puede que los datos sean incorrectos o ya existen',
                'icon': 'error'
            });
        }
    })
    .catch(function(err) {
        console.log(err);
        Swal.fire({
            'title': 'No se registró el usuario',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });
};

let obtener_usuario_ruta_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-ruta',
            responseType: 'json'
        });
        return response.data.usuario_ruta;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_usuario_ruta = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/usuario-ruta',
        headers: {},
        data: {
          _id: id,
          tipo_identificacion: sltTipoIdentificacion.value,
          identificacion: txtIdentificacion.value,
          razon_social: txtRazonSocial.value,
          nombre_comercial: txtNombreComercial.value,
          info_aponderado: txtInfoAponderado.value,
          primer_nombre: txtPrimerNombre.value,
          segundo_nombre: txtSegundoNombre.value,
          primer_apellido: txtPrimerApellido.value,
          segundo_apellido: txtSegundoApellido.value,
          genero: document.querySelector('#field-genero input[type=radio]:checked').value,
          correo: txtEmail.value,
          telefono: txtTelefono.value,
          fotografia: txtUrlImg.value
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
                window.location.href = 'admin-listar-usuarios-rutas.html';
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





