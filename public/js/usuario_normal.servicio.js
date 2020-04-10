'use strict';
let listar_usuarios_normales = async() => {
    let usuarios_normales;

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar/usuarios-normales',
        responseType: 'json'
    }).then(function(res) {
        console.log(res);
        usuarios_normales = res.data.lista_usuarios_normales;
    })
    .catch(function(err) {
        console.log(err);
        Swal.fire({
            'title': 'No se listaron los usuarios',
            'text': 'Ocurrió un error de conexión',
            'icon': 'error'
        });
    });

    return usuarios_normales;
};

let registrar_usuario_normal = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar/usuario-normal',
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
            rol: 'normal',
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


let registrar_especializado = async(id, p_tipo, p_provincia, p_canton, p_distrito, p_senas) => {
    let response;
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/agregar-especializado',
        headers: {},
        data: {
          _id: id,
          usuario_especializado: {
              tipo: p_tipo,
              direccion: {
                  provincia: p_provincia,
                  canton: p_canton,
                  distrito: p_distrito,
                  otras_senas: p_senas
              }
          }
        }   
    })
    .then(function(res) {
        console.log(res);
        response = res;
    })
    .catch(function(err) {
        console.log(err);
    });

    return response;
}

