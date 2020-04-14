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
}




