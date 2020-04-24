'use strict';

const sltUsuariosEsp = document.querySelector('#sltUsuariosEsp');
const botonReportar = document.querySelector('#btnReportar');
const botonProvincias = document.querySelector('#sltProvincia');
const botonCantones = document.querySelector('#sltCanton');
const botonDistritos = document.querySelector('#sltDistrito');


let mostrar_tipos_asistencias = async() => {
    let tipos_asistencias = await listar_tipo_asistencias();
    sltUsuariosEsp.innerHTML = '<option value="">Seleccione</option>';
    
    Console.log(tipos_asistencias);
    for (let i = 0; i < tipos_asistencias.length; i++) {
        let id = tipos_asistencias[i]['_id'];
        let tipo = tipos_asistencias[i]['tipo'];

        let opcionAsistencia = document.createElement('option');
        opcionAsistencia.id = id;
        opcionAsistencia.value = tipo;
        opcionAsistencia.innerText = tipo;

        sltUsuariosEsp.appendChild(opcionAsistencia);
    }
};


let validar = () => {
    let campos_requeridos = document.querySelectorAll('#frm-reporte-siniestro [required]');
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
    sltUsuariosEsp.value = "";
    sltProvincia.value = "";
    sltCanton.value = "";
    sltDistrito.value = "";
    txtOtrasSenas.value = "";
};

let cargarCantones = () => {
    let html_cantones = obtener_html_cantones(sltProvincia.value);
    botonCantones.innerHTML = '';
    botonCantones.innerHTML = html_cantones;
};

let cargarDistritos = () => {
    let html_distritos = obtener_html_distritos(sltProvincia.value, sltCanton.value);
    botonDistritos.innerHTML = '';
    botonDistritos.innerHTML = html_distritos;
}; 


botonReportar.addEventListener('click', agregar_reporte_siniestro);
botonProvincias.addEventListener('input', cargarCantones);
botonCantones.addEventListener('input', cargarDistritos);

ready(function() {
    mostrar_tipos_asistencias();
});
