'use strict';

obtener_menu();

let id_asistencia = localStorage.getItem('id_asistencia');
let id;
const botonReportar = document.querySelector('#btnReportar');
const input_tipo_asistencia = document.querySelector('#sltTipoAsistencia');
const input_provincia = document.querySelector('#sltProvincia');
const input_canton = document.querySelector('#sltCanton');
const input_distrito = document.querySelector('#sltDistrito');
const input_otras_senas = document.querySelector('#txtOtrasSenas');


let llenar_campos = async() => {
    let reporte_asistencia = await obtener_reportes_asistencias_por_id(id_asistencia);

    mostrar_tipos_asistencias()
    .then(() => {
        id = reporte_asistencia._id;
        input_tipo_asistencia.value = reporte_asistencia.tipo_asistencia;
        input_provincia.value = reporte_asistencia.provincia;
        cargarCantones();
        input_canton.value = reporte_asistencia.canton;
        cargarDistritos();
        input_distrito.value = reporte_asistencia.distrito;
        input_otras_senas.value = reporte_asistencia.otras_senas;
    });
};

let mostrar_tipos_asistencias = async() => {
    let tipos_asistencias = await listar_tipo_asistencias();
    sltTipoAsistencia.innerHTML = '<option value="">Seleccione</option>';
    
    for (let i = 0; i < tipos_asistencias.length; i++) {
        let id = tipos_asistencias[i]['_id'];
        let tipo = tipos_asistencias[i]['nombre_asistencia'];

        let opcionAsistencia = document.createElement('option');
        opcionAsistencia.id = id;
        opcionAsistencia.value = tipo;
        opcionAsistencia.innerText = tipo;

        sltTipoAsistencia.appendChild(opcionAsistencia);
    }
};

let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-reporte-asistencia [required]');
    let error = false;

    for (let i = 0; i < campos_requeridos.length; i++) {
        let label_campo_requerido = document.querySelector('[for="' + campos_requeridos[i].id + '"]');
        if (campos_requeridos[i].value == '') {
            label_campo_requerido.classList.add('label-error');

            if (campos_requeridos[i].id == 'txtOtrasSenas'){
                campos_requeridos[i].classList.add('input-error');
            }

            error = true;
        } else {
            label_campo_requerido.classList.remove('label-error');

            if (campos_requeridos[i].id == 'txtOtrasSenas'){
                campos_requeridos[i].classList.remove('input-error');
            }

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
        actualizar_reporte_asistencia();
    }
};

let cargarCantones = () => {
    let html_cantones = obtener_html_cantones(sltProvincia.value);
    input_canton.innerHTML = '';
    input_canton.innerHTML = html_cantones;
};

let cargarDistritos = () => {
    let html_distritos = obtener_html_distritos(sltProvincia.value, sltCanton.value);
    input_distrito.innerHTML = '';
    input_distrito.innerHTML = html_distritos;
}; 

input_provincia.addEventListener('input', cargarCantones);
input_canton.addEventListener('input', cargarDistritos);

llenar_campos();

botonReportar.addEventListener('click', modificar_tipo_asistencia);