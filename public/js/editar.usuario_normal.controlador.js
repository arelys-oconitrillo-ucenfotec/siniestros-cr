'use strict';

let identificacion = localStorage.getItem('identificacion_usuario_normal');
const botonIdentificacion = document.querySelector('#sltTipoIdentificacion');
let id;
const input_primer_nombre = document.querySelector('#txtPrimerNombre');
const input_segundo_nombre = document.querySelector('#txtSegundoNombre');
const input_primer_apellido = document.querySelector('#txtPrimerApellido');
const input_segundo_apellido = document.querySelector('#txtSegundoApellido');
const input_tipo_identificacion = document.querySelector('#sltTipoIdentificacion');
const input_identificacion = document.querySelector('#txtIdentificacion');
const input_correo = document.querySelector('#txtEmail');
const input_telefono = document.querySelector('#txtTelefono');
const input_img = document.querySelector('#icon-img');
const input_fotografia = document.querySelector('#txtUrlImg');
const botonRegistrar = document.querySelector('#btnRegistrar');

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

let modificar_usuario = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_usuario();
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

let llenar_campos = async() => {
    let usuario_normal = await obtener_usuario_normal_id(identificacion);

    id = usuario_normal._id;
    input_primer_nombre.value = usuario_normal.primer_nombre;
    input_segundo_nombre.value = usuario_normal.segundo_nombre;
    input_primer_apellido.value = usuario_normal.primer_apellido;
    input_segundo_apellido.value = usuario_normal.segundo_apellido;
    input_tipo_identificacion.value = usuario_normal.tipo_identificacion;
    input_identificacion.value = usuario_normal.identificacion;
    input_correo.value = usuario_normal.correo;
    input_telefono.value = usuario_normal.telefono;
    input_img.src = usuario_normal.fotografia;
    input_fotografia.value = usuario_normal.fotografia;

    switch(usuario_normal.genero){
        case 'femenino':
            document.querySelector('#rbtFemenino').checked = true;
        break;
        case 'masculino':
            document.querySelector('#rbtMasculino').checked = true;
        break;
    }

    establecer_identificacion();

};

llenar_campos();

botonIdentificacion.addEventListener('input', establecer_identificacion);
botonRegistrar.addEventListener('click', modificar_usuario);
