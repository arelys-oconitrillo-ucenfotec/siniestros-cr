/*TO DO
funcion que devuelva un numero random de 5 digitos
funcion que envie un email para la activacion del usuario*/

'use strict';

const botonIdentificacion = document.querySelector('#sltTipoIdentificacion');
const botonRegistrar = document.querySelector('#btnRegistrar');
const regexSoloNumeros = new RegExp('^[0-9]+$');


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

    if(!error){
        switch(botonIdentificacion.value) {
            case 'física':
                error = validarIdentificacion(error, 9);
                break;
            case 'dimex':
                error = validarDimex(error);
                break;
            case 'nite':
                error = validarIdentificacion(error, 10)
                break;
            case 'jurídica':
                error = validarIdentificacion(error, 10)
                break;
            default:
                break;
        }
    }

    return error;
      
};

let validarEmail = (pError) => {
    let error = pError;
    let label_email = document.querySelector('[for="txtEmail"]');

    if (!error){
        if (txtEmail.value.includes('@')){
            label_email.classList.remove('label-error');
        }else{
            error = true;
            label_email.classList.add('label-error');
        }
        
    }
    
    return error;
};

let validarIdentificacion = (pError, pNumeroDigitos) => {
    let error = pError;
    let label_identificacion = document.querySelector('[for="txtIdentificacion"]');

    if(!error){
        if(regexSoloNumeros.test(txtIdentificacion.value)){
            label_identificacion.classList.remove('label-error');
            if(txtIdentificacion.value.length != pNumeroDigitos){
                label_identificacion.classList.add('label-error');
                error = true;
            }
        } else {
            label_identificacion.classList.add('label-error');
            error = true;
        }
    }

    return error;
};

let validarDimex = (pError) => {
    let error = pError;
    let label_identificacion = document.querySelector('[for="txtIdentificacion"]');
    
    if(regexSoloNumeros.test(txtIdentificacion.value)){
        label_identificacion.classList.remove('label-error');
        if(txtIdentificacion.value.length != 11 || txtIdentificacion.value.length != 12){
            label_identificacion.classList.add('label-error');
            error = true;
        }
    } else {
        label_identificacion.classList.add('label-error');
        error = true;
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
    txtUrlImg.value = "";
    rbtFemenino.checked = false;
    rbtMasculino.checked = false;
    txtRazonSocial.value = "";
    txtNombreComercial.value = "";
    txtInfoAponderado.value = "";
    document.querySelector('#icon-img').src = "../css/imgs/blank-profile-picture-973460_1280.png";
};

let agregar_usuario = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        registrar_usuario_normal();
    }
};

let establecer_identificacion = () => {
    reiniciar_formulario_identificacion();

    if(botonIdentificacion.value == ''){
        document.querySelector('#contenedor-identificacion').classList.add('ocultar');
        document.querySelector('#lblTipoIdentificacion').classList.remove('form__group_field_selected'); 
    } else {
        document.querySelector('#contenedor-identificacion').classList.remove('ocultar');
        document.querySelector('#lblTipoIdentificacion').classList.add('form__group_field_selected'); 
        
        if(botonIdentificacion.value == 'jurídica'){
            let contenedores_juridicos = document.querySelectorAll('.contenedor-juridica');
    
            for(let i = 0; i < contenedores_juridicos.length; i++){
                if(contenedores_juridicos[i].querySelector('input') != null){
                    contenedores_juridicos[i].querySelector('input').setAttribute('required', 'required');
                } else if(contenedores_juridicos[i].querySelector('textarea') != null){
                    contenedores_juridicos[i].querySelector('textarea').setAttribute('required', 'required');
                }
    
                contenedores_juridicos[i].classList.remove('ocultar');
            }
        }
    }
};

let reiniciar_formulario_identificacion = () => {
    document.querySelector('#contenedor-identificacion').classList.add('ocultar');
    let contenedores_juridicos = document.querySelectorAll('.contenedor-juridica');

    for(let i = 0; i < contenedores_juridicos.length; i++){
        if(contenedores_juridicos[i].querySelector('input') != null){
            contenedores_juridicos[i].querySelector('input').removeAttribute('required');
        } else if(contenedores_juridicos[i].querySelector('textarea')){
            contenedores_juridicos[i].querySelector('textarea').removeAttribute('required');
        }

        contenedores_juridicos[i].classList.add('ocultar');
    }
};

botonIdentificacion.addEventListener('input', establecer_identificacion);
botonRegistrar.addEventListener('click', agregar_usuario);

