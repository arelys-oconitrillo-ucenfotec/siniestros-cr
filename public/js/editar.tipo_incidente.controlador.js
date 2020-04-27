'use strict';

obtener_menu();

let nombre_siniestro = localStorage.getItem('nombre_siniestro');
let id;
const input_nombre_siniestro = document.querySelector('#txtNombreSiniestro');
const input_icono = document.querySelector('#txtUrlImg');
const icono = document.querySelector('#icon-img');

let llenar_campos = async() => {
    let tipo_incidente = await obtener_siniestro_por_nombre(nombre_siniestro);

    console.log(tipo_incidente);

    id = tipo_incidente._id;
    input_nombre_siniestro.value = tipo_incidente.nombre_siniestro;
    input_icono.value = tipo_incidente.icono;
    icono.src = tipo_incidente.icono;

};


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

let modificar_tipo_incidente = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_siniestro();
    }
};

llenar_campos();

let botonIncidente = document.querySelector('#btnIncidentes');
botonIncidente.addEventListener('click', modificar_tipo_incidente);