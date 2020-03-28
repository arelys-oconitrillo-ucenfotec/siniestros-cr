/*TO DO
hacer las validaciones
hacer el limpiar
funcion para mostrar los campos dependiendo del rol seleccionado
funcion que devuelva un numero random de 5 digitos
funcion que envie un email para la activacion del usuario
campos de ced juridica*/

'use strict';

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == '') {
            campos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('input-error');
        }
    }
    
    error = validarEmail(error);

    return error;
      
};

let validarEmail = (pError) => {
    let error = pError;

    if (!error){
        if (txtEmail.value.includes('@')){
            document.querySelector('#txtEmail').classList.remove('input-error');
        }else{
            error = true;
            document.querySelector('#txtEmail').classList.add('input-error');
        }
        
    }
    
    return error;
};

let limpiar = () => {
    txtPrimerNombre.value = "";
    txtSegundoNombre.value = "";
    txtPrimerApellido.value = "";
    txtSegundoApellido.value = "";
    txtEmail.value = "";
    txtTelefono.value = "";
    sltTipoIdentificacion.value = "";
    txtIdentificacion.value = "";
    txtFotografia.value = "";
    sltGenero.value = "";
    sltRol = "";
};

let obtener_datos = async() => {
    let error_validacion = validar();
    //let error_validacion = false;
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
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
                usuario_especializado: 'especializado',
                codigo_activacion: ' ',
                contrasena: ' ',
                estado: 'inactivo'
            }
               
        })
        .then(function (response) {
            console.log(response);
            if(response.data.resultado){
                Swal.fire({
                    'title': 'Proceso realizado con éxito',
                    'text': 'Sus datos se enviaron adecuadamente',
                    'icon': 'success'
                }).then(() => {
                    limpiar();
                    console.log("limpiar");
                });
            } else {
                Swal.fire({
                    'title': 'No se registró el usuario',
                    'text': 'Ocurrió un error en el servidor',
                    'icon': 'error'
                });
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtener_datos);

