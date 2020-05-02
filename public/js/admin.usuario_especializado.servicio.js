'use strict';
let listar_usuarios_especializados = async() => {
    let usuarios_especializados;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/usuarios-especializados',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios_especializados = res.data.lista_usuarios_especializados;
    })
    .catch(function(err) {
        console.log(err);
        Swal.fire({
            'title': 'No se listaron los usuarios',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return usuarios_especializados;
};

let registrar_usuario_especializado = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/usuario-especializado',
        headers: {},
        data: {
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
            fotografia: txtUrlImg.value,
            rol: 'especializado',
            tipo: sltTipoEspecializado.value,
            provincia: sltProvincia.value,
            canton: sltCanton.value,
            distrito: sltDistrito.value,
            otras_senas: txtOtrasSenas.value,
            codigo_activacion: ' ',
            contrasena: '123456',
            estado: 'activo'
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

let obtener_usuario_especializado_id = async(identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: 'http://localhost:3000/api/buscar/usuario-especializado',
            responseType: 'json'
        });
        return response.data.usuario_especializado;
    } catch (error) {
        console.log(error);
    }
};

let actualizar_usuario_especializado = async() => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar/usuario-especializado',
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
          fotografia: txtUrlImg.value,
          tipo: sltTipoEspecializado.value,
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
                if (localStorage.getItem('tipo_usuario') == 'especializado'){
                    window.location.href = 'editar-usuario-especializado.html';
                } else {
                    window.location.href = 'admin-listar-usuarios-especializados.html';
                }
                
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


