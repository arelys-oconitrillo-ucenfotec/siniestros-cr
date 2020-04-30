'use strict'

obtener_menu();

let identificacion_usuario = localStorage.getItem('identificacion_usuario');
let usuario_id = localStorage.getItem('usuario_id');
let tarjetaId = localStorage.getItem('tarjeta_id');
let input_identificacion = document.querySelector('#txtIdentificacion');
let input_tipoTarjeta = document.querySelector('#sltTipoTarjeta');
let input_numeroTarjeta = document.querySelector('#txtnumeroTarjeta');
let input_fechaExp = document.querySelector('#txtfechaExp');
let input_codigoCVV = document.querySelector('#txtcodigoCVV');
const botonGuardar = document.querySelector('#btnRegistrar');
    
let llenar_campos = async() => {

    let usuario_normal = await obtener_usuario_normal_id(identificacion_usuario);
    /* dato para saber cual usuario es el dueño de la tarjeta seleccionada 
       esto se ocupa para la funcion de modificar tarjeta */

    if(usuario_normal.tarjetas) {
        let uTarjetas = usuario_normal.tarjetas;
        /* dato de cual de las tarjetas se selecciona */

        for(let i = 0; i < uTarjetas.length; i++){
            if(uTarjetas[i]._id == tarjetaId){
                input_tipoTarjeta.value = uTarjetas[i].tipoTarjeta;
                input_numeroTarjeta.value = JSON.stringify(uTarjetas[i].numeroTarjeta);
                input_fechaExp.value = uTarjetas[i].fechaExp;
                input_codigoCVV.value = uTarjetas[0].codigoCVV;
            }
        }
    }
}

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-registro [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');
            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');
          }
    }
    return error;
};

let modificar_tarjeta = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron registrar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        let tipoTarjeta = document.querySelector('#sltTipoTarjeta').value;
        let numeroTarjeta = document.querySelector('#txtnumeroTarjeta').value;
        let fechaExp = document.querySelector('#txtfechaExp').value;
        let codigoCVV = document.querySelector('#txtcodigoCVV').value;

        modificar_tarjeta_credito(usuario_id, tarjetaId, tipoTarjeta, numeroTarjeta, fechaExp, codigoCVV);
    }
};

botonGuardar.addEventListener('click', modificar_tarjeta);

llenar_campos();