'use strict';

let nombre_ruta = localStorage.getItem('nombre_ruta');
let id;
const input_nombre_ruta = document.querySelector('#txtNombreRuta');
const input_latitud_inicio = document.querySelector('#txtLatInicio');
const input_longitud_inicio = document.querySelector('#txtLongInicio');
const input_latitud_fin = document.querySelector('#txtLatFin');
const input_longitud_fin = document.querySelector('#txtLongFin');

let llenar_campos = async() => {
    let ruta = await obtener_ruta_por_nombre(nombre_ruta);

    console.log(ruta);

    id = ruta._id;
    input_nombre_ruta.value = ruta.nombre_ruta;
    input_latitud_inicio.value = ruta.latitud_inicio;
    input_longitud_inicio.value = ruta.longitud_inicio;
    input_latitud_fin.value = ruta.latitud_fin;
    input_longitud_fin.value = ruta.longitud_fin;
};

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-rutas [required]');
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

let modificar_ruta = () => {
    let error_validacion = validar();
    if (error_validacion) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        actualizar_ruta();
    }
};

llenar_campos();

let botonRuta = document.querySelector('#btnRutas');
botonRuta.addEventListener('click', modificar_ruta);