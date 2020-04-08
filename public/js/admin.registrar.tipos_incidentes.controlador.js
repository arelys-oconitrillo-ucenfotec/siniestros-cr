'use strict';

const input_icono = document.querySelector('#icon-img');
let botonIncidente = document.querySelector('#btnIncidentes');
botonIncidente.addEventListener('click', obtenerDatos);

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-incidentes [required]');
    let error = false;
    console.log(campos_requeridos);

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

function obtenerDatos(){
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
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon': 'success'
        }).then(() => {
            limpiar();
        });

    }

};

