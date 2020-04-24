'use strict';

obtener_menu();

const sltRuta = document.querySelector('#sltRuta');
const sltSiniestro = document.querySelector('#sltSiniestro');
const botonReportar = document.querySelector('#btnReportar');

let mostrar_rutas = async() => {
    let rutas = await listar_rutas();
    sltRuta.innerHTML = '<option value="">Seleccione</option>';

    for (let i = 0; i < rutas.length; i++) {
        let id = rutas[i]['_id'];
        let nombre_ruta = rutas[i]['nombre_ruta'];

        let opcionRuta = document.createElement('option');
        opcionRuta.id = id;
        opcionRuta.value = nombre_ruta;
        opcionRuta.innerText = nombre_ruta;

        sltRuta.appendChild(opcionRuta);
    }
};

let mostrar_siniestros = async() => {
    let siniestros = await listar_tipo_incidentes();
    sltSiniestro.innerHTML = '<option value="">Seleccione</option>';

    for (let i = 0; i < siniestros.length; i++) {
        let id = siniestros[i]['_id'];
        let nombre_siniestro = siniestros[i]['nombre_siniestro'];

        let opcionSiniestro = document.createElement('option');
        opcionSiniestro.id = id;
        opcionSiniestro.value = nombre_siniestro;
        opcionSiniestro.innerText = nombre_siniestro;

        sltSiniestro.appendChild(opcionSiniestro);
    }
};

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-reporte-siniestro [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtDescripcion'){
                campos_requeridos[i].classList.add('input-error');
            }

            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');

            if (campos_requeridos[i].id == 'txtDescripcion'){
                campos_requeridos[i].classList.remove('input-error');
            }
        }
    }

    return error;
      
};

let agregar_reporte_siniestro = () => {
    let error = validar();
    if (error) {
        Swal.fire({
            'title': 'Sus datos no se pudieron enviar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
    } else {
        console.log(sltSiniestro.value);
        registrar_reporte_siniestro();
    }
};


let limpiar = () => {

    txtDescripcion.value = '';
    txtLatitud.value = '';
    txtLongitud.value = '';
    sltRuta.value = '';
    sltSiniestro.value = '';
};


botonReportar.addEventListener('click', agregar_reporte_siniestro);

ready(function() {
    mostrar_rutas();
    mostrar_siniestros();
});
