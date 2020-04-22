'use strict';

let nombre_asistencia = localStorage.getItem('nombre_asistencia');
let id;
const input_nombre_asistencia = document.querySelector('#txtNombreAsistencia');
const input_descripcion = document.querySelector('#txtDescripcion');
const input_costo = document.querySelector('#txtCosto');

let llenar_campos = async() => {
    let tipo_asistencia = await obtener_asistencia_por_nombre(nombre_asistencia);

    console.log(tipo_asistencia);

    id = tipo_asistencia._id;
    input_nombre_asistencia.value = tipo_asistencia.nombre_asistencia;
    input_descripcion.value = tipo_asistencia.descripcion;
    input_costo.value = tipo_asistencia.costo;
};


let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-asistencias [required]');
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

let modificar_tipo_asistencia = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_asistencia();
    }
};

llenar_campos();

let botonAsistencia = document.querySelector('#btnAsistencias');
botonAsistencia.addEventListener('click', modificar_tipo_asistencia);