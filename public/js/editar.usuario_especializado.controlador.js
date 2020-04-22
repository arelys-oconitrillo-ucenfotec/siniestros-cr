'use strict';

//obtener_menu();

let identificacion = localStorage.getItem('identificacion_usuario_especializado');
const botonIdentificacionEsp = document.querySelector('#sltTipoIdentificacion');
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
const botonRegistrarEsp = document.querySelector('#btnRegistrar');
const input_tipo = document.querySelector('#sltTipoEspecializado');
const input_provincia = document.querySelector('#sltProvincia');
const input_canton = document.querySelector('#sltCanton');
const input_distrito = document.querySelector('#sltDistrito');
const input_otras_senas = document.querySelector('#txtOtrasSenas');

let validarEsp = () => {
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
    
    error = validarEmailEsp(error);

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

let validarIdentificacionEsp = (pError, pNumeroDigitos) => {
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

let validarDimexEsp = (pError) => {
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

let validarEmailEsp = (pError) => {
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

let modificar_usuario_especializado = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_usuario_especializado();
    }
};

let establecer_identificacion_esp = () => {
    reiniciar_formulario_identificacion_esp();

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

let reiniciar_formulario_identificacion_esp = () => {
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

let llenar_campos_esp = async() => {
    let usuario_especializado = await obtener_usuario_especializado_id(identificacion);

    id = usuario_especializado._id;
    input_primer_nombre.value = usuario_especializado.primer_nombre;
    input_segundo_nombre.value = usuario_especializado.segundo_nombre;
    input_primer_apellido.value = usuario_especializado.primer_apellido;
    input_segundo_apellido.value = usuario_especializado.segundo_apellido;
    input_tipo_identificacion.value = usuario_especializado.tipo_identificacion;
    input_identificacion.value = usuario_especializado.identificacion;
    input_correo.value = usuario_especializado.correo;
    input_telefono.value = usuario_especializado.telefono;
    input_img.src = usuario_especializado.fotografia;
    input_fotografia.value = usuario_especializado.fotografia;
    input_tipo.value = usuario_especializado.tipo;
    input_provincia.value = usuario_especializado.provincia;
    input_canton.value = usuario_especializado.canton;
    input_distrito.value = usuario_especializado.distrito;
    input_otras_senas.value = usuario_especializado.otras_senas;

    switch(usuario_especializado.genero){
        case 'femenino':
            document.querySelector('#rbtFemenino').checked = true;
        break;
        case 'masculino':
            document.querySelector('#rbtMasculino').checked = true;
        break;
    }

    establecer_identificacion_esp();

};

llenar_campos_esp();

botonIdentificacionEsp.addEventListener('input', establecer_identificacion);
botonRegistrarEsp.addEventListener('click', modificar_usuario_especializado);
