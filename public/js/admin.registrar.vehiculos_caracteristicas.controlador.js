'use strict';

obtener_menu();

const botonRegistrar = document.querySelector('#btnRegistrar');
const input_icono = document.querySelector('#icon-img');

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-caracteristicas [required]');
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

let limpiar = () => {
    txtCaracteristica.value = "";
};

let agregar_vehiculo_caracteristica = () => {
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        console.log(txtCaracteristica.value);
        registrar_vehiculo_caracteristicas();
    }

};

botonRegistrar.addEventListener('click', agregar_vehiculo_caracteristica);
