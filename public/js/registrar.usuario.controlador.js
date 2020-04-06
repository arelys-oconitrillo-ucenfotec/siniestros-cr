/*TO DO
funcion para mostrar los campos dependiendo del rol seleccionado
funcion para mostrar los campos de ced juridica
funcion que devuelva un numero random de 5 digitos
funcion que envie un email para la activacion del usuario*/

'use strict';

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
    let input_genero = document.querySelector('#field-genero input[type=radio]:checked');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtInfoAponderado'){
                campos_requeridos[i].classList.add('input-error');
            }
            
            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');
            
            if (campos_requeridos[i].id == 'txtInfoAponderado'){
                campos_requeridos[i].classList.remove('input-error');
            }
        }
    }

    if (!input_genero) {
        error = true;
        document.querySelector('#field-genero').classList.add('input-error');
    } else {
        document.querySelector('#field-genero').classList.remove('input-error');
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

    if(sltRol.value == "especializado"){
        sltRol.value = "";
        sltTipo.value = "";
        sltProvincia.value = "";
        sltCanton.value = "";
        sltDistrito.value = "";
        txtSenas.value = "";
    }
    
    if(sltRol.value == "encargadoRuta"){
        sltRol.value = "";
    }
};

let agregar_usuario_especializado = async(p_response) => {
    let response = registrar_especializado(p_response.data.usuarioDB._id, sltTipo.value, sltProvincia.value, sltCanton.value, sltDistrito.value, txtSenas.value)
    .then(function (response) {
        if(response.data.resultado){
            Swal.fire({
                'title': 'Proceso realizado con éxito',
                'text': 'Sus datos se enviaron adecuadamente',
                'icon': 'success'
            }).then(() => {
                limpiar();
            });
        } else {
            console.log(response.data.msj);
        }
    });
}

let agregar_usuario = async() => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        let response = registrar_usuario()
        .then(function (response) {
            if(response.data.resultado){
                if(sltRol.value == "especializado"){
                    agregar_usuario_especializado(response);
                } else {
                    Swal.fire({
                        'title': 'Proceso realizado con éxito',
                        'text': 'Sus datos se enviaron adecuadamente',
                        'icon': 'success'
                    }).then(() => {
                        limpiar();
                    });
                }
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

let mostrar_campos_especializado = () => {

}

let ocultar_opciones_identificacion = () => {
    let opciones_identificacion = document.querySelectorAll('#identificationOptions .label');
    let iconos_identificacion = document.querySelectorAll('#identificationOptions i');

    for (let i = 0; i < opciones_identificacion.length; i++) {
        opciones_identificacion[i].classList.remove('mostrar-block');
        iconos_identificacion[i].classList.remove('mostrar-block');
        opciones_identificacion[i].classList.add('ocultar');
        iconos_identificacion[i].classList.add('ocultar');
    }
}

let mostrar_opciones_identificacion = () => {
    document.querySelector('#option-bg').classList.add('mostrar-block');
    let opciones_identificacion = document.querySelectorAll('#identificationOptions .label');
    let iconos_identificacion = document.querySelectorAll('#identificationOptions i');
    let opciones_val = document.querySelectorAll('#identificationOptions .opt-val');

    for(let i= 0; i < opciones_val.length; i++){
        opciones_val[i].classList.remove('opt-selected-opacity');
    }

    for (let i = 0; i < opciones_identificacion.length; i++) {
        opciones_identificacion[i].classList.remove('ocultar');
        iconos_identificacion[i].classList.remove('ocultar');
        opciones_identificacion[i].classList.add('mostrar-block');
        iconos_identificacion[i].classList.add('mostrar-block');
    }
}

let reiniciar_formulario = () => {
    let contenedores_juridica = document.querySelectorAll('.contenedor-juridica');
    for(let i = 0; i < contenedores_juridica.length; i++){
        contenedores_juridica[i].classList.add('ocultar');
    }
}

let establecer_identificacion_fisica = () => {
    reiniciar_formulario();
    sltTipoIdentificacion.value = document.querySelector('#rbtFisica').value;
    document.querySelector('#optValFisica').classList.add('opt-selected-opacity');
    ocultar_opciones_identificacion();
}

let mostrar_campos_ced_juridica = () => {
    reiniciar_formulario();
    sltTipoIdentificacion.value = document.querySelector('#rbtJuridica').value;
    document.querySelector('#optValJuridica').classList.add('opt-selected-opacity');
    ocultar_opciones_identificacion();

    let contenedores_juridica = document.querySelectorAll('.contenedor-juridica');
    for(let i = 0; i < contenedores_juridica.length; i++){
        contenedores_juridica[i].classList.remove('ocultar');
    }
}

let botonIdentificacion = document.querySelector('#sltTipoIdentificacion');
botonIdentificacion.addEventListener('click', mostrar_opciones_identificacion);

let botonIdentificacionFisica = document.querySelector('#rbtFisica');
botonIdentificacionFisica.addEventListener('click', establecer_identificacion_fisica);

let botonIdentificacionJuridica = document.querySelector('#rbtJuridica');
botonIdentificacionJuridica.addEventListener('click', mostrar_campos_ced_juridica);

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', agregar_usuario);

