'use strict';

obtener_menu();

const botonIdentificacion = document.querySelector('#txtIdentificacion');
const botonRegistrar = document.querySelector('#btnRegistrar');
/* para funcion limpiar_datos*/
    let input_identificacion = document.querySelector('#txtIdentificacion');
    let input_tipoTarjeta = document.querySelector('#txttipoTarjeta');
    let input_numeroTarjeta = document.querySelector('#txtnumeroTarjeta');
    let input_fechaExp = document.querySelector('#txtfechaExp');
    let input_codigoCVV = document.querySelector('#txtcodigoCVV');
 /* fin de variables */

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

let limpiar_datos = () => {
    
    input_identificacion.value = "";
    input_tipoTarjeta.value = "";
    input_numeroTarjeta.value = "";
    input_fechaExp.value = "";
    input_codigoCVV.value = "";
};

let agregar_tarjeta = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron registrar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        let identificacion = document.querySelector('#txtIdentificacion').value;
        let tipoTarjeta = document.querySelector('#txttipoTarjeta').value;
        let numeroTarjeta = document.querySelector('#txtnumeroTarjeta').value;
        let fechaExp = document.querySelector('#txtfechaExp').value;
        let codigoCVV = document.querySelector('#txtcodigoCVV').value;

        registrar_tarjetaCredito( identificacion, tipoTarjeta, numeroTarjeta, fechaExp, codigoCVV);
        Swal.fire({
            'title': 'El proceso se realizó correntamente',
            'text': 'Tarjeta de crédito registrada correctamente',
            'icon': 'success'
        }).then(() => {
            limpiar_datos();
        });
    }
};

botonRegistrar.addEventListener('click', agregar_tarjeta);

