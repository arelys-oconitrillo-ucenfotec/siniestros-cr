'use strict';

const input_icono = document.querySelector('#icon-img');

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-incidentes [required]');
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
    document.querySelector('#icon-img').src = "";
    txtNombreSiniestro.value = "";
    txtUrlImg.value = "";
};

let agregar_tipo_incidente = () => {
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        console.log(txtNombreSiniestro.value);
        console.log(txtUrlImg.value);
        registrar_tipo_incidente();
    }

};

let botonIncidente = document.querySelector('#btnIncidentes');
botonIncidente.addEventListener('click', agregar_tipo_incidente);
