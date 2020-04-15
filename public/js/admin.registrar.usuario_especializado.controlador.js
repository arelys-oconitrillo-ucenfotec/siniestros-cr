/*TO DO
funcion que devuelva un numero random de 5 digitos
funcion que envie un email para la activacion del usuario*/

'use strict';

const botonIdentificacion = document.querySelector('#sltTipoIdentificacion');
const botonRegistrar = document.querySelector('#btnRegistrar');
const botonProvincias = document.querySelector('#sltProvincia');
const botonCantones = document.querySelector('#sltCanton');
const botonDistritos = document.querySelector('#sltDistrito');

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
    let input_genero = document.querySelector('#field-genero input[type=radio]:checked');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtOtrasSenas'){
                campos_requeridos[i].classList.add('input-error');
            }

            if (campos_requeridos[i].id == 'txtInfoAponderado'){
                campos_requeridos[i].classList.add('input-error');
            }

            error = true;

        } else {
            label_campo_requerido.classList.remove('label-error');

            if (campos_requeridos[i].id == 'txtOtrasSenas'){
                campos_requeridos[i].classList.remove('input-error');
            }

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
    sltTipoIdentificacion.value = "";
    txtRazonSocial.value = "";
    txtNombreComercial.value = "";
    txtInfoAponderado.value = "";
    txtPrimerNombre.value = "";
    txtSegundoNombre.value = "";
    txtPrimerApellido.value = "";
    txtSegundoApellido.value = "";
    txtEmail.value = "";
    txtTelefono.value = "";
    txtIdentificacion.value = "";
    txtUrlImg.value = "";
    rbtFemenino.checked = false;
    rbtMasculino.checked = false;
    sltTipoEspecializado.value = "";
    sltProvincia.value = "";
    sltCanton.value = "";
    sltDistrito.value = "";
    txtOtrasSenas.value = "";
    document.querySelector('#icon-img').src = "../css/imgs/blank-profile-picture-973460_1280.png";
};

let cargarCantones = () => {
    let html_cantones = obtener_html_cantones(sltProvincia.value);
    botonCantones.innerHTML = '';
    botonCantones.innerHTML = html_cantones;
};

let cargarDistritos = () => {
    let html_distritos = obtener_html_distritos(sltProvincia.value, sltCanton.value);
    botonDistritos.innerHTML = '';
    botonDistritos.innerHTML = html_distritos;
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
        registrar_usuario_especializado();
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
botonProvincias.addEventListener('input', cargarCantones);
botonCantones.addEventListener('input', cargarDistritos);


/*let ready = (callbackFunc) => {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callbackFunc();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            callbackFunc();
        }
        });
    }
}*/

/*ready(function() {
    if(botonIdentificacion.value = ""){

    }
});*/

