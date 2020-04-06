'use strict';

let registrar_usuario = async() => {
    let response;
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-usuario',
        headers: {},
        data: {
            tipo_identificacion: sltTipoIdentificacion.value,
            identificacion: txtIdentificacion.value,
            primer_nombre: txtPrimerNombre.value,
            segundo_nombre: txtSegundoNombre.value,
            primer_apellido: txtPrimerApellido.value,
            segundo_apellido: txtSegundoApellido.value,
            genero: sltGenero.value,
            correo: txtEmail.value,
            telefono: txtTelefono.value,
            fotografia: txtFotografia.value,
            rol: sltRol.value,
            codigo_activacion: ' ',
            contrasena: ' ',
            estado: 'inactivo'
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

