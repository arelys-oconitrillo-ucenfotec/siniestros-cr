'use strict'

obtener_menu();

let identificacion = localStorage.getItem('identificacion_usuario');
const botonGuardar = document.querySelector('#btnRegistrar');
let _id;
let tarjetaId

let input_identificacion = document.querySelector('#txtIdentificacion');
let input_tipoTarjeta = document.querySelector('#txttipoTarjeta');
let input_numeroTarjeta = document.querySelector('#txtnumeroTarjeta');
let input_fechaExp = document.querySelector('#txtfechaExp');
let input_codigoCVV = document.querySelector('#txtcodigoCVV');

    
let llenar_campos = async() =>{

    let usuario_normal = await obtener_usuario_normal_id(identificacion);
   
    let uTarjetas = [];
    
    /* dato para saber cual usuario es el dueño de la tarjeta seleccionada 
       esto se ocupa para la funcion de modificar tarjeta */
    _id = usuario_normal._id;
    
    input_identificacion.value = usuario_normal.identificacion;
    uTarjetas = usuario_normal.tarjetas;
    let contTarjetas = uTarjetas.length;
    /* dato de cual de las tarjetas se selecciona */

    tarjetaId = uTarjetas[0]._id
    
    /*como hacer para cuando se tiene mas de una tarjeta   se puede hacer un ciclo for pero como se mostaria en pantalla*/
    
    input_tipoTarjeta.value = uTarjetas[0].tipoTarjeta;
    input_numeroTarjeta.value = JSON.stringify(uTarjetas[0].numeroTarjeta);
    
    /* Se necesita la fecha de expiracion en formato de YYYY-MM, pero al guardar los tados en el arreglo de tarjetas queda con este formato string y asi
      "2025-06-01T00:00:00.000Z" y se necesitan solo los primeros 7 caracteres */
      
      let fecha= "";
      let fechalarga = uTarjetas[0].fechaExp;
      let contador = 0;

      /*Ciclo para poder leer la fecha de expiracion guardada */
    for (let i = 0; i < uTarjetas[0].fechaExp.length-17; i++) {
        contador=i;
        fecha = fecha + fechalarga.charAt(contador);
    }    
    
    input_fechaExp.value = fecha;
    input_codigoCVV.value = uTarjetas[0].codigoCVV;

    console.log (usuario_normal, contTarjetas, JSON.stringify(uTarjetas[0].numeroTarjeta), fecha);
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

let limpiar_datos = () => {
    
    input_identificacion.value = "";
    input_tipoTarjeta.value = "";
    input_numeroTarjeta.value = "";
    input_fechaExp.value = "";
    input_codigoCVV.value = "";
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
        let identificacion = document.querySelector('#txtIdentificacion').value;
        let tipoTarjeta = document.querySelector('#txttipoTarjeta').value;
        let numeroTarjeta = document.querySelector('#txtnumeroTarjeta').value;
        let fechaExp = document.querySelector('#txtfechaExp').value;
        let codigoCVV = document.querySelector('#txtcodigoCVV').value;

        modificar_tarjetaCredito(_id, tarjetaId, tipoTarjeta, numeroTarjeta, fechaExp, codigoCVV);
        
        /*Swal.fire({
            'title': 'El proceso se realizó correntamente',
            'text': 'Tarjeta de crédito modificada correctamente',
            'icon': 'success'
        }).then(() => {
            limpiar_datos();
        });*/
        limpiar_datos();
    }
};

botonGuardar.addEventListener('click', modificar_tarjeta);

llenar_campos();