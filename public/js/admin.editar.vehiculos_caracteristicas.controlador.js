'use strict';

obtener_menu();

const id = localStorage.getItem('id_vehiculo_caracteristica');
const input_caracteristica = document.querySelector('#txtCaracteristica');
const botonEditar = document.querySelector('#btnEditar');

let llenar_campos = async() => {
    let vehiculo_caracteristica = await obtener_vehiculo_caracteristica_por_id(id);
    input_caracteristica.value = vehiculo_caracteristica.caracteristica;
};

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

let editar_vehiculo_caracteristica = () => {
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        modificar_vehiculo_caracteristica();
    }

};

llenar_campos();

botonEditar.addEventListener('click', editar_vehiculo_caracteristica);
