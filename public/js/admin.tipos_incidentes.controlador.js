'use strict';

const tbody = document.querySelector('#tbl-tipo-incidente tbody');

let mostrar_datos = async() => {
    let tipo_incidentes = await listar_tipo_incidentes();
    tbody.innerHTML = '';

    for (let i = 0; i < tipo_incidentes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = tipo_incidentes[i]['nombre_siniestro'];
        fila.insertCell().innerHTML = tipo_incidentes[i]['icono'];
    }
};

mostrar_datos();

/*let botonReservar = document.querySelector('#btnIncidentes');
botonReservar.addEventListener('click', obtenerDatos);

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-incidentes [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == '') {
            campos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            campos_requeridos[i].classList.remove('input-error');
        }
    }

    return error;
      
};

let limpiar = () => {
    txtNombreSiniestro.value = "";
    txtIcono.value = "";
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
        console.log(txtIcono.value);
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon': 'success'
        }).then(() => {
            limpiar();
        });

    }

};*/

